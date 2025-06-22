---
template: agents-openai-laravel-mcp.md
version: {{agentsVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/openai-laravel-mcp/AGENTS.openai-laravel-mcp.md
generatedBy: executor-crew
technology: OpenAI API + Laravel + MCP
generationTriggers: 
  - CLAUDE.md architecture changes
  - OpenAI API Laravel MCP implementation requirements updates
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
---

# AGENTS.md: AI Agent Constitution for OpenAI API Laravel MCP Service Development

**Version**: {{agentsVersion}}  
**Generated from**: CLAUDE.md architectural specification  
**Date**: {{date}}  
**Technology**: OpenAI API + Laravel + Model Context Protocol + PHP

This document provides the **official guidelines and mandatory protocols** for any AI agent contributing to this OpenAI API Laravel MCP service project. **You MUST adhere to all instructions herein.**

## Project Overview

{{openaiLaravelMcpProjectOverview}}

**Crucially, all AI agents MUST implement the OpenAI API Laravel MCP service architecture defined in `CLAUDE.md` and document technical specifications in `docs/FRS.md` as implementation proceeds.**

## OpenAI API Laravel MCP Implementation Requirements

Based on the architecture defined in CLAUDE.md, the following implementation requirements are mandatory:

{{openaiLaravelMcpImplementationRequirements}}

### Laravel Project Structure Standards

1. **Mandatory Laravel Project Structure**
   ```
   openai-laravel-mcp-service/
   ├── app/
   │   ├── Http/
   │   │   ├── Controllers/
   │   │   │   ├── Api/
   │   │   │   │   ├── OpenAIController.php
   │   │   │   │   ├── ChatController.php
   │   │   │   │   ├── ImagesController.php
   │   │   │   │   ├── AudioController.php
   │   │   │   │   └── EmbeddingsController.php
   │   │   │   └── McpController.php
   │   │   ├── Middleware/
   │   │   │   ├── OpenAIRateLimit.php
   │   │   │   ├── ValidateOpenAIRequest.php
   │   │   │   └── LogOpenAIUsage.php
   │   │   ├── Requests/
   │   │   │   ├── ChatCompletionRequest.php
   │   │   │   ├── ImageGenerationRequest.php
   │   │   │   ├── AudioTranscriptionRequest.php
   │   │   │   └── EmbeddingRequest.php
   │   │   └── Resources/
   │   │       ├── ChatCompletionResource.php
   │   │       ├── ImageGenerationResource.php
   │   │       ├── AudioProcessingResource.php
   │   │       └── EmbeddingResource.php
   │   ├── Services/
   │   │   ├── OpenAI/
   │   │   │   ├── OpenAIService.php
   │   │   │   ├── ChatService.php
   │   │   │   ├── ImagesService.php
   │   │   │   ├── AudioService.php
   │   │   │   ├── EmbeddingsService.php
   │   │   │   ├── AssistantsService.php
   │   │   │   └── FineTuningService.php
   │   │   ├── Mcp/
   │   │   │   ├── McpServerService.php
   │   │   │   ├── ToolRegistry.php
   │   │   │   ├── RequestHandler.php
   │   │   │   └── ResponseFormatter.php
   │   │   ├── Cache/
   │   │   │   ├── CacheService.php
   │   │   │   ├── RedisCacheService.php
   │   │   │   └── DatabaseCacheService.php
   │   │   └── Auth/
   │   │       ├── OpenAIAuthService.php
   │   │       ├── ApiKeyManager.php
   │   │       └── UsageTracker.php
   │   ├── Models/
   │   │   ├── OpenAIUsage.php
   │   │   ├── Conversation.php
   │   │   ├── Message.php
   │   │   ├── CachedResponse.php
   │   │   └── Assistant.php
   │   ├── Jobs/
   │   │   ├── ProcessOpenAIRequest.php
   │   │   ├── ProcessLongRunningTask.php
   │   │   ├── ProcessImageGeneration.php
   │   │   ├── ProcessAudioTranscription.php
   │   │   └── ProcessBatchEmbeddings.php
   │   ├── Events/
   │   │   ├── OpenAIRequestCompleted.php
   │   │   ├── TokensConsumed.php
   │   │   ├── RateLimitExceeded.php
   │   │   └── CacheUpdated.php
   │   ├── Listeners/
   │   │   ├── LogTokenUsage.php
   │   │   ├── UpdateUsageMetrics.php
   │   │   ├── NotifyRateLimit.php
   │   │   └── RefreshCache.php
   │   ├── Providers/
   │   │   ├── OpenAIServiceProvider.php
   │   │   ├── McpServiceProvider.php
   │   │   └── EventServiceProvider.php
   │   └── Console/
   │       └── Commands/
   │           ├── StartMcpServer.php
   │           ├── ClearOpenAICache.php
   │           ├── ProcessPendingJobs.php
   │           └── GenerateUsageReport.php
   ├── config/
   │   ├── openai.php
   │   ├── mcp.php
   │   ├── cache.php
   │   └── services.php
   ├── database/
   │   ├── migrations/
   │   │   ├── create_openai_usage_table.php
   │   │   ├── create_conversations_table.php
   │   │   ├── create_messages_table.php
   │   │   ├── create_cached_responses_table.php
   │   │   └── create_assistants_table.php
   │   ├── factories/
   │   └── seeders/
   ├── routes/
   │   ├── api.php
   │   ├── mcp.php
   │   └── web.php
   ├── tests/
   │   ├── Feature/
   │   │   ├── OpenAI/
   │   │   │   ├── ChatCompletionTest.php
   │   │   │   ├── ImageGenerationTest.php
   │   │   │   ├── AudioProcessingTest.php
   │   │   │   └── EmbeddingsTest.php
   │   │   ├── Mcp/
   │   │   │   ├── McpServerTest.php
   │   │   │   ├── ToolRegistryTest.php
   │   │   │   └── RequestHandlerTest.php
   │   │   └── Auth/
   │   │       ├── AuthenticationTest.php
   │   │       └── RateLimitingTest.php
   │   └── Unit/
   │       ├── Services/
   │       │   ├── OpenAIServiceTest.php
   │       │   ├── ChatServiceTest.php
   │       │   ├── CacheServiceTest.php
   │       │   └── McpServerServiceTest.php
   │       └── Models/
   │           ├── OpenAIUsageTest.php
   │           ├── ConversationTest.php
   │           └── MessageTest.php
   ├── storage/
   │   ├── logs/
   │   ├── cache/
   │   └── uploads/
   ├── docker/
   │   ├── Dockerfile
   │   ├── docker-compose.yml
   │   ├── nginx/
   │   └── supervisor/
   ├── .env.example
   ├── artisan
   ├── composer.json
   ├── phpunit.xml
   └── README.md
   ```

## 2. Mandatory Laravel Implementation Patterns

### Laravel Service Provider Implementation

**File**: `app/Providers/OpenAIServiceProvider.php`

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use OpenAI\Laravel\Facades\OpenAI;
use App\Services\OpenAI\OpenAIService;
use App\Services\OpenAI\ChatService;
use App\Services\OpenAI\ImagesService;
use App\Services\OpenAI\AudioService;
use App\Services\OpenAI\EmbeddingsService;

class OpenAIServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(OpenAIService::class, function ($app) {
            return new OpenAIService(
                $app->make('config')->get('openai'),
                $app->make('cache'),
                $app->make('log')
            );
        });

        $this->app->singleton(ChatService::class, function ($app) {
            return new ChatService(
                $app->make(OpenAIService::class),
                $app->make('config')->get('openai.chat', [])
            );
        });

        $this->app->singleton(ImagesService::class, function ($app) {
            return new ImagesService(
                $app->make(OpenAIService::class),
                $app->make('config')->get('openai.images', [])
            );
        });

        $this->app->singleton(AudioService::class, function ($app) {
            return new AudioService(
                $app->make(OpenAIService::class),
                $app->make('config')->get('openai.audio', [])
            );
        });

        $this->app->singleton(EmbeddingsService::class, function ($app) {
            return new EmbeddingsService(
                $app->make(OpenAIService::class),
                $app->make('config')->get('openai.embeddings', [])
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->publishes([
            __DIR__ . '/../../config/openai.php' => config_path('openai.php'),
        ], 'openai-config');

        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations');
    }
}
```

### Laravel MCP Service Provider Implementation

**File**: `app/Providers/McpServiceProvider.php`

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Mcp\McpServerService;
use App\Services\Mcp\ToolRegistry;
use App\Services\Mcp\RequestHandler;
use App\Services\Mcp\ResponseFormatter;
use PhpMcp\Laravel\Facades\Mcp;

class McpServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ToolRegistry::class, function ($app) {
            return new ToolRegistry(
                $app->make('config')->get('mcp.tools', [])
            );
        });

        $this->app->singleton(RequestHandler::class, function ($app) {
            return new RequestHandler(
                $app->make(ToolRegistry::class),
                $app->make('log')
            );
        });

        $this->app->singleton(ResponseFormatter::class, function ($app) {
            return new ResponseFormatter(
                $app->make('config')->get('mcp.response_format', [])
            );
        });

        $this->app->singleton(McpServerService::class, function ($app) {
            return new McpServerService(
                $app->make(RequestHandler::class),
                $app->make(ResponseFormatter::class),
                $app->make('config')->get('mcp')
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerMcpTools();
        
        $this->publishes([
            __DIR__ . '/../../config/mcp.php' => config_path('mcp.php'),
        ], 'mcp-config');

        $this->loadRoutesFrom(__DIR__ . '/../../routes/mcp.php');
    }

    /**
     * Register MCP tools with the registry.
     */
    private function registerMcpTools(): void
    {
        $toolRegistry = $this->app->make(ToolRegistry::class);

        // Register OpenAI Chat Tools
        $toolRegistry->register('openai_chat_completion', [
            'handler' => [\App\Services\OpenAI\ChatService::class, 'createCompletion'],
            'description' => 'Generate conversational responses with OpenAI GPT models',
            'schema' => [
                'type' => 'object',
                'properties' => [
                    'model' => ['type' => 'string', 'enum' => ['gpt-4', 'gpt-3.5-turbo']],
                    'messages' => ['type' => 'array'],
                    'temperature' => ['type' => 'number', 'minimum' => 0, 'maximum' => 2],
                    'max_tokens' => ['type' => 'integer', 'minimum' => 1],
                ],
                'required' => ['model', 'messages'],
            ],
        ]);

        // Register OpenAI Images Tools
        $toolRegistry->register('openai_image_generation', [
            'handler' => [\App\Services\OpenAI\ImagesService::class, 'generateImage'],
            'description' => 'Generate images using OpenAI DALL-E models',
            'schema' => [
                'type' => 'object',
                'properties' => [
                    'prompt' => ['type' => 'string'],
                    'model' => ['type' => 'string', 'enum' => ['dall-e-2', 'dall-e-3']],
                    'size' => ['type' => 'string', 'enum' => ['1024x1024', '1792x1024', '1024x1792']],
                    'quality' => ['type' => 'string', 'enum' => ['standard', 'hd']],
                    'n' => ['type' => 'integer', 'minimum' => 1, 'maximum' => 10],
                ],
                'required' => ['prompt'],
            ],
        ]);

        // Register additional tools...
    }
}
```

### Laravel OpenAI Service Implementation

**File**: `app/Services/OpenAI/OpenAIService.php`

```php
<?php

namespace App\Services\OpenAI;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use OpenAI\Laravel\Facades\OpenAI;
use App\Models\OpenAIUsage;
use App\Events\OpenAIRequestCompleted;
use App\Events\TokensConsumed;
use App\Exceptions\OpenAIServiceException;

class OpenAIService
{
    protected array $config;
    protected $cache;
    protected $logger;

    public function __construct(array $config, $cache, $logger)
    {
        $this->config = $config;
        $this->cache = $cache;
        $this->logger = $logger;
    }

    /**
     * Make a request to OpenAI API with caching and error handling.
     */
    public function makeRequest(string $endpoint, array $parameters): array
    {
        $cacheKey = $this->generateCacheKey($endpoint, $parameters);
        
        // Check cache first
        if ($this->shouldUseCache($endpoint)) {
            $cached = $this->cache->get($cacheKey);
            if ($cached !== null) {
                $this->logger->info('OpenAI cache hit', [
                    'endpoint' => $endpoint,
                    'cache_key' => $cacheKey,
                ]);
                return $cached;
            }
        }

        try {
            $startTime = microtime(true);
            
            // Make the actual API request
            $response = $this->executeApiCall($endpoint, $parameters);
            
            $duration = microtime(true) - $startTime;
            
            // Log usage and fire events
            $this->logUsage($endpoint, $parameters, $response, $duration);
            $this->fireEvents($endpoint, $parameters, $response);
            
            // Cache the response
            if ($this->shouldUseCache($endpoint)) {
                $ttl = $this->getCacheTTL($endpoint);
                $this->cache->put($cacheKey, $response, $ttl);
            }
            
            return $response;
            
        } catch (\Exception $e) {
            $this->logger->error('OpenAI API request failed', [
                'endpoint' => $endpoint,
                'parameters' => $parameters,
                'error' => $e->getMessage(),
            ]);
            
            throw new OpenAIServiceException(
                "OpenAI API request failed: {$e->getMessage()}",
                $e->getCode(),
                $e
            );
        }
    }

    /**
     * Execute the actual API call based on endpoint.
     */
    protected function executeApiCall(string $endpoint, array $parameters): array
    {
        switch ($endpoint) {
            case 'chat/completions':
                return OpenAI::chat()->create($parameters)->toArray();
                
            case 'completions':
                return OpenAI::completions()->create($parameters)->toArray();
                
            case 'images/generations':
                return OpenAI::images()->create($parameters)->toArray();
                
            case 'images/edits':
                return OpenAI::images()->edit($parameters)->toArray();
                
            case 'images/variations':
                return OpenAI::images()->variation($parameters)->toArray();
                
            case 'audio/transcriptions':
                return OpenAI::audio()->transcribe($parameters)->toArray();
                
            case 'audio/translations':
                return OpenAI::audio()->translate($parameters)->toArray();
                
            case 'audio/speech':
                return OpenAI::audio()->speech($parameters)->toArray();
                
            case 'embeddings':
                return OpenAI::embeddings()->create($parameters)->toArray();
                
            case 'fine_tuning/jobs':
                return OpenAI::fineTuning()->create($parameters)->toArray();
                
            default:
                throw new \InvalidArgumentException("Unsupported endpoint: {$endpoint}");
        }
    }

    /**
     * Generate cache key for request.
     */
    protected function generateCacheKey(string $endpoint, array $parameters): string
    {
        $key = sprintf(
            'openai:%s:%s',
            str_replace('/', '_', $endpoint),
            md5(json_encode($parameters))
        );
        
        return $key;
    }

    /**
     * Determine if endpoint should use caching.
     */
    protected function shouldUseCache(string $endpoint): bool
    {
        $cacheableEndpoints = [
            'embeddings',
            'images/generations',
            'audio/transcriptions',
            'audio/translations',
        ];
        
        return in_array($endpoint, $cacheableEndpoints);
    }

    /**
     * Get cache TTL for endpoint.
     */
    protected function getCacheTTL(string $endpoint): int
    {
        $ttlMap = [
            'embeddings' => 86400 * 7, // 7 days
            'images/generations' => 86400, // 1 day
            'audio/transcriptions' => 86400 * 3, // 3 days
            'audio/translations' => 86400 * 3, // 3 days
        ];
        
        return $ttlMap[$endpoint] ?? 3600; // Default 1 hour
    }

    /**
     * Log usage to database.
     */
    protected function logUsage(string $endpoint, array $parameters, array $response, float $duration): void
    {
        OpenAIUsage::create([
            'endpoint' => $endpoint,
            'model' => $parameters['model'] ?? null,
            'prompt_tokens' => $response['usage']['prompt_tokens'] ?? 0,
            'completion_tokens' => $response['usage']['completion_tokens'] ?? 0,
            'total_tokens' => $response['usage']['total_tokens'] ?? 0,
            'response_time' => $duration,
            'request_parameters' => json_encode($parameters),
            'response_data' => json_encode($response),
            'user_id' => auth()->id(),
            'created_at' => now(),
        ]);
    }

    /**
     * Fire Laravel events.
     */
    protected function fireEvents(string $endpoint, array $parameters, array $response): void
    {
        event(new OpenAIRequestCompleted($endpoint, $parameters, $response));
        
        if (isset($response['usage']['total_tokens'])) {
            event(new TokensConsumed(
                $response['usage']['total_tokens'],
                $parameters['model'] ?? null,
                auth()->id()
            ));
        }
    }
}
```

### Laravel Chat Service Implementation

**File**: `app/Services/OpenAI/ChatService.php`

```php
<?php

namespace App\Services\OpenAI;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ChatService
{
    protected OpenAIService $openAIService;
    protected array $config;

    public function __construct(OpenAIService $openAIService, array $config = [])
    {
        $this->openAIService = $openAIService;
        $this->config = $config;
    }

    /**
     * Create a chat completion.
     */
    public function createCompletion(array $parameters): array
    {
        $validated = $this->validateChatParameters($parameters);
        
        // Create or retrieve conversation
        $conversation = $this->getOrCreateConversation($validated);
        
        // Add user message to conversation
        $userMessage = $this->addMessageToConversation(
            $conversation,
            'user',
            $this->extractUserContent($validated['messages'])
        );
        
        // Prepare messages for OpenAI
        $messages = $this->prepareMessages($conversation, $validated['messages']);
        
        $requestParameters = [
            'model' => $validated['model'],
            'messages' => $messages,
            'temperature' => $validated['temperature'] ?? 0.7,
            'max_tokens' => $validated['max_tokens'] ?? null,
            'top_p' => $validated['top_p'] ?? 1,
            'frequency_penalty' => $validated['frequency_penalty'] ?? 0,
            'presence_penalty' => $validated['presence_penalty'] ?? 0,
            'stream' => $validated['stream'] ?? false,
        ];

        $response = $this->openAIService->makeRequest('chat/completions', $requestParameters);
        
        // Add assistant response to conversation
        $assistantContent = $response['choices'][0]['message']['content'] ?? '';
        $assistantMessage = $this->addMessageToConversation(
            $conversation,
            'assistant',
            $assistantContent
        );
        
        // Update conversation metadata
        $conversation->update([
            'total_tokens' => $response['usage']['total_tokens'] ?? 0,
            'last_activity' => now(),
        ]);
        
        return [
            'conversation_id' => $conversation->id,
            'message_id' => $assistantMessage->id,
            'response' => $response,
        ];
    }

    /**
     * Create a streaming chat completion.
     */
    public function createStreamingCompletion(array $parameters): \Generator
    {
        $validated = $this->validateChatParameters($parameters);
        $validated['stream'] = true;
        
        $conversation = $this->getOrCreateConversation($validated);
        $messages = $this->prepareMessages($conversation, $validated['messages']);
        
        $requestParameters = [
            'model' => $validated['model'],
            'messages' => $messages,
            'temperature' => $validated['temperature'] ?? 0.7,
            'max_tokens' => $validated['max_tokens'] ?? null,
            'stream' => true,
        ];

        // Note: Streaming implementation would require custom HTTP client handling
        // This is a simplified version for demonstration
        yield from $this->handleStreamingResponse($requestParameters, $conversation);
    }

    /**
     * Validate chat completion parameters.
     */
    protected function validateChatParameters(array $parameters): array
    {
        $validator = Validator::make($parameters, [
            'model' => [
                'required',
                'string',
                Rule::in(['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo', 'gpt-3.5-turbo-16k'])
            ],
            'messages' => 'required|array|min:1',
            'messages.*.role' => 'required|string|in:system,user,assistant',
            'messages.*.content' => 'required|string',
            'temperature' => 'nullable|numeric|min:0|max:2',
            'max_tokens' => 'nullable|integer|min:1',
            'top_p' => 'nullable|numeric|min:0|max:1',
            'frequency_penalty' => 'nullable|numeric|min:-2|max:2',
            'presence_penalty' => 'nullable|numeric|min:-2|max:2',
            'stream' => 'nullable|boolean',
            'conversation_id' => 'nullable|integer|exists:conversations,id',
        ]);

        if ($validator->fails()) {
            throw new \InvalidArgumentException(
                'Invalid chat completion parameters: ' . 
                implode(', ', $validator->errors()->all())
            );
        }

        return $validator->validated();
    }

    /**
     * Get or create conversation.
     */
    protected function getOrCreateConversation(array $validated): Conversation
    {
        if (isset($validated['conversation_id'])) {
            return Conversation::findOrFail($validated['conversation_id']);
        }

        return Conversation::create([
            'user_id' => auth()->id(),
            'model' => $validated['model'],
            'title' => $this->generateConversationTitle($validated['messages']),
            'created_at' => now(),
        ]);
    }

    /**
     * Add message to conversation.
     */
    protected function addMessageToConversation(Conversation $conversation, string $role, string $content): Message
    {
        return $conversation->messages()->create([
            'role' => $role,
            'content' => $content,
            'tokens' => $this->estimateTokens($content),
            'created_at' => now(),
        ]);
    }

    /**
     * Prepare messages for OpenAI API.
     */
    protected function prepareMessages(Conversation $conversation, array $newMessages): array
    {
        $existingMessages = $conversation->messages()
            ->orderBy('created_at')
            ->get(['role', 'content'])
            ->toArray();

        return array_merge($existingMessages, $newMessages);
    }

    /**
     * Extract user content from messages.
     */
    protected function extractUserContent(array $messages): string
    {
        $userMessages = array_filter($messages, fn($msg) => $msg['role'] === 'user');
        $lastUserMessage = end($userMessages);
        
        return $lastUserMessage['content'] ?? '';
    }

    /**
     * Generate conversation title.
     */
    protected function generateConversationTitle(array $messages): string
    {
        $firstUserMessage = collect($messages)->firstWhere('role', 'user');
        $content = $firstUserMessage['content'] ?? 'New Conversation';
        
        return \Str::limit($content, 50);
    }

    /**
     * Estimate token count for content.
     */
    protected function estimateTokens(string $content): int
    {
        // Simple estimation: ~4 characters per token
        return (int) ceil(strlen($content) / 4);
    }

    /**
     * Handle streaming response (simplified implementation).
     */
    protected function handleStreamingResponse(array $parameters, Conversation $conversation): \Generator
    {
        // This would require a custom streaming HTTP client implementation
        // For now, we'll simulate streaming behavior
        $response = $this->openAIService->makeRequest('chat/completions', $parameters);
        
        $content = $response['choices'][0]['message']['content'] ?? '';
        $chunks = str_split($content, 10); // Simulate chunks
        
        foreach ($chunks as $chunk) {
            yield [
                'choices' => [
                    [
                        'delta' => ['content' => $chunk],
                        'finish_reason' => null,
                    ]
                ]
            ];
            
            usleep(50000); // Simulate delay
        }
        
        // Final chunk
        yield [
            'choices' => [
                [
                    'delta' => [],
                    'finish_reason' => 'stop',
                ]
            ]
        ];
    }
}
```

## 3. Laravel MCP Tool Registration Requirements

### MCP Route Configuration

**File**: `routes/mcp.php`

```php
<?php

use PhpMcp\Laravel\Facades\Mcp;
use App\Services\OpenAI\ChatService;
use App\Services\OpenAI\ImagesService;
use App\Services\OpenAI\AudioService;
use App\Services\OpenAI\EmbeddingsService;

/*
|--------------------------------------------------------------------------
| MCP Tool Routes
|--------------------------------------------------------------------------
|
| Here you can register MCP tools that will be exposed to LLM clients.
| These tools provide standardized interfaces for OpenAI API services.
|
*/

// Chat Completion Tools
Mcp::tool([ChatService::class, 'createCompletion'])
    ->name('openai_chat_completion')
    ->description('Generate conversational responses with OpenAI GPT models')
    ->schema([
        'type' => 'object',
        'properties' => [
            'model' => [
                'type' => 'string',
                'enum' => ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
                'description' => 'The OpenAI model to use for completion'
            ],
            'messages' => [
                'type' => 'array',
                'items' => [
                    'type' => 'object',
                    'properties' => [
                        'role' => ['type' => 'string', 'enum' => ['system', 'user', 'assistant']],
                        'content' => ['type' => 'string']
                    ],
                    'required' => ['role', 'content']
                ],
                'description' => 'Array of message objects for conversation'
            ],
            'temperature' => [
                'type' => 'number',
                'minimum' => 0,
                'maximum' => 2,
                'description' => 'Sampling temperature for response creativity'
            ],
            'max_tokens' => [
                'type' => 'integer',
                'minimum' => 1,
                'description' => 'Maximum tokens in the response'
            ],
            'conversation_id' => [
                'type' => 'integer',
                'description' => 'Optional conversation ID to continue existing chat'
            ]
        ],
        'required' => ['model', 'messages']
    ]);

Mcp::tool([ChatService::class, 'createStreamingCompletion'])
    ->name('openai_chat_streaming')
    ->description('Generate streaming chat responses for real-time interaction')
    ->schema([
        'type' => 'object',
        'properties' => [
            'model' => [
                'type' => 'string',
                'enum' => ['gpt-4', 'gpt-3.5-turbo'],
                'description' => 'The OpenAI model for streaming completion'
            ],
            'messages' => [
                'type' => 'array',
                'description' => 'Array of message objects for conversation'
            ],
            'temperature' => [
                'type' => 'number',
                'minimum' => 0,
                'maximum' => 2,
                'default' => 0.7
            ]
        ],
        'required' => ['model', 'messages']
    ]);

// Image Generation Tools
Mcp::tool([ImagesService::class, 'generateImage'])
    ->name('openai_image_generation')
    ->description('Generate images using OpenAI DALL-E models')
    ->schema([
        'type' => 'object',
        'properties' => [
            'prompt' => [
                'type' => 'string',
                'description' => 'Text description of the desired image'
            ],
            'model' => [
                'type' => 'string',
                'enum' => ['dall-e-2', 'dall-e-3'],
                'default' => 'dall-e-3',
                'description' => 'DALL-E model version to use'
            ],
            'size' => [
                'type' => 'string',
                'enum' => ['1024x1024', '1792x1024', '1024x1792'],
                'default' => '1024x1024',
                'description' => 'Size of the generated image'
            ],
            'quality' => [
                'type' => 'string',
                'enum' => ['standard', 'hd'],
                'default' => 'standard',
                'description' => 'Quality level of the generated image'
            ],
            'n' => [
                'type' => 'integer',
                'minimum' => 1,
                'maximum' => 10,
                'default' => 1,
                'description' => 'Number of images to generate'
            ]
        ],
        'required' => ['prompt']
    ]);

Mcp::tool([ImagesService::class, 'editImage'])
    ->name('openai_image_edit')
    ->description('Edit existing images with OpenAI DALL-E')
    ->schema([
        'type' => 'object',
        'properties' => [
            'image' => [
                'type' => 'string',
                'description' => 'Base64 encoded image or file path'
            ],
            'mask' => [
                'type' => 'string',
                'description' => 'Base64 encoded mask image (optional)'
            ],
            'prompt' => [
                'type' => 'string',
                'description' => 'Description of the desired edit'
            ],
            'n' => [
                'type' => 'integer',
                'minimum' => 1,
                'maximum' => 10,
                'default' => 1
            ],
            'size' => [
                'type' => 'string',
                'enum' => ['1024x1024'],
                'default' => '1024x1024'
            ]
        ],
        'required' => ['image', 'prompt']
    ]);

// Audio Processing Tools
Mcp::tool([AudioService::class, 'transcribeAudio'])
    ->name('openai_audio_transcription')
    ->description('Transcribe audio files using OpenAI Whisper')
    ->schema([
        'type' => 'object',
        'properties' => [
            'file' => [
                'type' => 'string',
                'description' => 'Audio file path or base64 encoded audio'
            ],
            'model' => [
                'type' => 'string',
                'enum' => ['whisper-1'],
                'default' => 'whisper-1',
                'description' => 'Whisper model to use'
            ],
            'language' => [
                'type' => 'string',
                'description' => 'Language of the audio (ISO-639-1 format)'
            ],
            'prompt' => [
                'type' => 'string',
                'description' => 'Optional prompt to guide transcription'
            ],
            'response_format' => [
                'type' => 'string',
                'enum' => ['json', 'text', 'srt', 'verbose_json', 'vtt'],
                'default' => 'json'
            ],
            'temperature' => [
                'type' => 'number',
                'minimum' => 0,
                'maximum' => 1,
                'default' => 0
            ]
        ],
        'required' => ['file']
    ]);

Mcp::tool([AudioService::class, 'translateAudio'])
    ->name('openai_audio_translation')
    ->description('Translate audio to English using OpenAI Whisper')
    ->schema([
        'type' => 'object',
        'properties' => [
            'file' => [
                'type' => 'string',
                'description' => 'Audio file to translate'
            ],
            'model' => [
                'type' => 'string',
                'enum' => ['whisper-1'],
                'default' => 'whisper-1'
            ],
            'prompt' => [
                'type' => 'string',
                'description' => 'Optional prompt to guide translation'
            ],
            'response_format' => [
                'type' => 'string',
                'enum' => ['json', 'text', 'srt', 'verbose_json', 'vtt'],
                'default' => 'json'
            ],
            'temperature' => [
                'type' => 'number',
                'minimum' => 0,
                'maximum' => 1,
                'default' => 0
            ]
        ],
        'required' => ['file']
    ]);

Mcp::tool([AudioService::class, 'textToSpeech'])
    ->name('openai_text_to_speech')
    ->description('Convert text to speech using OpenAI TTS')
    ->schema([
        'type' => 'object',
        'properties' => [
            'input' => [
                'type' => 'string',
                'description' => 'Text to convert to speech'
            ],
            'model' => [
                'type' => 'string',
                'enum' => ['tts-1', 'tts-1-hd'],
                'default' => 'tts-1',
                'description' => 'TTS model to use'
            ],
            'voice' => [
                'type' => 'string',
                'enum' => ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'],
                'default' => 'alloy',
                'description' => 'Voice to use for speech synthesis'
            ],
            'response_format' => [
                'type' => 'string',
                'enum' => ['mp3', 'opus', 'aac', 'flac'],
                'default' => 'mp3',
                'description' => 'Audio format for output'
            ],
            'speed' => [
                'type' => 'number',
                'minimum' => 0.25,
                'maximum' => 4.0,
                'default' => 1.0,
                'description' => 'Speed of speech generation'
            ]
        ],
        'required' => ['input']
    ]);

// Embeddings Tools
Mcp::tool([EmbeddingsService::class, 'createEmbeddings'])
    ->name('openai_create_embeddings')
    ->description('Generate text embeddings for semantic analysis')
    ->schema([
        'type' => 'object',
        'properties' => [
            'input' => [
                'type' => ['string', 'array'],
                'description' => 'Text or array of texts to embed'
            ],
            'model' => [
                'type' => 'string',
                'enum' => ['text-embedding-ada-002', 'text-embedding-3-small', 'text-embedding-3-large'],
                'default' => 'text-embedding-3-small',
                'description' => 'Embedding model to use'
            ],
            'encoding_format' => [
                'type' => 'string',
                'enum' => ['float', 'base64'],
                'default' => 'float',
                'description' => 'Format for the embeddings'
            ],
            'dimensions' => [
                'type' => 'integer',
                'description' => 'Number of dimensions for the embedding (model dependent)'
            ]
        ],
        'required' => ['input']
    ]);

Mcp::tool([EmbeddingsService::class, 'similaritySearch'])
    ->name('openai_similarity_search')
    ->description('Find similar content using embedding vectors')
    ->schema([
        'type' => 'object',
        'properties' => [
            'query' => [
                'type' => 'string',
                'description' => 'Text query to find similar content for'
            ],
            'documents' => [
                'type' => 'array',
                'items' => ['type' => 'string'],
                'description' => 'Array of documents to search through'
            ],
            'model' => [
                'type' => 'string',
                'enum' => ['text-embedding-ada-002', 'text-embedding-3-small'],
                'default' => 'text-embedding-3-small'
            ],
            'top_k' => [
                'type' => 'integer',
                'minimum' => 1,
                'maximum' => 100,
                'default' => 5,
                'description' => 'Number of most similar results to return'
            ],
            'threshold' => [
                'type' => 'number',
                'minimum' => 0,
                'maximum' => 1,
                'description' => 'Minimum similarity threshold'
            ]
        ],
        'required' => ['query', 'documents']
    ]);
```

## 4. Laravel Testing Implementation Requirements

### Feature Test Example

**File**: `tests/Feature/OpenAI/ChatCompletionTest.php`

```php
<?php

namespace Tests\Feature\OpenAI;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use OpenAI\Laravel\Facades\OpenAI;
use OpenAI\Responses\Chat\CreateResponse;
use App\Models\User;
use App\Models\Conversation;
use App\Services\OpenAI\ChatService;

class ChatCompletionTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->actingAs(User::factory()->create());
    }

    /** @test */
    public function it_can_create_chat_completion()
    {
        // Mock OpenAI response
        OpenAI::fake([
            CreateResponse::fake([
                'choices' => [
                    [
                        'message' => [
                            'role' => 'assistant',
                            'content' => 'Hello! How can I help you today?',
                        ],
                        'finish_reason' => 'stop',
                    ],
                ],
                'usage' => [
                    'prompt_tokens' => 10,
                    'completion_tokens' => 15,
                    'total_tokens' => 25,
                ],
            ]),
        ]);

        $chatService = app(ChatService::class);
        
        $parameters = [
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'user', 'content' => 'Hello, how are you?'],
            ],
        ];

        $result = $chatService->createCompletion($parameters);

        $this->assertArrayHasKey('conversation_id', $result);
        $this->assertArrayHasKey('message_id', $result);
        $this->assertArrayHasKey('response', $result);
        
        // Verify conversation was created
        $conversation = Conversation::find($result['conversation_id']);
        $this->assertNotNull($conversation);
        $this->assertEquals('gpt-3.5-turbo', $conversation->model);
        $this->assertEquals(2, $conversation->messages()->count()); // user + assistant
        
        // Verify messages were stored
        $messages = $conversation->messages()->orderBy('created_at')->get();
        $this->assertEquals('user', $messages[0]->role);
        $this->assertEquals('Hello, how are you?', $messages[0]->content);
        $this->assertEquals('assistant', $messages[1]->role);
        $this->assertEquals('Hello! How can I help you today?', $messages[1]->content);
    }

    /** @test */
    public function it_validates_chat_completion_parameters()
    {
        $chatService = app(ChatService::class);
        
        $this->expectException(\InvalidArgumentException::class);
        
        $chatService->createCompletion([
            'model' => 'invalid-model',
            'messages' => [],
        ]);
    }

    /** @test */
    public function it_can_continue_existing_conversation()
    {
        $conversation = Conversation::factory()->create([
            'user_id' => auth()->id(),
            'model' => 'gpt-3.5-turbo',
        ]);

        // Add initial message
        $conversation->messages()->create([
            'role' => 'user',
            'content' => 'What is Laravel?',
        ]);

        OpenAI::fake([
            CreateResponse::fake([
                'choices' => [
                    [
                        'message' => [
                            'role' => 'assistant',
                            'content' => 'Laravel is a PHP framework for web applications.',
                        ],
                    ],
                ],
            ]),
        ]);

        $chatService = app(ChatService::class);
        
        $result = $chatService->createCompletion([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'user', 'content' => 'Tell me more about it.'],
            ],
            'conversation_id' => $conversation->id,
        ]);

        $this->assertEquals($conversation->id, $result['conversation_id']);
        $this->assertEquals(3, $conversation->fresh()->messages()->count());
    }

    /** @test */
    public function it_handles_openai_api_errors()
    {
        OpenAI::fake([
            new \Exception('API rate limit exceeded'),
        ]);

        $chatService = app(ChatService::class);
        
        $this->expectException(\App\Exceptions\OpenAIServiceException::class);
        
        $chatService->createCompletion([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'user', 'content' => 'Hello'],
            ],
        ]);
    }

    /** @test */
    public function it_caches_responses_when_appropriate()
    {
        // This test would verify caching behavior
        // Implementation depends on specific caching strategy
    }
}
```

## 5. Mandatory Configuration Files

### OpenAI Configuration

**File**: `config/openai.php`

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | OpenAI API Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for OpenAI API integration including API keys,
    | default models, and service-specific settings.
    |
    */

    'api_key' => env('OPENAI_API_KEY'),
    'organization' => env('OPENAI_ORGANIZATION'),
    'request_timeout' => env('OPENAI_REQUEST_TIMEOUT', 30),
    'base_uri' => env('OPENAI_BASE_URI', 'https://api.openai.com/v1/'),

    /*
    |--------------------------------------------------------------------------
    | Default Models
    |--------------------------------------------------------------------------
    */

    'models' => [
        'chat' => env('OPENAI_DEFAULT_CHAT_MODEL', 'gpt-3.5-turbo'),
        'completion' => env('OPENAI_DEFAULT_COMPLETION_MODEL', 'gpt-3.5-turbo-instruct'),
        'embedding' => env('OPENAI_DEFAULT_EMBEDDING_MODEL', 'text-embedding-3-small'),
        'image' => env('OPENAI_DEFAULT_IMAGE_MODEL', 'dall-e-3'),
        'audio' => env('OPENAI_DEFAULT_AUDIO_MODEL', 'whisper-1'),
        'tts' => env('OPENAI_DEFAULT_TTS_MODEL', 'tts-1'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Service-Specific Configuration
    |--------------------------------------------------------------------------
    */

    'chat' => [
        'max_tokens' => env('OPENAI_CHAT_MAX_TOKENS', 4096),
        'temperature' => env('OPENAI_CHAT_TEMPERATURE', 0.7),
        'top_p' => env('OPENAI_CHAT_TOP_P', 1),
        'frequency_penalty' => env('OPENAI_CHAT_FREQUENCY_PENALTY', 0),
        'presence_penalty' => env('OPENAI_CHAT_PRESENCE_PENALTY', 0),
        'stream' => env('OPENAI_CHAT_STREAM', false),
    ],

    'images' => [
        'size' => env('OPENAI_IMAGE_SIZE', '1024x1024'),
        'quality' => env('OPENAI_IMAGE_QUALITY', 'standard'),
        'style' => env('OPENAI_IMAGE_STYLE', 'vivid'),
        'response_format' => env('OPENAI_IMAGE_RESPONSE_FORMAT', 'url'),
    ],

    'audio' => [
        'response_format' => env('OPENAI_AUDIO_RESPONSE_FORMAT', 'json'),
        'temperature' => env('OPENAI_AUDIO_TEMPERATURE', 0),
        'language' => env('OPENAI_AUDIO_LANGUAGE', 'en'),
    ],

    'tts' => [
        'voice' => env('OPENAI_TTS_VOICE', 'alloy'),
        'response_format' => env('OPENAI_TTS_RESPONSE_FORMAT', 'mp3'),
        'speed' => env('OPENAI_TTS_SPEED', 1.0),
    ],

    'embeddings' => [
        'encoding_format' => env('OPENAI_EMBEDDING_FORMAT', 'float'),
        'dimensions' => env('OPENAI_EMBEDDING_DIMENSIONS'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Caching Configuration
    |--------------------------------------------------------------------------
    */

    'cache' => [
        'enabled' => env('OPENAI_CACHE_ENABLED', true),
        'ttl' => [
            'chat' => env('OPENAI_CACHE_TTL_CHAT', 3600), // 1 hour
            'completion' => env('OPENAI_CACHE_TTL_COMPLETION', 3600), // 1 hour
            'embeddings' => env('OPENAI_CACHE_TTL_EMBEDDINGS', 604800), // 7 days
            'images' => env('OPENAI_CACHE_TTL_IMAGES', 86400), // 1 day
            'audio' => env('OPENAI_CACHE_TTL_AUDIO', 259200), // 3 days
        ],
        'prefix' => env('OPENAI_CACHE_PREFIX', 'openai:'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Rate Limiting
    |--------------------------------------------------------------------------
    */

    'rate_limiting' => [
        'enabled' => env('OPENAI_RATE_LIMITING_ENABLED', true),
        'requests_per_minute' => env('OPENAI_RATE_LIMIT_RPM', 60),
        'tokens_per_minute' => env('OPENAI_RATE_LIMIT_TPM', 150000),
        'requests_per_day' => env('OPENAI_RATE_LIMIT_RPD', 10000),
    ],

    /*
    |--------------------------------------------------------------------------
    | Usage Tracking
    |--------------------------------------------------------------------------
    */

    'usage_tracking' => [
        'enabled' => env('OPENAI_USAGE_TRACKING', true),
        'log_requests' => env('OPENAI_LOG_REQUESTS', true),
        'log_responses' => env('OPENAI_LOG_RESPONSES', false),
        'track_costs' => env('OPENAI_TRACK_COSTS', true),
    ],

    /*
    |--------------------------------------------------------------------------
    | Error Handling
    |--------------------------------------------------------------------------
    */

    'error_handling' => [
        'retry_attempts' => env('OPENAI_RETRY_ATTEMPTS', 3),
        'retry_delay' => env('OPENAI_RETRY_DELAY', 1000), // milliseconds
        'exponential_backoff' => env('OPENAI_EXPONENTIAL_BACKOFF', true),
        'log_errors' => env('OPENAI_LOG_ERRORS', true),
    ],
];
```

### MCP Configuration

**File**: `config/mcp.php`

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | MCP Server Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for Model Context Protocol server including transport
    | settings, tool definitions, and performance options.
    |
    */

    'server' => [
        'name' => env('MCP_SERVER_NAME', 'openai-laravel-mcp'),
        'version' => env('MCP_SERVER_VERSION', '1.0.0'),
        'description' => 'OpenAI API integration with Laravel MCP service',
        'author' => env('MCP_SERVER_AUTHOR', 'Laravel Team'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Transport Configuration
    |--------------------------------------------------------------------------
    */

    'transport' => [
        'type' => env('MCP_TRANSPORT_TYPE', 'http+sse'), // stdio, http+sse, streamable-http
        'host' => env('MCP_HOST', '0.0.0.0'),
        'port' => env('MCP_PORT', 3000),
        'path' => env('MCP_PATH', '/mcp'),
        'cors' => [
            'enabled' => env('MCP_CORS_ENABLED', true),
            'origins' => explode(',', env('MCP_CORS_ORIGINS', '*')),
            'methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            'headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Tool Configuration
    |--------------------------------------------------------------------------
    */

    'tools' => [
        'enabled' => true,
        'auto_discovery' => env('MCP_AUTO_DISCOVERY', true),
        'discovery_paths' => [
            app_path('Services/OpenAI'),
            app_path('Services/Mcp/Tools'),
        ],
        'cache_definitions' => env('MCP_CACHE_TOOL_DEFINITIONS', true),
        'cache_ttl' => env('MCP_TOOL_CACHE_TTL', 3600),
    ],

    /*
    |--------------------------------------------------------------------------
    | Resource Configuration
    |--------------------------------------------------------------------------
    */

    'resources' => [
        'enabled' => env('MCP_RESOURCES_ENABLED', false),
        'base_uri' => env('MCP_RESOURCES_BASE_URI', 'resource://'),
        'templates' => [
            'conversations' => 'conversation://{id}',
            'messages' => 'message://{conversation_id}/{message_id}',
            'usage' => 'usage://{user_id}',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Prompts Configuration
    |--------------------------------------------------------------------------
    */

    'prompts' => [
        'enabled' => env('MCP_PROMPTS_ENABLED', false),
        'directory' => resource_path('prompts'),
        'auto_discovery' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Security Configuration
    |--------------------------------------------------------------------------
    */

    'security' => [
        'authentication' => [
            'enabled' => env('MCP_AUTH_ENABLED', true),
            'driver' => env('MCP_AUTH_DRIVER', 'sanctum'), // sanctum, passport, api_key
            'api_key_header' => env('MCP_API_KEY_HEADER', 'X-MCP-API-Key'),
        ],
        'rate_limiting' => [
            'enabled' => env('MCP_RATE_LIMITING_ENABLED', true),
            'requests_per_minute' => env('MCP_RATE_LIMIT_RPM', 100),
            'per_user' => env('MCP_RATE_LIMIT_PER_USER', true),
        ],
        'validation' => [
            'strict_schemas' => env('MCP_STRICT_VALIDATION', true),
            'sanitize_inputs' => env('MCP_SANITIZE_INPUTS', true),
            'max_payload_size' => env('MCP_MAX_PAYLOAD_SIZE', '10MB'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Performance Configuration
    |--------------------------------------------------------------------------
    */

    'performance' => [
        'caching' => [
            'enabled' => env('MCP_CACHING_ENABLED', true),
            'driver' => env('MCP_CACHE_DRIVER', 'redis'),
            'prefix' => env('MCP_CACHE_PREFIX', 'mcp:'),
            'ttl' => env('MCP_CACHE_TTL', 3600),
        ],
        'queue' => [
            'enabled' => env('MCP_QUEUE_ENABLED', true),
            'connection' => env('MCP_QUEUE_CONNECTION', 'redis'),
            'queue' => env('MCP_QUEUE_NAME', 'mcp'),
            'timeout' => env('MCP_QUEUE_TIMEOUT', 300),
        ],
        'streaming' => [
            'enabled' => env('MCP_STREAMING_ENABLED', true),
            'chunk_size' => env('MCP_STREAM_CHUNK_SIZE', 1024),
            'buffer_size' => env('MCP_STREAM_BUFFER_SIZE', 8192),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Logging and Monitoring
    |--------------------------------------------------------------------------
    */

    'logging' => [
        'enabled' => env('MCP_LOGGING_ENABLED', true),
        'level' => env('MCP_LOG_LEVEL', 'info'),
        'channels' => explode(',', env('MCP_LOG_CHANNELS', 'single,stack')),
        'log_requests' => env('MCP_LOG_REQUESTS', true),
        'log_responses' => env('MCP_LOG_RESPONSES', false),
        'log_performance' => env('MCP_LOG_PERFORMANCE', true),
    ],

    'monitoring' => [
        'health_checks' => [
            'enabled' => env('MCP_HEALTH_CHECKS_ENABLED', true),
            'interval' => env('MCP_HEALTH_CHECK_INTERVAL', 60), // seconds
            'endpoints' => [
                'openai' => 'https://api.openai.com/v1/models',
                'redis' => env('REDIS_URL'),
                'database' => env('DB_CONNECTION'),
            ],
        ],
        'metrics' => [
            'enabled' => env('MCP_METRICS_ENABLED', true),
            'driver' => env('MCP_METRICS_DRIVER', 'prometheus'),
            'endpoint' => env('MCP_METRICS_ENDPOINT', '/metrics'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Development Configuration
    |--------------------------------------------------------------------------
    */

    'development' => [
        'debug' => env('MCP_DEBUG', env('APP_DEBUG', false)),
        'mock_responses' => env('MCP_MOCK_RESPONSES', false),
        'introspection' => env('MCP_INTROSPECTION_ENABLED', true),
        'playground' => env('MCP_PLAYGROUND_ENABLED', env('APP_DEBUG', false)),
    ],
];
```

## 6. Quality Assurance and Testing Standards

### Testing Requirements

1. **Unit Testing Coverage**: Minimum 90% code coverage for all service classes
2. **Feature Testing**: Complete test coverage for all MCP tool endpoints
3. **Integration Testing**: Full OpenAI API integration testing with mocking
4. **Performance Testing**: Response time and throughput benchmarks
5. **Security Testing**: Authentication, authorization, and input validation tests

### Code Quality Standards

1. **Laravel Conventions**: Follow Laravel naming conventions and patterns
2. **PSR Standards**: Comply with PSR-12 coding standards
3. **Type Hinting**: Use strict typing for all method parameters and returns
4. **Documentation**: Comprehensive PHPDoc comments for all public methods
5. **Error Handling**: Consistent exception handling with proper Laravel error responses

## 7. Security Implementation Requirements

### Authentication Requirements

1. **Laravel Sanctum**: Use Sanctum for API authentication
2. **API Key Management**: Secure storage and rotation of OpenAI API keys
3. **Rate Limiting**: Implement per-user and global rate limiting
4. **Input Validation**: Strict validation using Laravel validation rules
5. **Output Sanitization**: Sanitize all responses to prevent XSS

### Security Best Practices

1. **Environment Variables**: Store all sensitive data in environment variables
2. **HTTPS Only**: Enforce HTTPS for all MCP communications
3. **CORS Configuration**: Proper CORS setup for cross-origin requests
4. **Request Logging**: Log all API requests for security monitoring
5. **Error Hiding**: Hide internal errors from public API responses

## 8. Performance and Scalability Requirements

### Caching Strategy

1. **Multi-Level Caching**: Implement Redis caching with database fallback
2. **Smart Cache Keys**: Generate cache keys based on request parameters
3. **Cache Invalidation**: Implement proper cache invalidation strategies
4. **Cache Warming**: Pre-warm frequently accessed data

### Queue Implementation

1. **Async Processing**: Use Laravel queues for long-running requests
2. **Priority Queues**: Implement priority-based queue processing
3. **Failed Job Handling**: Proper failed job retry and error handling
4. **Queue Monitoring**: Monitor queue health and performance

## 9. Deployment and Infrastructure Requirements

### Laravel Octane Deployment

1. **High Performance**: Deploy with Laravel Octane for improved performance
2. **Concurrent Handling**: Support for concurrent MCP SSE connections
3. **Memory Management**: Proper memory management for long-running processes
4. **Health Monitoring**: Comprehensive health checks and monitoring

### Container Deployment

1. **Docker Support**: Provide Docker containers for easy deployment
2. **Orchestration**: Support for Kubernetes deployment
3. **Scaling**: Horizontal scaling configuration
4. **Load Balancing**: Load balancer configuration for multiple instances

---

**Remember**: All AI agents MUST follow these implementation requirements exactly. Any deviation from these standards will result in implementation rejection and requirement for refactoring.

**File Encoding**: All files MUST be created in UTF-8 encoding without BOM.

**Prime Directive**: Implement a production-ready OpenAI API Laravel MCP service that follows Laravel best practices while providing seamless LLM integration through standardized MCP protocols.