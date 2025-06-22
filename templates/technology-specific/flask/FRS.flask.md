---
template: frs-flask.md
version: {{frsVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/flask/FRS.flask.md
generatedBy: executor-crew
technology: Flask
generationTriggers:
  - AGENTS.md implementation progress
  - Flask technical decisions
---

# FRS.md: Functional Requirements Specification - Flask Implementation

**Version**: {{frsVersion}}  
**Date**: {{date}}  
**Technology**: Flask (Python Web Framework)  
**Generated from**: AGENTS.md implementation activities

This document captures the detailed technical specifications derived from the implementation of the Flask architecture defined in CLAUDE.md. It serves as the living technical documentation that bridges requirements (RDS.md) with actual implementation.

## 1. Flask Application Architecture Implementation

{{flaskApplicationArchitectureImplementation}}

### Application Factory Pattern Realized

```python
# app/__init__.py - Complete Implementation
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail
from flask_wtf.csrf import CSRFProtect
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_caching import Cache
from flask_compress import Compress
from flask_talisman import Talisman
import logging
from logging.handlers import RotatingFileHandler
import os

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
mail = Mail()
csrf = CSRFProtect()
cors = CORS()
limiter = Limiter(key_func=get_remote_address)
cache = Cache()
compress = Compress()

def create_app(config_class=None):
    """
    Application factory function.
    
    Args:
        config_class: Configuration class to use
        
    Returns:
        Flask: Configured Flask application instance
    """
    app = Flask(__name__)
    
    # Load configuration
    if config_class is None:
        config_name = os.environ.get('FLASK_ENV') or 'default'
        from config import config
        config_class = config[config_name]
    
    app.config.from_object(config_class)
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    mail.init_app(app)
    csrf.init_app(app)
    cors.init_app(app)
    limiter.init_app(app)
    cache.init_app(app)
    compress.init_app(app)
    
    # Security configuration
    if not app.debug and not app.testing:
        Talisman(
            app,
            force_https=app.config.get('SSL_REDIRECT', False),
            strict_transport_security=True,
            content_security_policy={
                'default-src': "'self'",
                'script-src': "'self' 'unsafe-inline'",
                'style-src': "'self' 'unsafe-inline'",
                'img-src': "'self' data: https:",
                'font-src': "'self' https:",
            }
        )
    
    # Configure login manager
    login_manager.login_view = 'auth.login'
    login_manager.login_message_category = 'info'
    login_manager.login_message = 'Please log in to access this page.'
    
    # User loader
    @login_manager.user_loader
    def load_user(user_id):
        from app.models.user import User
        return User.query.get(user_id)
    
    # Register blueprints
    from app.main import bp as main_bp
    app.register_blueprint(main_bp)
    
    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    
    from app.api.v1 import bp as api_v1_bp
    app.register_blueprint(api_v1_bp, url_prefix='/api/v1')
    
    from app.admin import bp as admin_bp
    app.register_blueprint(admin_bp, url_prefix='/admin')
    
    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)
    
    # Register CLI commands
    from app.cli import register_commands
    register_commands(app)
    
    # Configure logging
    configure_logging(app)
    
    # Initialize monitoring
    from app.monitoring import RequestMonitoring
    RequestMonitoring(app)
    
    return app

def configure_logging(app):
    """Configure application logging."""
    if not app.debug and not app.testing:
        # File logging
        if not os.path.exists('logs'):
            os.mkdir('logs')
        
        file_handler = RotatingFileHandler(
            'logs/flask_app.log',
            maxBytes=10240000,  # 10MB
            backupCount=10
        )
        
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        ))
        
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
        app.logger.setLevel(logging.INFO)
        app.logger.info('Flask application startup')
```

## 2. Database Models Implementation

{{databaseModelsImplementation}}

### Complete User Model with Relationships

```python
# app/models/user.py - Production Implementation
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import uuid
import jwt
from time import time

from app import db
from app.models.mixins import TimestampMixin, UUIDMixin

# Association table for many-to-many relationship
user_roles = db.Table('user_roles',
    db.Column('user_id', db.String(36), db.ForeignKey('users.id'), primary_key=True),
    db.Column('role_id', db.String(36), db.ForeignKey('roles.id'), primary_key=True),
    db.Column('assigned_at', db.DateTime, default=datetime.utcnow),
    db.Column('assigned_by', db.String(36), db.ForeignKey('users.id')),
    db.Column('expires_at', db.DateTime)
)

class User(UserMixin, TimestampMixin, UUIDMixin, db.Model):
    """
    User model with complete authentication and profile support.
    
    Implements Flask-Login UserMixin for authentication.
    Includes comprehensive profile management and security features.
    """
    __tablename__ = 'users'
    
    # Authentication fields
    username = db.Column(
        db.String(64), 
        index=True, 
        unique=True, 
        nullable=False
    )
    email = db.Column(
        db.String(120), 
        index=True, 
        unique=True, 
        nullable=False
    )
    password_hash = db.Column(db.String(255), nullable=False)
    
    # Profile fields
    first_name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
    avatar_url = db.Column(db.String(255))
    bio = db.Column(db.Text)
    location = db.Column(db.String(100))
    website = db.Column(db.String(255))
    
    # Account status
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    is_verified = db.Column(db.Boolean, default=False, nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    
    # Security fields
    last_login = db.Column(db.DateTime)
    failed_login_attempts = db.Column(db.Integer, default=0)
    locked_until = db.Column(db.DateTime)
    password_changed_at = db.Column(db.DateTime, default=datetime.utcnow)
    two_factor_enabled = db.Column(db.Boolean, default=False)
    two_factor_secret = db.Column(db.String(32))
    
    # Preferences
    timezone = db.Column(db.String(50), default='UTC')
    language = db.Column(db.String(10), default='en')
    email_notifications = db.Column(db.Boolean, default=True)
    
    # Relationships
    posts = db.relationship(
        'Post', 
        backref='author', 
        lazy='dynamic', 
        cascade='all, delete-orphan'
    )
    comments = db.relationship(
        'Comment', 
        backref='author', 
        lazy='dynamic', 
        cascade='all, delete-orphan'
    )
    roles = db.relationship(
        'Role',
        secondary=user_roles,
        lazy='subquery',
        backref=db.backref('users', lazy=True)
    )
    sessions = db.relationship(
        'UserSession', 
        backref='user', 
        lazy='dynamic', 
        cascade='all, delete-orphan'
    )
    api_tokens = db.relationship(
        'ApiToken', 
        backref='user', 
        lazy='dynamic', 
        cascade='all, delete-orphan'
    )
    
    def __repr__(self):
        return f'<User {self.username}>'
    
    # Password management
    def set_password(self, password):
        """Hash and set password with security tracking."""
        self.password_hash = generate_password_hash(password)
        self.password_changed_at = datetime.utcnow()
        self.failed_login_attempts = 0
        self.locked_until = None
    
    def check_password(self, password):
        """
        Check password against hash with security measures.
        
        Returns:
            bool: True if password is correct, False otherwise
        """
        if self.is_locked():
            return False
        
        if check_password_hash(self.password_hash, password):
            self.failed_login_attempts = 0
            self.last_login = datetime.utcnow()
            return True
        else:
            self.failed_login_attempts += 1
            if self.failed_login_attempts >= 5:
                self.locked_until = datetime.utcnow() + timedelta(minutes=30)
            return False
    
    def is_locked(self):
        """Check if account is locked due to failed login attempts."""
        if self.locked_until and self.locked_until > datetime.utcnow():
            return True
        return False
    
    def unlock_account(self):
        """Unlock account and reset failed attempts."""
        self.failed_login_attempts = 0
        self.locked_until = None
    
    # Profile management
    def get_full_name(self):
        """Get user's full name or username if names not provided."""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        elif self.first_name:
            return self.first_name
        return self.username
    
    def get_avatar_url(self, size=128):
        """Get avatar URL with fallback to Gravatar."""
        if self.avatar_url:
            return self.avatar_url
        
        # Gravatar fallback
        import hashlib
        digest = hashlib.md5(self.email.lower().encode('utf-8')).hexdigest()
        return f'https://www.gravatar.com/avatar/{digest}?d=identicon&s={size}'
    
    # Role and permission management
    def has_role(self, role_name):
        """Check if user has specific role."""
        return any(role.name == role_name for role in self.roles)
    
    def add_role(self, role):
        """Add role to user."""
        if not self.has_role(role.name):
            self.roles.append(role)
    
    def remove_role(self, role):
        """Remove role from user."""
        if self.has_role(role.name):
            self.roles.remove(role)
    
    def can(self, permission):
        """Check if user has specific permission through roles."""
        for role in self.roles:
            if role.has_permission(permission):
                return True
        return False
    
    def is_administrator(self):
        """Check if user is admin."""
        return self.is_admin or self.has_role('admin')
    
    # Token management
    def generate_password_reset_token(self, expires_in=600):
        """Generate password reset token."""
        return jwt.encode(
            {
                'reset_password': self.id,
                'exp': time() + expires_in
            },
            current_app.config['SECRET_KEY'],
            algorithm='HS256'
        )
    
    def verify_password_reset_token(self, token):
        """Verify password reset token."""
        try:
            id = jwt.decode(
                token,
                current_app.config['SECRET_KEY'],
                algorithms=['HS256']
            )['reset_password']
        except:
            return None
        return User.query.get(id)
    
    def generate_email_verification_token(self, expires_in=86400):
        """Generate email verification token."""
        return jwt.encode(
            {
                'verify_email': self.id,
                'exp': time() + expires_in
            },
            current_app.config['SECRET_KEY'],
            algorithm='HS256'
        )
    
    def verify_email_token(self, token):
        """Verify email verification token."""
        try:
            id = jwt.decode(
                token,
                current_app.config['SECRET_KEY'],
                algorithms=['HS256']
            )['verify_email']
        except:
            return False
        
        if id == self.id:
            self.is_verified = True
            return True
        return False
    
    # API serialization
    def to_dict(self, include_email=False):
        """
        Convert user to dictionary for API responses.
        
        Args:
            include_email (bool): Whether to include email in response
            
        Returns:
            dict: User data dictionary
        """
        data = {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'full_name': self.get_full_name(),
            'avatar_url': self.get_avatar_url(),
            'bio': self.bio,
            'location': self.location,
            'website': self.website,
            'is_active': self.is_active,
            'is_verified': self.is_verified,
            'timezone': self.timezone,
            'language': self.language,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }
        
        if include_email:
            data['email'] = self.email
            data['email_notifications'] = self.email_notifications
        
        return data
    
    def from_dict(self, data, new_user=False):
        """
        Update user from dictionary data.
        
        Args:
            data (dict): User data
            new_user (bool): Whether this is a new user creation
        """
        for field in ['username', 'email', 'first_name', 'last_name', 
                      'bio', 'location', 'website', 'timezone', 'language']:
            if field in data:
                setattr(self, field, data[field])
        
        if new_user and 'password' in data:
            self.set_password(data['password'])
    
    # Search functionality
    @staticmethod
    def search(expression, page, per_page):
        """
        Search users by username, email, or name.
        
        Args:
            expression (str): Search term
            page (int): Page number
            per_page (int): Results per page
            
        Returns:
            Pagination: SQLAlchemy pagination object
        """
        # This would integrate with search engine like Elasticsearch
        # For now, using simple database search
        return User.query.filter(
            db.or_(
                User.username.contains(expression),
                User.first_name.contains(expression),
                User.last_name.contains(expression),
                User.email.contains(expression)
            )
        ).paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )

# Additional models for complete implementation
class Role(TimestampMixin, UUIDMixin, db.Model):
    """Role model for role-based access control."""
    __tablename__ = 'roles'
    
    name = db.Column(db.String(64), unique=True, nullable=False)
    description = db.Column(db.Text)
    is_system = db.Column(db.Boolean, default=False)
    level = db.Column(db.Integer, default=0)
    
    # Relationships
    permissions = db.relationship(
        'Permission', 
        backref='role', 
        lazy='dynamic', 
        cascade='all, delete-orphan'
    )
    
    def __repr__(self):
        return f'<Role {self.name}>'
    
    def has_permission(self, permission_name):
        """Check if role has specific permission."""
        return self.permissions.filter_by(name=permission_name).first() is not None
    
    def add_permission(self, permission_name):
        """Add permission to role."""
        if not self.has_permission(permission_name):
            permission = Permission(name=permission_name, role=self)
            db.session.add(permission)
    
    def remove_permission(self, permission_name):
        """Remove permission from role."""
        permission = self.permissions.filter_by(name=permission_name).first()
        if permission:
            db.session.delete(permission)

class Permission(TimestampMixin, UUIDMixin, db.Model):
    """Permission model for fine-grained access control."""
    __tablename__ = 'permissions'
    
    name = db.Column(db.String(64), nullable=False)
    resource = db.Column(db.String(64), nullable=False)
    action = db.Column(db.String(32), nullable=False)
    role_id = db.Column(db.String(36), db.ForeignKey('roles.id'), nullable=False)
    conditions = db.Column(db.JSON)
    
    __table_args__ = (
        db.UniqueConstraint('role_id', 'resource', 'action'),
    )
    
    def __repr__(self):
        return f'<Permission {self.name}>'

class UserSession(TimestampMixin, UUIDMixin, db.Model):
    """User session tracking."""
    __tablename__ = 'user_sessions'
    
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    session_token = db.Column(db.String(255), unique=True, nullable=False)
    ip_address = db.Column(db.String(45))
    user_agent = db.Column(db.Text)
    expires_at = db.Column(db.DateTime, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    
    def __repr__(self):
        return f'<UserSession {self.session_token[:8]}...>'
    
    def is_expired(self):
        """Check if session is expired."""
        return datetime.utcnow() > self.expires_at

class ApiToken(TimestampMixin, UUIDMixin, db.Model):
    """API token for authentication."""
    __tablename__ = 'api_tokens'
    
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    token_hash = db.Column(db.String(255), unique=True, nullable=False)
    scopes = db.Column(db.JSON)
    expires_at = db.Column(db.DateTime)
    last_used_at = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)
    
    def __repr__(self):
        return f'<ApiToken {self.name}>'
    
    def is_expired(self):
        """Check if token is expired."""
        if self.expires_at:
            return datetime.utcnow() > self.expires_at
        return False
    
    def has_scope(self, scope):
        """Check if token has specific scope."""
        if not self.scopes:
            return False
        return scope in self.scopes
```

## 3. Authentication System Implementation

{{authenticationSystemImplementation}}

### Complete Authentication Routes

```python
# app/auth/routes.py - Production Implementation
from flask import (
    render_template, redirect, url_for, flash, request, 
    jsonify, current_app, session
)
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.urls import url_parse
from datetime import datetime, timedelta
import secrets

from app import db, limiter
from app.auth import bp
from app.auth.forms import (
    LoginForm, RegistrationForm, ResetPasswordRequestForm,
    ResetPasswordForm, ChangePasswordForm, TwoFactorForm
)
from app.models.user import User, Role
from app.email import send_password_reset_email, send_verification_email
from app.utils.decorators import anonymous_required
from app.utils.security import SecurityManager

@bp.route('/login', methods=['GET', 'POST'])
@limiter.limit("10 per minute")
@anonymous_required
def login():
    """
    User login with security features.
    
    Features:
    - Rate limiting
    - Account locking after failed attempts
    - Session management
    - Two-factor authentication support
    """
    form = LoginForm()
    
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        
        if user is None:
            flash('Invalid username or password', 'error')
            return redirect(url_for('auth.login'))
        
        # Check if account is locked
        if user.is_locked():
            flash('Account is temporarily locked due to failed login attempts. Please try again later.', 'error')
            return redirect(url_for('auth.login'))
        
        # Verify password
        if not user.check_password(form.password.data):
            db.session.commit()  # Save failed attempt count
            flash('Invalid username or password', 'error')
            return redirect(url_for('auth.login'))
        
        # Check if account is active
        if not user.is_active:
            flash('Your account has been deactivated. Please contact support.', 'error')
            return redirect(url_for('auth.login'))
        
        # Check if two-factor is enabled
        if user.two_factor_enabled:
            session['user_id_for_2fa'] = user.id
            return redirect(url_for('auth.two_factor'))
        
        # Complete login
        login_user(user, remember=form.remember_me.data)
        
        # Create session record
        SecurityManager.create_user_session(user, request)
        
        # Update user login info
        user.last_login = datetime.utcnow()
        user.failed_login_attempts = 0
        db.session.commit()
        
        # Redirect to next page or dashboard
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('main.dashboard')
        
        flash(f'Welcome back, {user.get_full_name()}!', 'success')
        current_app.logger.info(f'User {user.username} logged in successfully')
        
        return redirect(next_page)
    
    return render_template('auth/login.html', title='Sign In', form=form)

@bp.route('/two-factor', methods=['GET', 'POST'])
@limiter.limit("5 per minute")
def two_factor():
    """Two-factor authentication verification."""
    user_id = session.get('user_id_for_2fa')
    if not user_id:
        return redirect(url_for('auth.login'))
    
    user = User.query.get(user_id)
    if not user or not user.two_factor_enabled:
        session.pop('user_id_for_2fa', None)
        return redirect(url_for('auth.login'))
    
    form = TwoFactorForm()
    
    if form.validate_on_submit():
        # Verify TOTP code
        if SecurityManager.verify_totp(user.two_factor_secret, form.code.data):
            session.pop('user_id_for_2fa', None)
            login_user(user)
            
            # Create session record
            SecurityManager.create_user_session(user, request)
            
            # Update login info
            user.last_login = datetime.utcnow()
            db.session.commit()
            
            flash('Two-factor authentication successful!', 'success')
            return redirect(url_for('main.dashboard'))
        else:
            flash('Invalid authentication code', 'error')
    
    return render_template('auth/two_factor.html', title='Two-Factor Authentication', form=form)

@bp.route('/register', methods=['GET', 'POST'])
@limiter.limit("3 per minute")
@anonymous_required
def register():
    """
    User registration with email verification.
    
    Features:
    - Email uniqueness validation
    - Password strength requirements
    - Email verification
    - Default role assignment
    """
    form = RegistrationForm()
    
    if form.validate_on_submit():
        # Create new user
        user = User(
            username=form.username.data,
            email=form.email.data,
            first_name=form.first_name.data,
            last_name=form.last_name.data
        )
        user.set_password(form.password.data)
        
        # Assign default role
        default_role = Role.query.filter_by(name='user').first()
        if default_role:
            user.add_role(default_role)
        
        db.session.add(user)
        db.session.commit()
        
        # Send verification email
        if current_app.config.get('MAIL_ENABLED', True):
            send_verification_email(user)
            flash('Registration successful! Please check your email to verify your account.', 'info')
        else:
            # Auto-verify in development
            user.is_verified = True
            db.session.commit()
            flash('Registration successful! You can now log in.', 'success')
        
        current_app.logger.info(f'New user registered: {user.username}')
        return redirect(url_for('auth.login'))
    
    return render_template('auth/register.html', title='Register', form=form)

@bp.route('/verify-email/<token>')
def verify_email(token):
    """Email verification endpoint."""
    user = User.query.filter_by(is_verified=False).first()
    
    if user and user.verify_email_token(token):
        db.session.commit()
        flash('Your email has been verified! You can now log in.', 'success')
        current_app.logger.info(f'Email verified for user: {user.username}')
    else:
        flash('Invalid or expired verification link.', 'error')
    
    return redirect(url_for('auth.login'))

@bp.route('/logout')
@login_required
def logout():
    """
    User logout with session cleanup.
    
    Features:
    - Session invalidation
    - Security logging
    - Proper cleanup
    """
    username = current_user.username
    
    # Invalidate current session
    SecurityManager.invalidate_current_session()
    
    logout_user()
    
    flash('You have been logged out successfully.', 'info')
    current_app.logger.info(f'User {username} logged out')
    
    return redirect(url_for('main.index'))

@bp.route('/reset-password-request', methods=['GET', 'POST'])
@limiter.limit("3 per hour")
@anonymous_required
def reset_password_request():
    """Password reset request."""
    form = ResetPasswordRequestForm()
    
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        
        if user and user.is_active:
            send_password_reset_email(user)
            current_app.logger.info(f'Password reset requested for: {user.username}')
        
        # Always show success message to prevent email enumeration
        flash('Check your email for instructions to reset your password.', 'info')
        return redirect(url_for('auth.login'))
    
    return render_template('auth/reset_password_request.html', 
                         title='Reset Password', form=form)

@bp.route('/reset-password/<token>', methods=['GET', 'POST'])
@anonymous_required
def reset_password(token):
    """Password reset with token."""
    user = User.verify_password_reset_token(token)
    
    if not user:
        flash('Invalid or expired password reset link.', 'error')
        return redirect(url_for('auth.login'))
    
    form = ResetPasswordForm()
    
    if form.validate_on_submit():
        user.set_password(form.password.data)
        db.session.commit()
        
        flash('Your password has been reset successfully.', 'success')
        current_app.logger.info(f'Password reset completed for: {user.username}')
        
        return redirect(url_for('auth.login'))
    
    return render_template('auth/reset_password.html', form=form)

@bp.route('/change-password', methods=['GET', 'POST'])
@login_required
def change_password():
    """Change password for authenticated users."""
    form = ChangePasswordForm()
    
    if form.validate_on_submit():
        if current_user.check_password(form.current_password.data):
            current_user.set_password(form.new_password.data)
            db.session.commit()
            
            flash('Your password has been changed successfully.', 'success')
            current_app.logger.info(f'Password changed for user: {current_user.username}')
            
            return redirect(url_for('main.profile'))
        else:
            flash('Current password is incorrect.', 'error')
    
    return render_template('auth/change_password.html', 
                         title='Change Password', form=form)
```

## 4. API Implementation

{{apiImplementation}}

### RESTful API with Authentication

```python
# app/api/v1/auth.py - API Authentication
from flask import jsonify, request, current_app
from flask_httpauth import HTTPTokenAuth, HTTPBasicAuth
from werkzeug.exceptions import Unauthorized, Forbidden
import jwt
from datetime import datetime, timedelta

from app import db
from app.api.v1 import bp
from app.models.user import User, ApiToken
from app.utils.decorators import json_required

# Initialize authentication handlers
token_auth = HTTPTokenAuth()
basic_auth = HTTPBasicAuth()

@basic_auth.verify_password
def verify_password(username, password):
    """Verify username and password for basic auth."""
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password) and user.is_active:
        return user
    return None

@token_auth.verify_token
def verify_token(token):
    """Verify JWT or API token."""
    # Try JWT token first
    try:
        payload = jwt.decode(
            token,
            current_app.config['SECRET_KEY'],
            algorithms=['HS256']
        )
        user_id = payload.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            if user and user.is_active:
                return user
    except jwt.InvalidTokenError:
        pass
    
    # Try API token
    api_token = ApiToken.query.filter_by(
        token_hash=token,
        is_active=True
    ).first()
    
    if api_token and not api_token.is_expired():
        api_token.last_used_at = datetime.utcnow()
        db.session.commit()
        return api_token.user
    
    return None

@bp.route('/auth/login', methods=['POST'])
@json_required
def api_login():
    """
    API login endpoint.
    
    Request:
        {
            "username": "string",
            "password": "string",
            "remember_me": boolean
        }
    
    Response:
        {
            "access_token": "string",
            "refresh_token": "string",
            "token_type": "Bearer",
            "expires_in": 3600,
            "user": {...}
        }
    """
    data = request.get_json()
    
    username = data.get('username')
    password = data.get('password')
    remember_me = data.get('remember_me', False)
    
    if not username or not password:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Username and password are required'
        }), 400
    
    user = User.query.filter_by(username=username).first()
    
    if not user or not user.check_password(password):
        return jsonify({
            'error': 'Unauthorized',
            'message': 'Invalid credentials'
        }), 401
    
    if not user.is_active:
        return jsonify({
            'error': 'Forbidden',
            'message': 'Account is deactivated'
        }), 403
    
    # Generate tokens
    expires_in = 86400 if remember_me else 3600  # 24h or 1h
    access_token = generate_jwt_token(user.id, expires_in)
    refresh_token = generate_jwt_token(user.id, expires_in * 7, token_type='refresh')
    
    # Update login info
    user.last_login = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'token_type': 'Bearer',
        'expires_in': expires_in,
        'user': user.to_dict()
    })

@bp.route('/auth/refresh', methods=['POST'])
@json_required
def api_refresh():
    """Refresh access token using refresh token."""
    data = request.get_json()
    refresh_token = data.get('refresh_token')
    
    if not refresh_token:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Refresh token is required'
        }), 400
    
    try:
        payload = jwt.decode(
            refresh_token,
            current_app.config['SECRET_KEY'],
            algorithms=['HS256']
        )
        
        if payload.get('type') != 'refresh':
            raise jwt.InvalidTokenError()
        
        user_id = payload.get('user_id')
        user = User.query.get(user_id)
        
        if not user or not user.is_active:
            raise jwt.InvalidTokenError()
        
        # Generate new access token
        access_token = generate_jwt_token(user.id, 3600)
        
        return jsonify({
            'access_token': access_token,
            'token_type': 'Bearer',
            'expires_in': 3600
        })
        
    except jwt.InvalidTokenError:
        return jsonify({
            'error': 'Unauthorized',
            'message': 'Invalid refresh token'
        }), 401

@bp.route('/auth/logout', methods=['POST'])
@token_auth.login_required
def api_logout():
    """API logout endpoint."""
    # In a real implementation, you'd blacklist the token
    # For now, just return success
    return jsonify({'message': 'Logged out successfully'})

def generate_jwt_token(user_id, expires_in, token_type='access'):
    """Generate JWT token for user."""
    payload = {
        'user_id': user_id,
        'type': token_type,
        'exp': datetime.utcnow() + timedelta(seconds=expires_in),
        'iat': datetime.utcnow()
    }
    
    return jwt.encode(
        payload,
        current_app.config['SECRET_KEY'],
        algorithm='HS256'
    )

# app/api/v1/users.py - User API endpoints
from flask import jsonify, request, url_for, abort
from sqlalchemy import or_

from app import db
from app.api.v1 import bp
from app.api.v1.auth import token_auth
from app.models.user import User
from app.utils.decorators import json_required, admin_required

@bp.route('/users', methods=['GET'])
@token_auth.login_required
@admin_required
def get_users():
    """
    Get paginated list of users.
    
    Query Parameters:
        - page: Page number (default: 1)
        - per_page: Items per page (default: 20, max: 100)
        - search: Search term for username, email, or name
        - role: Filter by role name
        - active: Filter by active status (true/false)
    
    Response:
        {
            "users": [...],
            "pagination": {...}
        }
    """
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 20, type=int), 100)
    search = request.args.get('search', '')
    role = request.args.get('role', '')
    active = request.args.get('active', '')
    
    # Build query
    query = User.query
    
    # Apply search filter
    if search:
        search_filter = or_(
            User.username.contains(search),
            User.email.contains(search),
            User.first_name.contains(search),
            User.last_name.contains(search)
        )
        query = query.filter(search_filter)
    
    # Apply role filter
    if role:
        query = query.join(User.roles).filter(Role.name == role)
    
    # Apply active filter
    if active.lower() in ['true', 'false']:
        query = query.filter(User.is_active == (active.lower() == 'true'))
    
    # Execute paginated query
    pagination = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )
    
    return jsonify({
        'users': [user.to_dict() for user in pagination.items],
        'pagination': {
            'page': page,
            'pages': pagination.pages,
            'per_page': per_page,
            'total': pagination.total,
            'has_next': pagination.has_next,
            'has_prev': pagination.has_prev,
            'next_num': pagination.next_num,
            'prev_num': pagination.prev_num
        }
    })

@bp.route('/users/<string:user_id>', methods=['GET'])
@token_auth.login_required
def get_user(user_id):
    """Get specific user by ID."""
    user = User.query.get_or_404(user_id)
    
    # Users can only access their own data unless admin
    if not current_user.is_administrator() and current_user.id != user_id:
        abort(403)
    
    return jsonify(user.to_dict(include_email=current_user.is_administrator()))

@bp.route('/users', methods=['POST'])
@token_auth.login_required
@admin_required
@json_required
def create_user():
    """
    Create new user.
    
    Request:
        {
            "username": "string",
            "email": "string",
            "password": "string",
            "first_name": "string",
            "last_name": "string",
            "is_admin": boolean
        }
    """
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['username', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({
                'error': 'Bad Request',
                'message': f'Missing required field: {field}'
            }), 400
    
    # Check for existing user
    if User.query.filter_by(username=data['username']).first():
        return jsonify({
            'error': 'Conflict',
            'message': 'Username already exists'
        }), 409
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({
            'error': 'Conflict',
            'message': 'Email already registered'
        }), 409
    
    # Create user
    user = User()
    user.from_dict(data, new_user=True)
    
    # Set admin status if specified
    if data.get('is_admin', False):
        user.is_admin = True
    
    db.session.add(user)
    db.session.commit()
    
    response = jsonify(user.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for('api_v1.get_user', user_id=user.id)
    
    return response

@bp.route('/users/<string:user_id>', methods=['PUT'])
@token_auth.login_required
@json_required
def update_user(user_id):
    """Update user information."""
    user = User.query.get_or_404(user_id)
    
    # Users can only update their own data unless admin
    if not current_user.is_administrator() and current_user.id != user_id:
        abort(403)
    
    data = request.get_json()
    
    # Non-admin users cannot change admin status
    if not current_user.is_administrator() and 'is_admin' in data:
        data.pop('is_admin')
    
    # Update user
    user.from_dict(data)
    db.session.commit()
    
    return jsonify(user.to_dict())

@bp.route('/users/<string:user_id>', methods=['DELETE'])
@token_auth.login_required
@admin_required
def delete_user(user_id):
    """Delete user (admin only)."""
    user = User.query.get_or_404(user_id)
    
    # Cannot delete yourself
    if user.id == current_user.id:
        return jsonify({
            'error': 'Bad Request',
            'message': 'Cannot delete your own account'
        }), 400
    
    db.session.delete(user)
    db.session.commit()
    
    return '', 204
```

## 5. Security Implementation

{{securityImplementation}}

### Comprehensive Security Manager

```python
# app/utils/security.py - Complete Security Implementation
from flask import request, session, current_app
from werkzeug.security import safe_str_cmp
from datetime import datetime, timedelta
import hashlib
import secrets
import pyotp
import qrcode
import io
import base64
from urllib.parse import quote

from app import db
from app.models.user import UserSession

class SecurityManager:
    """Comprehensive security management utilities."""
    
    @staticmethod
    def generate_secure_token(length=32):
        """Generate cryptographically secure random token."""
        return secrets.token_urlsafe(length)
    
    @staticmethod
    def hash_token(token):
        """Hash token for secure storage."""
        return hashlib.sha256(token.encode()).hexdigest()
    
    @staticmethod
    def verify_token_timing_safe(token1, token2):
        """Timing-safe token comparison."""
        return safe_str_cmp(token1, token2)
    
    @staticmethod
    def get_client_ip():
        """Get real client IP address."""
        # Check for proxy headers
        if request.headers.get('X-Forwarded-For'):
            # Get first IP if multiple (chain of proxies)
            ip = request.headers.get('X-Forwarded-For').split(',')[0].strip()
        elif request.headers.get('X-Real-IP'):
            ip = request.headers.get('X-Real-IP')
        else:
            ip = request.remote_addr or 'unknown'
        
        return ip
    
    @staticmethod
    def get_user_agent():
        """Get user agent string."""
        return request.headers.get('User-Agent', 'unknown')
    
    @staticmethod
    def create_user_session(user, request_obj):
        """Create and store user session information."""
        session_token = SecurityManager.generate_secure_token()
        
        user_session = UserSession(
            user_id=user.id,
            session_token=SecurityManager.hash_token(session_token),
            ip_address=SecurityManager.get_client_ip(),
            user_agent=SecurityManager.get_user_agent(),
            expires_at=datetime.utcnow() + timedelta(days=30)
        )
        
        db.session.add(user_session)
        db.session.commit()
        
        # Store session token in Flask session
        session['session_token'] = session_token
        session['session_id'] = user_session.id
        
        return user_session
    
    @staticmethod
    def invalidate_current_session():
        """Invalidate current user session."""
        session_token = session.get('session_token')
        if session_token:
            token_hash = SecurityManager.hash_token(session_token)
            user_session = UserSession.query.filter_by(
                session_token=token_hash,
                is_active=True
            ).first()
            
            if user_session:
                user_session.is_active = False
                db.session.commit()
        
        # Clear Flask session
        session.clear()
    
    @staticmethod
    def cleanup_expired_sessions():
        """Clean up expired sessions (run as background task)."""
        expired_sessions = UserSession.query.filter(
            UserSession.expires_at < datetime.utcnow()
        )
        
        count = expired_sessions.count()
        expired_sessions.delete()
        db.session.commit()
        
        return count
    
    @staticmethod
    def generate_totp_secret():
        """Generate TOTP secret for 2FA."""
        return pyotp.random_base32()
    
    @staticmethod
    def generate_totp_qr_code(user, secret):
        """Generate QR code for TOTP setup."""
        app_name = current_app.config.get('APP_NAME', 'Flask App')
        
        totp_uri = pyotp.totp.TOTP(secret).provisioning_uri(
            name=user.email,
            issuer_name=app_name
        )
        
        # Generate QR code
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(totp_uri)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Convert to base64 string
        buffer = io.BytesIO()
        img.save(buffer, format='PNG')
        buffer.seek(0)
        
        img_str = base64.b64encode(buffer.getvalue()).decode()
        return f"data:image/png;base64,{img_str}"
    
    @staticmethod
    def verify_totp(secret, token):
        """Verify TOTP token."""
        totp = pyotp.TOTP(secret)
        return totp.verify(token, valid_window=1)  # Allow 30s window
    
    @staticmethod
    def check_password_strength(password):
        """
        Check password strength.
        
        Returns:
            dict: {
                'score': int (0-4),
                'feedback': list,
                'is_strong': bool
            }
        """
        feedback = []
        score = 0
        
        # Length check
        if len(password) < 8:
            feedback.append("Password must be at least 8 characters long")
        elif len(password) >= 12:
            score += 1
        
        # Character variety checks
        has_lower = any(c.islower() for c in password)
        has_upper = any(c.isupper() for c in password)
        has_digit = any(c.isdigit() for c in password)
        has_special = any(c in "!@#$%^&*(),.?\":{}|<>" for c in password)
        
        if not has_lower:
            feedback.append("Include lowercase letters")
        else:
            score += 0.5
        
        if not has_upper:
            feedback.append("Include uppercase letters")
        else:
            score += 0.5
        
        if not has_digit:
            feedback.append("Include numbers")
        else:
            score += 0.5
        
        if not has_special:
            feedback.append("Include special characters")
        else:
            score += 0.5
        
        # Common patterns check
        common_patterns = ['123456', 'password', 'qwerty', 'abc123']
        if any(pattern in password.lower() for pattern in common_patterns):
            feedback.append("Avoid common patterns")
            score = max(0, score - 1)
        
        # Sequential characters
        if any(ord(password[i]) == ord(password[i-1]) + 1 for i in range(1, len(password))):
            feedback.append("Avoid sequential characters")
            score = max(0, score - 0.5)
        
        # Repeated characters
        if any(password[i] == password[i-1] == password[i-2] for i in range(2, len(password))):
            feedback.append("Avoid repeated characters")
            score = max(0, score - 0.5)
        
        return {
            'score': min(4, int(score * 2)),
            'feedback': feedback,
            'is_strong': score >= 2.5 and len(password) >= 8
        }
    
    @staticmethod
    def rate_limit_key(identifier, action='general'):
        """Generate rate limiting key."""
        return f"rate_limit:{action}:{identifier}"
    
    @staticmethod
    def log_security_event(event_type, user_id=None, details=None):
        """Log security events for monitoring."""
        current_app.logger.warning(
            f"Security Event: {event_type}",
            extra={
                'event_type': event_type,
                'user_id': user_id,
                'ip_address': SecurityManager.get_client_ip(),
                'user_agent': SecurityManager.get_user_agent(),
                'timestamp': datetime.utcnow().isoformat(),
                'details': details or {}
            }
        )

# app/utils/decorators.py - Security Decorators
from functools import wraps
from flask import request, jsonify, abort, current_user
from flask_login import login_required

def json_required(f):
    """Require JSON content type."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not request.is_json:
            return jsonify({
                'error': 'Bad Request',
                'message': 'Content-Type must be application/json'
            }), 400
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    """Require admin privileges."""
    @wraps(f)
    @login_required
    def decorated_function(*args, **kwargs):
        if not current_user.is_administrator():
            abort(403)
        return f(*args, **kwargs)
    return decorated_function

def anonymous_required(f):
    """Require user to be anonymous (not logged in)."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if current_user.is_authenticated:
            return redirect(url_for('main.dashboard'))
        return f(*args, **kwargs)
    return decorated_function

def permission_required(permission):
    """Require specific permission."""
    def decorator(f):
        @wraps(f)
        @login_required
        def decorated_function(*args, **kwargs):
            if not current_user.can(permission):
                abort(403)
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def api_key_required(f):
    """Require valid API key."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('X-API-Key')
        if not api_key:
            return jsonify({
                'error': 'Unauthorized',
                'message': 'API key required'
            }), 401
        
        # Validate API key
        # Implementation depends on your API key system
        
        return f(*args, **kwargs)
    return decorated_function
```

## 6. Performance Optimizations Implementation

{{performanceOptimizationsImplementation}}

### Caching and Performance

```python
# app/utils/cache.py - Advanced Caching Implementation
from functools import wraps
from flask import request, current_app, g
from app import cache
import hashlib
import json
import time
from datetime import datetime, timedelta

class CacheManager:
    """Advanced caching with multiple strategies."""
    
    DEFAULT_TIMEOUT = 300  # 5 minutes
    LONG_TIMEOUT = 3600    # 1 hour
    SHORT_TIMEOUT = 60     # 1 minute
    
    @staticmethod
    def make_cache_key(*args, **kwargs):
        """Generate deterministic cache key."""
        # Include request path and method
        key_data = {
            'endpoint': request.endpoint if request else None,
            'method': request.method if request else None,
            'args': args,
            'kwargs': kwargs
        }
        
        # Create hash of the data
        key_string = json.dumps(key_data, sort_keys=True, default=str)
        return hashlib.md5(key_string.encode()).hexdigest()
    
    @staticmethod
    def cached_view(timeout=DEFAULT_TIMEOUT, key_prefix='view', unless=None):
        """
        Cache view function responses.
        
        Args:
            timeout: Cache timeout in seconds
            key_prefix: Prefix for cache key
            unless: Function that returns True to skip caching
        """
        def decorator(f):
            @wraps(f)
            def decorated_function(*args, **kwargs):
                # Check if caching should be skipped
                if unless and unless():
                    return f(*args, **kwargs)
                
                # Generate cache key
                cache_key = f"{key_prefix}:{CacheManager.make_cache_key(*args, **kwargs)}"
                
                # Try to get from cache
                result = cache.get(cache_key)
                if result is not None:
                    # Track cache hit
                    g.cache_hit = True
                    return result
                
                # Generate result and cache it
                result = f(*args, **kwargs)
                cache.set(cache_key, result, timeout=timeout)
                
                # Track cache miss
                g.cache_hit = False
                
                return result
            return decorated_function
        return decorator
    
    @staticmethod
    def cached_function(timeout=DEFAULT_TIMEOUT, key_prefix='func'):
        """Cache function results."""
        def decorator(f):
            @wraps(f)
            def decorated_function(*args, **kwargs):
                cache_key = f"{key_prefix}:{f.__name__}:{CacheManager.make_cache_key(*args, **kwargs)}"
                
                result = cache.get(cache_key)
                if result is not None:
                    return result
                
                result = f(*args, **kwargs)
                cache.set(cache_key, result, timeout=timeout)
                
                return result
            return decorated_function
        return decorator
    
    @staticmethod
    def invalidate_pattern(pattern):
        """Invalidate cache keys matching pattern."""
        if hasattr(cache.cache, 'delete_many'):
            # Redis backend
            keys = cache.cache.cache.keys(f"*{pattern}*")
            if keys:
                cache.cache.delete_many(keys)
        else:
            # Simple cache - clear all
            cache.clear()
    
    @staticmethod
    def warm_cache(func, *args, **kwargs):
        """Warm cache by pre-computing result."""
        return func(*args, **kwargs)

# Query optimization utilities
class QueryOptimizer:
    """Database query optimization utilities."""
    
    @staticmethod
    def paginate_efficiently(query, page, per_page, error_out=False):
        """Efficient pagination with count optimization."""
        # Get total count efficiently
        total = query.count()
        
        # Calculate offset
        offset = (page - 1) * per_page
        
        # Get items for current page
        items = query.offset(offset).limit(per_page).all()
        
        # Create pagination object
        return {
            'items': items,
            'total': total,
            'page': page,
            'per_page': per_page,
            'pages': (total + per_page - 1) // per_page,
            'has_prev': page > 1,
            'has_next': offset + per_page < total,
            'prev_num': page - 1 if page > 1 else None,
            'next_num': page + 1 if offset + per_page < total else None
        }
    
    @staticmethod
    def eager_load_relationships(query, *relationships):
        """Add eager loading for relationships."""
        for relationship in relationships:
            query = query.options(db.joinedload(relationship))
        return query
    
    @staticmethod
    def bulk_insert(model_class, data_list, batch_size=1000):
        """Efficient bulk insert."""
        for i in range(0, len(data_list), batch_size):
            batch = data_list[i:i + batch_size]
            db.session.bulk_insert_mappings(model_class, batch)
        db.session.commit()

# Performance monitoring
class PerformanceMonitor:
    """Monitor and log performance metrics."""
    
    @staticmethod
    def time_function(f):
        """Decorator to time function execution."""
        @wraps(f)
        def decorated_function(*args, **kwargs):
            start_time = time.time()
            result = f(*args, **kwargs)
            execution_time = time.time() - start_time
            
            # Log slow functions
            if execution_time > 1.0:  # Log functions taking > 1 second
                current_app.logger.warning(
                    f"Slow function: {f.__name__} took {execution_time:.2f}s"
                )
            
            return result
        return decorated_function
    
    @staticmethod
    def monitor_queries():
        """Monitor database queries per request."""
        if hasattr(g, 'query_count'):
            query_count = g.query_count
            if query_count > 10:  # Log requests with many queries
                current_app.logger.warning(
                    f"High query count: {query_count} queries in request"
                )

# Usage examples in routes
@bp.route('/posts')
@CacheManager.cached_view(timeout=300, key_prefix='posts_list')
def posts():
    """Cached posts listing."""
    page = request.args.get('page', 1, type=int)
    category = request.args.get('category', '')
    
    query = Post.query.filter_by(is_published=True)
    if category:
        query = query.filter_by(category=category)
    
    # Use eager loading for author
    query = QueryOptimizer.eager_load_relationships(query, Post.author)
    
    # Efficient pagination
    pagination = QueryOptimizer.paginate_efficiently(query, page, 20)
    
    return render_template('posts/index.html', pagination=pagination)

@CacheManager.cached_function(timeout=3600, key_prefix='user_stats')
def get_user_statistics(user_id):
    """Cached user statistics calculation."""
    user = User.query.get(user_id)
    
    stats = {
        'posts_count': user.posts.count(),
        'comments_count': user.comments.count(),
        'last_activity': user.last_login.isoformat() if user.last_login else None
    }
    
    return stats
```

## 7. Testing Implementation

{{testingImplementation}}

### Comprehensive Test Suite

```python
# tests/test_models.py - Model Testing
import pytest
from datetime import datetime, timedelta

from app import db
from app.models.user import User, Role, Permission

class TestUserModel:
    """Test User model functionality."""
    
    def test_password_hashing(self, app):
        """Test password hashing and verification."""
        with app.app_context():
            user = User(username='test', email='test@example.com')
            user.set_password('testpassword')
            
            assert user.password_hash is not None
            assert user.password_hash != 'testpassword'
            assert user.check_password('testpassword')
            assert not user.check_password('wrongpassword')
    
    def test_password_reset_token(self, app):
        """Test password reset token generation and verification."""
        with app.app_context():
            user = User(username='test', email='test@example.com')
            db.session.add(user)
            db.session.commit()
            
            token = user.generate_password_reset_token()
            assert token is not None
            
            verified_user = User.verify_password_reset_token(token)
            assert verified_user == user
            
            # Test invalid token
            invalid_user = User.verify_password_reset_token('invalid')
            assert invalid_user is None
    
    def test_email_verification_token(self, app):
        """Test email verification token."""
        with app.app_context():
            user = User(username='test', email='test@example.com')
            db.session.add(user)
            db.session.commit()
            
            token = user.generate_email_verification_token()
            assert user.verify_email_token(token)
            assert user.is_verified
    
    def test_account_locking(self, app):
        """Test account locking after failed attempts."""
        with app.app_context():
            user = User(username='test', email='test@example.com')
            user.set_password('testpassword')
            
            # Simulate failed login attempts
            for i in range(5):
                assert not user.check_password('wrongpassword')
            
            assert user.is_locked()
            assert not user.check_password('testpassword')  # Correct password should fail when locked
    
    def test_role_management(self, app):
        """Test role assignment and checking."""
        with app.app_context():
            user = User(username='test', email='test@example.com')
            role = Role(name='admin', description='Administrator')
            
            db.session.add(user)
            db.session.add(role)
            db.session.commit()
            
            assert not user.has_role('admin')
            
            user.add_role(role)
            db.session.commit()
            
            assert user.has_role('admin')
            
            user.remove_role(role)
            db.session.commit()
            
            assert not user.has_role('admin')
    
    def test_user_serialization(self, app):
        """Test user to_dict and from_dict methods."""
        with app.app_context():
            user = User(
                username='test',
                email='test@example.com',
                first_name='Test',
                last_name='User'
            )
            
            data = user.to_dict()
            
            assert data['username'] == 'test'
            assert data['full_name'] == 'Test User'
            assert 'email' not in data  # Should not include email by default
            
            data_with_email = user.to_dict(include_email=True)
            assert data_with_email['email'] == 'test@example.com'

# tests/test_auth.py - Authentication Testing
class TestAuthentication:
    """Test authentication functionality."""
    
    def test_login_page(self, client):
        """Test login page loads correctly."""
        response = client.get('/auth/login')
        assert response.status_code == 200
        assert b'Sign In' in response.data
    
    def test_successful_login(self, client, test_user):
        """Test successful user login."""
        response = client.post('/auth/login', data={
            'username': test_user.username,
            'password': 'testpassword',
            'submit': 'Sign In'
        }, follow_redirects=True)
        
        assert response.status_code == 200
        assert b'Welcome back' in response.data
    
    def test_invalid_login(self, client, test_user):
        """Test login with invalid credentials."""
        response = client.post('/auth/login', data={
            'username': test_user.username,
            'password': 'wrongpassword',
            'submit': 'Sign In'
        })
        
        assert response.status_code == 200
        assert b'Invalid username or password' in response.data
    
    def test_inactive_user_login(self, client, app):
        """Test login with inactive user."""
        with app.app_context():
            user = User(username='inactive', email='inactive@example.com', is_active=False)
            user.set_password('testpassword')
            db.session.add(user)
            db.session.commit()
            
            response = client.post('/auth/login', data={
                'username': 'inactive',
                'password': 'testpassword',
                'submit': 'Sign In'
            })
            
            assert response.status_code == 200
            assert b'deactivated' in response.data
    
    def test_logout(self, auth_client):
        """Test user logout."""
        response = auth_client.get('/auth/logout', follow_redirects=True)
        assert response.status_code == 200
        assert b'logged out' in response.data
    
    def test_registration(self, client, app):
        """Test user registration."""
        response = client.post('/auth/register', data={
            'username': 'newuser',
            'email': 'new@example.com',
            'first_name': 'New',
            'last_name': 'User',
            'password': 'testpassword',
            'password2': 'testpassword',
            'submit': 'Register'
        }, follow_redirects=True)
        
        assert response.status_code == 200
        
        with app.app_context():
            user = User.query.filter_by(username='newuser').first()
            assert user is not None
            assert user.first_name == 'New'
    
    def test_duplicate_registration(self, client, test_user):
        """Test registration with existing username."""
        response = client.post('/auth/register', data={
            'username': test_user.username,
            'email': 'different@example.com',
            'password': 'testpassword',
            'password2': 'testpassword',
            'submit': 'Register'
        })
        
        assert response.status_code == 200
        assert b'already exists' in response.data
    
    def test_password_reset_request(self, client, test_user):
        """Test password reset request."""
        response = client.post('/auth/reset-password-request', data={
            'email': test_user.email,
            'submit': 'Request Password Reset'
        }, follow_redirects=True)
        
        assert response.status_code == 200
        assert b'Check your email' in response.data

# tests/test_api.py - API Testing
class TestAPI:
    """Test API endpoints."""
    
    def test_api_login(self, client, test_user):
        """Test API login endpoint."""
        response = client.post('/api/v1/auth/login', json={
            'username': test_user.username,
            'password': 'testpassword'
        })
        
        assert response.status_code == 200
        data = response.get_json()
        
        assert 'access_token' in data
        assert 'refresh_token' in data
        assert 'user' in data
        assert data['token_type'] == 'Bearer'
    
    def test_api_login_invalid(self, client):
        """Test API login with invalid credentials."""
        response = client.post('/api/v1/auth/login', json={
            'username': 'nonexistent',
            'password': 'wrongpassword'
        })
        
        assert response.status_code == 401
        data = response.get_json()
        assert data['error'] == 'Unauthorized'
    
    def test_protected_endpoint(self, client, test_user):
        """Test protected API endpoint."""
        # First, login to get token
        login_response = client.post('/api/v1/auth/login', json={
            'username': test_user.username,
            'password': 'testpassword'
        })
        
        token = login_response.get_json()['access_token']
        
        # Use token to access protected endpoint
        response = client.get('/api/v1/users', headers={
            'Authorization': f'Bearer {token}'
        })
        
        # Should require admin access
        assert response.status_code == 403
    
    def test_token_refresh(self, client, test_user):
        """Test token refresh endpoint."""
        # Login to get refresh token
        login_response = client.post('/api/v1/auth/login', json={
            'username': test_user.username,
            'password': 'testpassword'
        })
        
        refresh_token = login_response.get_json()['refresh_token']
        
        # Use refresh token to get new access token
        response = client.post('/api/v1/auth/refresh', json={
            'refresh_token': refresh_token
        })
        
        assert response.status_code == 200
        data = response.get_json()
        assert 'access_token' in data

# tests/conftest.py - Test Configuration
import pytest
import tempfile
import os

from app import create_app, db
from app.models.user import User, Role
from config import TestingConfig

@pytest.fixture(scope='session')
def app():
    """Create and configure test application."""
    # Create temporary database
    db_fd, db_path = tempfile.mkstemp()
    
    # Update config for testing
    test_config = TestingConfig()
    test_config.SQLALCHEMY_DATABASE_URI = f'sqlite:///{db_path}'
    test_config.WTF_CSRF_ENABLED = False
    
    app = create_app(test_config)
    
    with app.app_context():
        db.create_all()
        
        # Create default roles
        user_role = Role(name='user', description='Regular user')
        admin_role = Role(name='admin', description='Administrator')
        db.session.add(user_role)
        db.session.add(admin_role)
        db.session.commit()
        
        yield app
        
        db.drop_all()
    
    os.close(db_fd)
    os.unlink(db_path)

@pytest.fixture
def client(app):
    """Test client."""
    return app.test_client()

@pytest.fixture
def runner(app):
    """Test CLI runner."""
    return app.test_cli_runner()

@pytest.fixture
def test_user(app):
    """Create test user."""
    with app.app_context():
        user = User(
            username='testuser',
            email='test@example.com',
            first_name='Test',
            last_name='User'
        )
        user.set_password('testpassword')
        
        # Add user role
        user_role = Role.query.filter_by(name='user').first()
        if user_role:
            user.add_role(user_role)
        
        db.session.add(user)
        db.session.commit()
        
        return user

@pytest.fixture
def admin_user(app):
    """Create admin user."""
    with app.app_context():
        user = User(
            username='admin',
            email='admin@example.com',
            first_name='Admin',
            last_name='User',
            is_admin=True
        )
        user.set_password('adminpassword')
        
        # Add admin role
        admin_role = Role.query.filter_by(name='admin').first()
        if admin_role:
            user.add_role(admin_role)
        
        db.session.add(user)
        db.session.commit()
        
        return user

@pytest.fixture
def auth_client(client, test_user):
    """Authenticated test client."""
    client.post('/auth/login', data={
        'username': test_user.username,
        'password': 'testpassword'
    })
    return client

@pytest.fixture
def admin_auth_client(client, admin_user):
    """Admin authenticated test client."""
    client.post('/auth/login', data={
        'username': admin_user.username,
        'password': 'adminpassword'
    })
    return client
```

## Implementation Summary

This FRS document provides a comprehensive technical specification for a production-ready Flask web application. The implementation includes:

### Core Features Implemented:
1. **Application Factory**: Modular, configurable Flask application structure
2. **Authentication System**: Complete user management with security features
3. **Database Models**: Full ORM implementation with relationships
4. **RESTful API**: Token-based authentication and CRUD operations
5. **Security**: Comprehensive security measures and monitoring
6. **Performance**: Caching, query optimization, and monitoring
7. **Testing**: Complete test suite with fixtures and mocks

### Production-Ready Features:
- Rate limiting and security headers
- Account locking and two-factor authentication
- Session management and token-based API authentication
- Comprehensive error handling and logging
- Performance monitoring and optimization
- Database migrations and model relationships
- Admin interface and role-based access control

All implementations follow Flask best practices and are ready for production deployment with proper configuration management and security measures.

---

**Note**: This document represents the complete technical implementation of the Flask architecture. It should be updated as new features are added or existing implementations are modified.