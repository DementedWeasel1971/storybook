---
template: agents-flask.md
version: {{agentsVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/flask/AGENTS.flask.md
generatedBy: executor-crew
technology: Flask
generationTriggers: 
  - CLAUDE.md architecture changes
  - Flask implementation requirements updates
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
---

# AGENTS.md: AI Agent Constitution for Flask Web Application Development

**Version**: {{agentsVersion}}  
**Generated from**: CLAUDE.md architectural specification  
**Date**: {{date}}  
**Technology**: Flask (Python Web Framework)

This document provides the **official guidelines and mandatory protocols** for any AI agent contributing to this Flask project. **You MUST adhere to all instructions herein.**

## Project Overview

{{flaskProjectOverview}}

**Crucially, all AI agents MUST implement the Flask architecture defined in `CLAUDE.md` and document technical specifications in `docs/FRS.md` as implementation proceeds.**

## Flask Implementation Requirements

Based on the architecture defined in CLAUDE.md, the following Flask implementation requirements are mandatory:

{{flaskImplementationRequirements}}

### Flask Application Structure

1. **Application Factory Pattern**
   ```
   project_root/
   ├── app/
   │   ├── __init__.py          # Application factory
   │   ├── config.py            # Configuration classes
   │   ├── models/              # SQLAlchemy models
   │   │   ├── __init__.py
   │   │   └── user.py
   │   ├── auth/                # Authentication blueprint
   │   │   ├── __init__.py
   │   │   ├── routes.py
   │   │   └── forms.py
   │   ├── main/                # Main blueprint
   │   │   ├── __init__.py
   │   │   ├── routes.py
   │   │   └── forms.py
   │   ├── api/                 # API blueprint
   │   │   ├── __init__.py
   │   │   ├── routes.py
   │   │   └── errors.py
   │   ├── templates/           # Jinja2 templates
   │   ├── static/              # Static files
   │   └── extensions.py        # Flask extensions
   ├── migrations/              # Database migrations
   ├── tests/
   ├── requirements.txt
   ├── .env.example
   └── wsgi.py                  # WSGI entry point
   ```

2. **Mandatory Flask Extensions**
   - Flask-SQLAlchemy (ORM)
   - Flask-Migrate (Database migrations)
   - Flask-Login (User authentication)
   - Flask-WTF (Forms and CSRF)
   - Flask-Mail (Email support)
   - Flask-CORS (Cross-origin requests)
   - Flask-Limiter (Rate limiting)
   - Flask-Caching (Caching layer)

### Application Factory Implementation

{{applicationFactoryImplementation}}

```python
# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_caching import Cache
from config import Config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
mail = Mail()
cors = CORS()
limiter = Limiter(key_func=get_remote_address)
cache = Cache()

def create_app(config_class=Config):
    """Application factory function."""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    mail.init_app(app)
    cors.init_app(app)
    limiter.init_app(app)
    cache.init_app(app)
    
    # Configure login manager
    login_manager.login_view = 'auth.login'
    login_manager.login_message_category = 'info'
    
    # Register blueprints
    from app.main import bp as main_bp
    app.register_blueprint(main_bp)
    
    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    
    from app.api import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api/v1')
    
    # Error handlers
    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)
    
    # Register CLI commands
    from app.cli import register_commands
    register_commands(app)
    
    return app
```

### Configuration Management

{{configurationManagement}}

```python
# config.py
import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    """Base configuration class."""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Mail settings
    MAIL_SERVER = os.environ.get('MAIL_SERVER') or 'localhost'
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 25)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'false').lower() in ['true', 'on', '1']
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    ADMINS = ['admin@example.com']
    
    # Pagination
    POSTS_PER_PAGE = 25
    
    # Rate limiting
    RATELIMIT_STORAGE_URL = os.environ.get('REDIS_URL') or 'memory://'
    
    # Caching
    CACHE_TYPE = os.environ.get('CACHE_TYPE') or 'simple'
    CACHE_REDIS_URL = os.environ.get('REDIS_URL')

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app-dev.db')

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    WTF_CSRF_ENABLED = False

class ProductionConfig(Config):
    """Production configuration."""
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    
    # SSL redirect
    SSL_REDIRECT = True
    
    # Enhanced security
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
```

### Database Models and ORM

{{databaseModelsORM}}

```python
# app/models/user.py
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import uuid

from app import db, login_manager

class User(UserMixin, db.Model):
    """User model with authentication support."""
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(64), nullable=True)
    last_name = db.Column(db.String(64), nullable=True)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    
    # Relationships
    posts = db.relationship('Post', backref='author', lazy='dynamic', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.username}>'
    
    def set_password(self, password):
        """Hash and set password."""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Check password against hash."""
        return check_password_hash(self.password_hash, password)
    
    def get_full_name(self):
        """Get user's full name."""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username
    
    def to_dict(self):
        """Convert to dictionary for API responses."""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }

@login_manager.user_loader
def load_user(user_id):
    """Load user for Flask-Login."""
    return User.query.get(user_id)
```

### Blueprint Architecture

{{blueprintArchitecture}}

```python
# app/auth/routes.py
from flask import render_template, redirect, url_for, flash, request, jsonify
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.urls import url_parse
from datetime import datetime

from app import db
from app.auth import bp
from app.auth.forms import LoginForm, RegistrationForm, ResetPasswordForm
from app.models.user import User
from app.auth.email import send_password_reset_email

@bp.route('/login', methods=['GET', 'POST'])
def login():
    """User login route."""
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password', 'error')
            return redirect(url_for('auth.login'))
        
        if not user.is_active:
            flash('Your account has been deactivated', 'error')
            return redirect(url_for('auth.login'))
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        login_user(user, remember=form.remember_me.data)
        
        # Redirect to next page or main page
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('main.index')
        
        flash(f'Welcome back, {user.get_full_name()}!', 'success')
        return redirect(next_page)
    
    return render_template('auth/login.html', title='Sign In', form=form)

@bp.route('/register', methods=['GET', 'POST'])
def register():
    """User registration route."""
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(
            username=form.username.data,
            email=form.email.data,
            first_name=form.first_name.data,
            last_name=form.last_name.data
        )
        user.set_password(form.password.data)
        
        db.session.add(user)
        db.session.commit()
        
        flash('Registration successful! You can now log in.', 'success')
        return redirect(url_for('auth.login'))
    
    return render_template('auth/register.html', title='Register', form=form)

@bp.route('/logout')
@login_required
def logout():
    """User logout route."""
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('main.index'))
```

### Forms and Validation

{{formsValidation}}

```python
# app/auth/forms.py
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import (
    DataRequired, 
    ValidationError, 
    Email, 
    EqualTo, 
    Length,
    Regexp
)
from app.models.user import User

class LoginForm(FlaskForm):
    """User login form."""
    username = StringField(
        'Username', 
        validators=[DataRequired(), Length(min=3, max=64)]
    )
    password = PasswordField(
        'Password', 
        validators=[DataRequired()]
    )
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')

class RegistrationForm(FlaskForm):
    """User registration form."""
    username = StringField(
        'Username',
        validators=[
            DataRequired(),
            Length(min=3, max=64),
            Regexp(
                '^[A-Za-z][A-Za-z0-9_.]*$',
                message='Username must start with a letter and contain only letters, numbers, dots, and underscores'
            )
        ]
    )
    email = StringField(
        'Email',
        validators=[DataRequired(), Email(), Length(max=120)]
    )
    first_name = StringField(
        'First Name',
        validators=[Length(max=64)]
    )
    last_name = StringField(
        'Last Name',
        validators=[Length(max=64)]
    )
    password = PasswordField(
        'Password',
        validators=[
            DataRequired(),
            Length(min=8, message='Password must be at least 8 characters long')
        ]
    )
    password2 = PasswordField(
        'Repeat Password',
        validators=[
            DataRequired(),
            EqualTo('password', message='Passwords must match')
        ]
    )
    submit = SubmitField('Register')
    
    def validate_username(self, username):
        """Check if username is already taken."""
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Username already exists. Please choose a different one.')
    
    def validate_email(self, email):
        """Check if email is already registered."""
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Email already registered. Please choose a different one.')
```

### API Blueprint Implementation

{{apiBlueprintImplementation}}

```python
# app/api/routes.py
from flask import jsonify, request, g
from flask_httpauth import HTTPTokenAuth
from werkzeug.exceptions import BadRequest, Unauthorized, Forbidden, NotFound

from app import db
from app.api import bp
from app.api.auth import verify_token
from app.api.errors import error_response
from app.models.user import User

auth = HTTPTokenAuth()

@auth.verify_token
def verify_auth_token(token):
    """Verify API token."""
    return verify_token(token)

@bp.route('/users', methods=['GET'])
@auth.login_required
def get_users():
    """Get paginated list of users."""
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    
    # Check admin permission
    if not g.current_user.is_admin:
        return error_response(403, 'Admin access required')
    
    data = User.query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )
    
    return jsonify({
        'users': [user.to_dict() for user in data.items],
        'pagination': {
            'page': page,
            'pages': data.pages,
            'per_page': per_page,
            'total': data.total,
            'has_next': data.has_next,
            'has_prev': data.has_prev
        }
    })

@bp.route('/users/<string:user_id>', methods=['GET'])
@auth.login_required
def get_user(user_id):
    """Get specific user."""
    # Users can only access their own data unless admin
    if not g.current_user.is_admin and g.current_user.id != user_id:
        return error_response(403, 'Access denied')
    
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@bp.route('/users', methods=['POST'])
@auth.login_required
def create_user():
    """Create new user."""
    # Only admins can create users via API
    if not g.current_user.is_admin:
        return error_response(403, 'Admin access required')
    
    data = request.get_json() or {}
    
    # Validate required fields
    required_fields = ['username', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return error_response(400, f'Must include {field} field')
    
    # Check for existing user
    if User.query.filter_by(username=data['username']).first():
        return error_response(400, 'Username already exists')
    
    if User.query.filter_by(email=data['email']).first():
        return error_response(400, 'Email already registered')
    
    # Create user
    user = User(
        username=data['username'],
        email=data['email'],
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        is_admin=data.get('is_admin', False)
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    response = jsonify(user.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for('api.get_user', user_id=user.id)
    
    return response
```

### Error Handling

{{errorHandling}}

```python
# app/errors/handlers.py
from flask import render_template, request, jsonify
from app import db
from app.errors import bp

def wants_json_response():
    """Check if client wants JSON response."""
    return request.accept_mimetypes['application/json'] >= \
           request.accept_mimetypes['text/html']

@bp.app_errorhandler(400)
def bad_request_error(error):
    """Handle 400 Bad Request errors."""
    if wants_json_response():
        return jsonify({
            'error': 'Bad Request',
            'message': 'The server could not understand the request'
        }), 400
    return render_template('errors/400.html'), 400

@bp.app_errorhandler(401)
def unauthorized_error(error):
    """Handle 401 Unauthorized errors."""
    if wants_json_response():
        return jsonify({
            'error': 'Unauthorized',
            'message': 'Authentication required'
        }), 401
    return render_template('errors/401.html'), 401

@bp.app_errorhandler(403)
def forbidden_error(error):
    """Handle 403 Forbidden errors."""
    if wants_json_response():
        return jsonify({
            'error': 'Forbidden',
            'message': 'You do not have permission to access this resource'
        }), 403
    return render_template('errors/403.html'), 403

@bp.app_errorhandler(404)
def not_found_error(error):
    """Handle 404 Not Found errors."""
    if wants_json_response():
        return jsonify({
            'error': 'Not Found',
            'message': 'The requested resource was not found'
        }), 404
    return render_template('errors/404.html'), 404

@bp.app_errorhandler(500)
def internal_error(error):
    """Handle 500 Internal Server errors."""
    db.session.rollback()
    if wants_json_response():
        return jsonify({
            'error': 'Internal Server Error',
            'message': 'An unexpected error occurred'
        }), 500
    return render_template('errors/500.html'), 500
```

### Security Implementation

{{securityImplementation}}

1. **CSRF Protection**
   - Use Flask-WTF for CSRF tokens on all forms
   - Configure secure secret key
   - Validate CSRF tokens on state-changing operations

2. **Input Validation**
   - Use WTForms validators
   - Sanitize user input
   - Validate file uploads

3. **Authentication Security**
   - Hash passwords with Werkzeug
   - Implement secure session management
   - Use HTTPS in production

4. **Rate Limiting**
   ```python
   from flask_limiter import Limiter
   
   @bp.route('/api/auth/login', methods=['POST'])
   @limiter.limit("5 per minute")
   def api_login():
       # Implementation
       pass
   ```

### Testing Requirements

{{testingRequirements}}

```python
# tests/test_auth.py
import unittest
from flask import url_for
from app import create_app, db
from app.models.user import User
from config import TestingConfig

class AuthTestCase(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures."""
        self.app = create_app(TestingConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.client = self.app.test_client()
        db.create_all()
        
        # Create test user
        self.user = User(
            username='testuser',
            email='test@example.com'
        )
        self.user.set_password('testpassword')
        db.session.add(self.user)
        db.session.commit()
    
    def tearDown(self):
        """Clean up after tests."""
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
    
    def test_login_page(self):
        """Test login page loads."""
        response = self.client.get('/auth/login')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Sign In', response.data)
    
    def test_login_success(self):
        """Test successful login."""
        response = self.client.post('/auth/login', data={
            'username': 'testuser',
            'password': 'testpassword',
            'submit': 'Sign In'
        }, follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Welcome back', response.data)
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials."""
        response = self.client.post('/auth/login', data={
            'username': 'testuser',
            'password': 'wrongpassword',
            'submit': 'Sign In'
        })
        self.assertEqual(response.status_code, 302)
        # Should redirect back to login page
```

### Deployment Requirements

{{deploymentRequirements}}

1. **WSGI Configuration**
   ```python
   # wsgi.py
   import os
   from app import create_app
   from config import config
   
   config_name = os.environ.get('FLASK_ENV') or 'default'
   app = create_app(config[config_name])
   
   if __name__ == "__main__":
       app.run()
   ```

2. **Environment Variables**
   ```bash
   # .env
   SECRET_KEY=your-secret-key-here
   DATABASE_URL=postgresql://user:pass@localhost/dbname
   MAIL_SERVER=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USE_TLS=true
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   REDIS_URL=redis://localhost:6379/0
   ```

3. **Production Checklist**
   - Use production WSGI server (Gunicorn, uWSGI)
   - Configure reverse proxy (Nginx)
   - Enable SSL/HTTPS
   - Set up database connection pooling
   - Configure logging
   - Implement monitoring

### Performance Optimization

{{performanceOptimization}}

1. **Database Optimization**
   - Use database indexes
   - Implement query optimization
   - Use eager loading for relationships
   - Configure connection pooling

2. **Caching Strategy**
   ```python
   from app import cache
   
   @cache.memoize(timeout=300)
   def expensive_function(param):
       # Expensive computation
       return result
   
   @bp.route('/cached-page')
   @cache.cached(timeout=60)
   def cached_page():
       return render_template('page.html')
   ```

3. **Static File Handling**
   - Use CDN for static assets
   - Implement asset compression
   - Configure browser caching
   - Minimize and bundle CSS/JS

## Flask Development Workflow

1. **Setup Development Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   pip install -r requirements.txt
   flask db upgrade
   flask run
   ```

2. **Database Migrations**
   ```bash
   flask db init      # Initialize migrations
   flask db migrate   # Create migration
   flask db upgrade   # Apply migrations
   ```

3. **Testing**
   ```bash
   python -m pytest tests/
   python -m pytest --cov=app tests/
   ```

## Security Best Practices

1. **Never commit secrets to version control**
2. **Use environment variables for configuration**
3. **Implement proper authentication and authorization**
4. **Validate and sanitize all user input**
5. **Use HTTPS in production**
6. **Implement proper session management**
7. **Keep dependencies updated**
8. **Use security headers**

## Agent Collaboration Requirements

All agents working on this Flask project must:

1. **Follow Flask best practices and conventions**
2. **Use the application factory pattern**
3. **Implement proper error handling**
4. **Write comprehensive tests**
5. **Document all routes and functions**
6. **Use blueprints for organization**
7. **Implement proper security measures**
8. **Follow the project structure**

## Quality Gates

Before any code is merged:

1. All tests must pass
2. Code coverage must be >= 80%
3. No security vulnerabilities
4. Proper documentation
5. Code follows style guidelines
6. Database migrations are included
7. Configuration is externalized

---

**Remember**: This document is your contract for Flask development. Violating these guidelines may result in rejected contributions. Always refer to CLAUDE.md for architectural decisions and update FRS.md with implementation details.