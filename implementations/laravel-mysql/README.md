# Laravel + MySQL Implementation Guide
## Architect Crew Methodology™ for PHP Laravel with Hosted MySQL

**Technology Stack**: PHP Laravel 10.x + MySQL 8.0+ + Hosted Database  
**Implementation Type**: Web Application with API Support  
**Hosting**: Traditional hosting or VPS with cPanel/DirectAdmin support  
**Database**: Hosted MySQL (shared or dedicated)

---

## 🚀 **Quick Start Guide**

### **1. Project Setup**

```bash
# Create new Laravel project
composer create-project laravel/laravel your-project-name
cd your-project-name

# Install Architect Crew methodology
git clone https://github.com/DementedWeasel1971/storybook.git methodology
cp -r methodology/implementations/laravel-mysql/* .
rm -rf methodology

# Install Laravel dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate
```

### **2. Configure Hosted MySQL Database**

Update your `.env` file with hosted database credentials:

```env
# Database Configuration (Hosted MySQL)
DB_CONNECTION=mysql
DB_HOST=your-hosting-provider-mysql-host.com
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_db_username
DB_PASSWORD=your_secure_password

# Laravel Configuration
APP_NAME="Your Application Name"
APP_ENV=production  # or staging/local
APP_KEY=base64:your-generated-key
APP_DEBUG=false     # false for production
APP_URL=https://yourdomain.com

# Cache Configuration (if Redis available)
CACHE_DRIVER=database  # or redis if available
SESSION_DRIVER=database
QUEUE_CONNECTION=database

# Mail Configuration (for notifications)
MAIL_MAILER=smtp
MAIL_HOST=your-hosting-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email@yourdomain.com
MAIL_PASSWORD=your-email-password
MAIL_ENCRYPTION=tls
```

### **3. Initialize Architect Crew Methodology**

```bash
# Generate methodology documentation
php artisan methodology:setup
php artisan methodology:generate-claude
php artisan methodology:generate-agents
php artisan methodology:generate-frs

# Verify setup
php artisan methodology:validate
```

### **4. Database Setup**

```bash
# Test database connection
php artisan tinker
# In tinker: DB::connection()->getPdo();

# Run initial migrations
php artisan migrate

# Seed with initial data (optional)
php artisan db:seed
```

### **5. Deploy to Hosting**

```bash
# Build for production
composer install --optimize-autoloader --no-dev
npm run build

# Upload to hosting via FTP/SFTP or Git
# Set proper permissions
chmod -R 755 storage bootstrap/cache
chmod -R 644 .env

# Run production setup on server
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

## 🏗️ **Architecture Implementation**

### **CLAUDE.md - Laravel Architecture**

```yaml
system_architecture:
  pattern: "MVC with Service-Repository Pattern"
  database: "MySQL 8.0+ with Eloquent ORM"
  api: "RESTful API with Laravel Resources"
  authentication: "Laravel Sanctum + Session-based"
  caching: "Database/Redis caching strategy"
  
hosting_considerations:
  environment: "Shared/VPS hosting with cPanel"
  database: "Remote MySQL hosted database"
  file_storage: "Local storage with backup strategy"
  email: "SMTP through hosting provider"
  ssl: "Let's Encrypt or hosting SSL"
  
performance_strategy:
  database: "Query optimization and indexing"
  caching: "Application and database level caching"
  assets: "Asset optimization and compression"
  monitoring: "Laravel Telescope for debugging"
```

### **AGENTS.md - Implementation Guidelines**

The methodology provides specific Laravel implementation instructions:

#### **Model Development Pattern**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'user_id',
        'category_id',
        'published_at',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
    ];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at')
                    ->where('published_at', '<=', now());
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // Accessors
    public function getExcerptAttribute()
    {
        return $this->attributes['excerpt'] ?: 
               Str::limit(strip_tags($this->content), 150);
    }
}
```

#### **Service Layer Pattern**
```php
<?php

namespace App\Services;

use App\Models\Post;
use App\Repositories\PostRepository;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class PostService
{
    public function __construct(
        private PostRepository $postRepository
    ) {}

    public function getAllPosts(Request $request): LengthAwarePaginator
    {
        return $this->postRepository
            ->published()
            ->with(['user', 'category'])
            ->when($request->category, function ($query, $category) {
                return $query->whereHas('category', function ($q) use ($category) {
                    $q->where('slug', $category);
                });
            })
            ->when($request->search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->latest('published_at')
            ->paginate(12);
    }

    public function createPost(array $data): Post
    {
        $data['slug'] = Str::slug($data['title']);
        $data['user_id'] = auth()->id();
        
        if (empty($data['excerpt'])) {
            $data['excerpt'] = Str::limit(strip_tags($data['content']), 150);
        }

        return $this->postRepository->create($data);
    }

    public function updatePost(Post $post, array $data): Post
    {
        if (isset($data['title']) && $data['title'] !== $post->title) {
            $data['slug'] = Str::slug($data['title']);
        }

        return $this->postRepository->update($post, $data);
    }

    public function deletePost(Post $post): bool
    {
        return $this->postRepository->delete($post);
    }
}
```

#### **API Controller Pattern**
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PostController extends Controller
{
    public function __construct(
        private PostService $postService
    ) {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $posts = $this->postService->getAllPosts($request);
        
        return PostResource::collection($posts);
    }

    public function store(StorePostRequest $request): PostResource
    {
        $post = $this->postService->createPost($request->validated());
        
        return new PostResource($post);
    }

    public function show(Post $post): PostResource
    {
        $post->load(['user', 'category', 'comments.user']);
        
        return new PostResource($post);
    }

    public function update(UpdatePostRequest $request, Post $post): PostResource
    {
        $this->authorize('update', $post);
        
        $post = $this->postService->updatePost($post, $request->validated());
        
        return new PostResource($post);
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        
        $this->postService->deletePost($post);
        
        return response()->json(['message' => 'Post deleted successfully']);
    }
}
```

### **FRS.md - Technical Specifications**

The methodology automatically generates comprehensive technical documentation including:

- Database schema with relationships
- API endpoint documentation
- Security implementation details
- Performance optimization configurations
- Hosting-specific setup instructions

## 📊 **Hosted MySQL Optimization**

### **Database Configuration for Hosted Environment**

```php
// config/database.php optimizations for hosted MySQL
'mysql' => [
    'driver' => 'mysql',
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', '3306'),
    'database' => env('DB_DATABASE', 'forge'),
    'username' => env('DB_USERNAME', 'forge'),
    'password' => env('DB_PASSWORD', ''),
    'unix_socket' => env('DB_SOCKET', ''),
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
    'prefix_indexes' => true,
    'strict' => true,
    'engine' => null,
    'options' => extension_loaded('pdo_mysql') ? array_filter([
        PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
        PDO::ATTR_TIMEOUT => 60,
        PDO::ATTR_PERSISTENT => false,
    ]) : [],
    
    // Hosted MySQL optimizations
    'pool_size' => env('DB_POOL_SIZE', 10),
    'max_connections' => env('DB_MAX_CONNECTIONS', 20),
    'connect_timeout' => env('DB_CONNECT_TIMEOUT', 10),
    'read_timeout' => env('DB_READ_TIMEOUT', 30),
],
```

### **Migration Best Practices for Hosted Environment**

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title')->index();
            $table->string('slug')->unique();
            $table->text('content');
            $table->string('excerpt', 500)->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->timestamp('published_at')->nullable()->index();
            $table->boolean('is_featured')->default(false)->index();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Composite indexes for hosted MySQL optimization
            $table->index(['user_id', 'published_at']);
            $table->index(['category_id', 'published_at']);
            $table->index(['is_featured', 'published_at']);
            $table->fulltext(['title', 'content']); // MySQL 8.0+ feature
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
```

### **Query Optimization for Hosted MySQL**

```php
<?php

namespace App\Repositories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class PostRepository
{
    public function published(): Builder
    {
        return Post::query()
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->select([
                'id', 'title', 'slug', 'excerpt', 
                'user_id', 'category_id', 'published_at',
                'is_featured', 'created_at'
            ]); // Select only needed columns
    }

    public function findWithRelations(string $slug): ?Post
    {
        return Post::query()
            ->where('slug', $slug)
            ->with([
                'user:id,name,email', // Select specific columns
                'category:id,name,slug',
                'comments' => function ($query) {
                    $query->latest()->take(10)->with('user:id,name');
                }
            ])
            ->first();
    }

    public function getFeaturedPosts(int $limit = 5): Collection
    {
        return cache()->remember('featured_posts', 3600, function () use ($limit) {
            return Post::query()
                ->published()
                ->featured()
                ->with(['user:id,name', 'category:id,name,slug'])
                ->latest('published_at')
                ->take($limit)
                ->get();
        });
    }
}
```

## 🔧 **Artisan Commands for Methodology**

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MethodologySetup extends Command
{
    protected $signature = 'methodology:setup {--force : Force regeneration}';
    protected $description = 'Setup Architect Crew methodology for Laravel project';

    public function handle()
    {
        $this->info('Setting up Architect Crew methodology...');
        
        // Create methodology directories
        $this->createDirectories();
        
        // Copy templates
        $this->copyTemplates();
        
        // Generate initial documentation
        $this->generateInitialDocs();
        
        $this->info('✅ Methodology setup completed!');
        $this->line('Next steps:');
        $this->line('1. Update docs/RDS.md with your requirements');
        $this->line('2. Run: php artisan methodology:generate-claude');
        $this->line('3. Run: php artisan methodology:generate-agents');
        $this->line('4. Run: php artisan methodology:generate-frs');
    }

    private function createDirectories(): void
    {
        $directories = [
            'docs',
            'docs/personas',
            'methodology/templates',
            'methodology/scripts'
        ];

        foreach ($directories as $dir) {
            if (!is_dir($dir)) {
                mkdir($dir, 0755, true);
                $this->line("Created directory: {$dir}");
            }
        }
    }

    private function copyTemplates(): void
    {
        // Copy Laravel-specific templates
        $templates = [
            'CLAUDE.laravel.md' => 'methodology/templates/CLAUDE.template.md',
            'AGENTS.laravel.md' => 'methodology/templates/AGENTS.template.md',
            'FRS.laravel.md' => 'methodology/templates/FRS.template.md'
        ];

        foreach ($templates as $source => $destination) {
            if (!file_exists($destination)) {
                copy($source, $destination);
                $this->line("Copied template: {$destination}");
            }
        }
    }

    private function generateInitialDocs(): void
    {
        // Generate initial RDS.md if it doesn't exist
        if (!file_exists('docs/RDS.md')) {
            $rdsTemplate = $this->getLaravelRdsTemplate();
            file_put_contents('docs/RDS.md', $rdsTemplate);
            $this->line('Generated initial docs/RDS.md');
        }
    }

    private function getLaravelRdsTemplate(): string
    {
        return <<<'MD'
# Requirements Document Specification (RDS)
## Laravel Web Application

**Version**: 1.0.0  
**Date**: {date}  
**Project**: {project_name}  
**Technology**: Laravel + MySQL

## Project Overview

This document outlines the functional requirements for a Laravel web application with MySQL database.

### Primary Objectives

1. **Web Application Development**: Create a robust web application using Laravel framework
2. **Database Integration**: Implement MySQL database with optimized queries
3. **API Development**: Provide RESTful API endpoints for frontend consumption
4. **User Management**: Implement authentication and authorization
5. **Content Management**: Enable CRUD operations for application content

### User Personas

#### **End Users**
- **Role**: Application users
- **Needs**: Intuitive interface, fast performance, reliable functionality
- **Goals**: Accomplish tasks efficiently and securely

#### **Administrators**
- **Role**: System administrators
- **Needs**: Content management, user administration, system monitoring
- **Goals**: Maintain system health and manage application content

#### **Developers**
- **Role**: Development team members
- **Needs**: Clear documentation, maintainable code, testing tools
- **Goals**: Implement features efficiently and maintain code quality

### Functional Requirements

#### **User Authentication**
- User registration and login
- Password reset functionality
- Email verification
- Role-based access control

#### **Content Management**
- CRUD operations for main entities
- File upload and management
- Search and filtering capabilities
- Pagination for large datasets

#### **API Endpoints**
- RESTful API design
- JSON response format
- API authentication with Sanctum
- Rate limiting and security

#### **Database Requirements**
- MySQL 8.0+ compatibility
- Optimized queries and indexing
- Migration-based schema management
- Backup and recovery procedures

### Non-Functional Requirements

#### **Performance**
- Page load time < 2 seconds
- Database query optimization
- Caching implementation
- Asset optimization

#### **Security**
- SQL injection prevention
- XSS protection
- CSRF token validation
- Secure authentication

#### **Scalability**
- Horizontal scaling capability
- Database connection pooling
- Cache layer implementation
- Load balancing readiness

### Success Criteria

- Application deploys successfully to hosting environment
- All functional requirements implemented and tested
- Performance benchmarks met
- Security requirements validated
- Documentation complete and up-to-date

MD;
    }
}
```

## 🚀 **Deployment to Hosting**

### **Pre-Deployment Checklist**

```bash
# 1. Environment setup
cp .env.example .env.production
# Update .env.production with hosting details

# 2. Dependencies and optimization
composer install --optimize-autoloader --no-dev
npm run build

# 3. Generate optimized files
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 4. Database setup
php artisan migrate --force
php artisan db:seed --force

# 5. Storage and permissions
php artisan storage:link
chmod -R 755 storage bootstrap/cache
```

### **Hosting Configuration**

#### **Apache .htaccess (for shared hosting)**
```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

#### **Nginx Configuration (for VPS)**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/html/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### **Database Migration Script**
```bash
#!/bin/bash
# deploy-database.sh

set -e

echo "🚀 Starting database deployment..."

# Backup current database
php artisan db:backup

# Run migrations
php artisan migrate --force

# Seed if needed
if [ "$SEED_DATABASE" = "true" ]; then
    php artisan db:seed --force
fi

# Clear and cache
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Database deployment completed!"
```

## 📊 **Monitoring and Maintenance**

### **Laravel Telescope (Development)**
```bash
# Install Telescope for development monitoring
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate
```

### **Production Monitoring**
```php
// app/Exceptions/Handler.php
public function report(Throwable $exception)
{
    if (app()->environment('production')) {
        // Log to external service or email
        if ($this->shouldReport($exception)) {
            Log::channel('production')->error($exception->getMessage(), [
                'exception' => $exception,
                'user_id' => auth()->id(),
                'url' => request()->fullUrl(),
                'ip' => request()->ip(),
            ]);
        }
    }
    
    parent::report($exception);
}
```

### **Performance Monitoring**
```php
// app/Http/Middleware/PerformanceMonitoring.php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PerformanceMonitoring
{
    public function handle(Request $request, Closure $next)
    {
        $start = microtime(true);
        
        $response = $next($request);
        
        $duration = microtime(true) - $start;
        
        if ($duration > 2.0) { // Log slow requests
            Log::warning('Slow request detected', [
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'duration' => $duration,
                'memory' => memory_get_peak_usage(true),
            ]);
        }
        
        return $response;
    }
}
```

## 🎯 **Next Steps**

1. **Setup Project Structure**
   ```bash
   composer create-project laravel/laravel your-project
   cd your-project
   php artisan methodology:setup
   ```

2. **Configure Database Connection**
   - Update `.env` with your hosted MySQL credentials
   - Test connection with `php artisan tinker`

3. **Generate Methodology Documentation**
   ```bash
   php artisan methodology:generate-claude
   php artisan methodology:generate-agents
   php artisan methodology:generate-frs
   ```

4. **Implement Your Features**
   - Follow the patterns in AGENTS.md
   - Use the service-repository pattern
   - Implement comprehensive testing

5. **Deploy to Hosting**
   - Use the deployment scripts provided
   - Configure hosting environment properly
   - Monitor performance and errors

**The Architect Crew methodology will guide you through every step of Laravel development, from initial setup to production deployment, ensuring quality, performance, and maintainability.**

---

**Ready to build your Laravel application with the proven Architect Crew methodology? Start with the setup commands above!**