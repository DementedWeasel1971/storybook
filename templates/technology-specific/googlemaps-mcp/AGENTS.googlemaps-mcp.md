---
template: agents-googlemaps-mcp.md
version: {{agentsVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/googlemaps-mcp/AGENTS.googlemaps-mcp.md
generatedBy: executor-crew
technology: Google Maps API + MCP
generationTriggers: 
  - CLAUDE.md architecture changes
  - Google Maps API MCP implementation requirements updates
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
---

# AGENTS.md: AI Agent Constitution for Google Maps API MCP Service Development

**Version**: {{agentsVersion}}  
**Generated from**: CLAUDE.md architectural specification  
**Date**: {{date}}  
**Technology**: Google Maps API + Model Context Protocol + Node.js/TypeScript

This document provides the **official guidelines and mandatory protocols** for any AI agent contributing to this Google Maps API MCP service project. **You MUST adhere to all instructions herein.**

## Project Overview

{{googlemapsMcpProjectOverview}}

**Crucially, all AI agents MUST implement the Google Maps API MCP service architecture defined in `CLAUDE.md` and document technical specifications in `docs/FRS.md` as implementation proceeds.**

## Google Maps API MCP Implementation Requirements

Based on the architecture defined in CLAUDE.md, the following implementation requirements are mandatory:

{{googlemapsMcpImplementationRequirements}}

### Project Structure Standards

1. **Mandatory Project Structure**
   ```
   googlemaps-mcp-service/
   ├── src/
   │   ├── index.ts                    # Main entry point
   │   ├── server/                     # MCP server implementation
   │   │   ├── index.ts               # MCP server setup
   │   │   ├── tools.ts               # Tool registration
   │   │   └── handlers.ts            # Request handlers
   │   ├── services/                   # Google Maps API services
   │   │   ├── index.ts
   │   │   ├── geocoding.ts           # Geocoding service
   │   │   ├── directions.ts          # Directions service
   │   │   ├── places.ts              # Places service
   │   │   ├── distance-matrix.ts     # Distance Matrix service
   │   │   └── static-maps.ts         # Static Maps service
   │   ├── tools/                      # MCP tool definitions
   │   │   ├── index.ts
   │   │   ├── geocoding-tools.ts     # Geocoding MCP tools
   │   │   ├── places-tools.ts        # Places MCP tools
   │   │   ├── directions-tools.ts    # Directions MCP tools
   │   │   └── analysis-tools.ts      # Analysis MCP tools
   │   ├── cache/                      # Caching layer
   │   │   ├── index.ts
   │   │   ├── redis-cache.ts         # Redis cache implementation
   │   │   ├── memory-cache.ts        # Memory cache fallback
   │   │   └── cache-strategies.ts    # Caching strategies
   │   ├── auth/                       # Authentication management
   │   │   ├── index.ts
   │   │   ├── api-keys.ts            # API key management
   │   │   ├── rate-limiter.ts        # Rate limiting
   │   │   └── validators.ts          # Input validation
   │   ├── utils/                      # Utilities and helpers
   │   │   ├── index.ts
   │   │   ├── logger.ts              # Structured logging
   │   │   ├── errors.ts              # Error handling
   │   │   ├── config.ts              # Configuration management
   │   │   └── helpers.ts             # Common utilities
   │   └── types/                      # TypeScript type definitions
   │       ├── index.ts
   │       ├── google-maps.ts         # Google Maps API types
   │       ├── mcp.ts                 # MCP specific types
   │       └── cache.ts               # Cache types
   ├── tests/                          # Test suites
   │   ├── unit/                      # Unit tests
   │   ├── integration/               # Integration tests
   │   └── e2e/                       # End-to-end tests
   ├── config/                         # Configuration files
   │   ├── development.json
   │   ├── production.json
   │   └── test.json
   ├── docs/                           # Documentation
   │   ├── api.md                     # API documentation
   │   ├── deployment.md              # Deployment guide
   │   └── examples/                  # Usage examples
   ├── scripts/                        # Build and deployment scripts
   │   ├── build.sh
   │   ├── test.sh
   │   └── deploy.sh
   ├── package.json
   ├── tsconfig.json
   ├── Dockerfile
   ├── docker-compose.yml
   └── README.md
   ```

2. **Core Dependencies Management**
   ```json
   {
     "dependencies": {
       "@modelcontextprotocol/sdk": "^0.5.0",
       "@googlemaps/google-maps-services-js": "^3.4.0",
       "zod": "^3.22.0",
       "redis": "^4.6.0",
       "winston": "^3.11.0",
       "dotenv": "^16.3.0",
       "express": "^4.18.0",
       "cors": "^2.8.5",
       "helmet": "^7.1.0",
       "rate-limiter-flexible": "^3.0.0"
     },
     "devDependencies": {
       "typescript": "^5.3.0",
       "@types/node": "^20.10.0",
       "jest": "^29.7.0",
       "@types/jest": "^29.5.0",
       "ts-jest": "^29.1.0",
       "nodemon": "^3.0.0",
       "eslint": "^8.56.0",
       "@typescript-eslint/eslint-plugin": "^6.15.0",
       "prettier": "^3.1.0"
     }
   }
   ```

### Google Maps API Integration Standards

{{googleMapsApiIntegrationStandards}}

1. **Core Google Maps Services Implementation**
   ```typescript
   // src/services/geocoding.ts
   import { Client, GeocodingRequest, GeocodingResponse } from '@googlemaps/google-maps-services-js';
   import { z } from 'zod';
   import { BaseService } from './base';
   import { CacheManager } from '../cache';
   import { Logger } from '../utils/logger';

   const GeocodeRequestSchema = z.object({
     address: z.string().min(1).max(500),
     region: z.string().optional(),
     bounds: z.object({
       northeast: z.object({ lat: z.number(), lng: z.number() }),
       southwest: z.object({ lat: z.number(), lng: z.number() })
     }).optional(),
     language: z.string().optional(),
     components: z.record(z.string()).optional()
   });

   const ReverseGeocodeRequestSchema = z.object({
     latitude: z.number().min(-90).max(90),
     longitude: z.number().min(-180).max(180),
     result_type: z.array(z.string()).optional(),
     location_type: z.array(z.string()).optional(),
     language: z.string().optional()
   });

   export class GeocodingService extends BaseService {
     constructor(
       client: Client,
       cache: CacheManager,
       logger: Logger
     ) {
       super(client, cache, logger, 'geocoding');
     }

     async geocode(params: z.infer<typeof GeocodeRequestSchema>): Promise<GeocodingResponse> {
       // Validate input parameters
       const validatedParams = GeocodeRequestSchema.parse(params);
       
       // Generate cache key
       const cacheKey = this.generateCacheKey('geocode', validatedParams);
       
       // Check cache first
       const cachedResult = await this.cache.get<GeocodingResponse>(cacheKey);
       if (cachedResult) {
         this.logger.debug('Geocoding cache hit', { cacheKey });
         return cachedResult;
       }

       try {
         // Make API request with retry logic
         const response = await this.retryRequest(async () => {
           return await this.client.geocode({
             params: {
               address: validatedParams.address,
               region: validatedParams.region,
               bounds: validatedParams.bounds,
               language: validatedParams.language,
               components: validatedParams.components,
               key: this.apiKey
             }
           });
         });

         // Cache successful response (24 hours for geocoding)
         await this.cache.set(cacheKey, response.data, 24 * 60 * 60);
         
         this.logger.info('Geocoding successful', {
           address: validatedParams.address,
           results: response.data.results.length
         });

         return response.data;
       } catch (error) {
         this.logger.error('Geocoding failed', {
           address: validatedParams.address,
           error: error.message
         });
         throw this.handleApiError(error);
       }
     }

     async reverseGeocode(params: z.infer<typeof ReverseGeocodeRequestSchema>): Promise<GeocodingResponse> {
       const validatedParams = ReverseGeocodeRequestSchema.parse(params);
       const cacheKey = this.generateCacheKey('reverse-geocode', validatedParams);
       
       const cachedResult = await this.cache.get<GeocodingResponse>(cacheKey);
       if (cachedResult) {
         return cachedResult;
       }

       try {
         const response = await this.retryRequest(async () => {
           return await this.client.reverseGeocode({
             params: {
               latlng: { lat: validatedParams.latitude, lng: validatedParams.longitude },
               result_type: validatedParams.result_type,
               location_type: validatedParams.location_type,
               language: validatedParams.language,
               key: this.apiKey
             }
           });
         });

         // Cache for 24 hours
         await this.cache.set(cacheKey, response.data, 24 * 60 * 60);
         
         return response.data;
       } catch (error) {
         this.logger.error('Reverse geocoding failed', {
           coordinates: `${validatedParams.latitude},${validatedParams.longitude}`,
           error: error.message
         });
         throw this.handleApiError(error);
       }
     }

     async batchGeocode(addresses: string[]): Promise<GeocodingResponse[]> {
       // Process addresses in batches to respect rate limits
       const batchSize = 10;
       const results: GeocodingResponse[] = [];
       
       for (let i = 0; i < addresses.length; i += batchSize) {
         const batch = addresses.slice(i, i + batchSize);
         const batchPromises = batch.map(address => this.geocode({ address }));
         
         try {
           const batchResults = await Promise.all(batchPromises);
           results.push(...batchResults);
           
           // Add delay between batches to respect rate limits
           if (i + batchSize < addresses.length) {
             await this.delay(100);
           }
         } catch (error) {
           this.logger.error('Batch geocoding failed', {
             batchStart: i,
             batchSize: batch.length,
             error: error.message
           });
           throw error;
         }
       }
       
       return results;
     }
   }
   ```

2. **Places Service Implementation**
   ```typescript
   // src/services/places.ts
   import { Client, PlacesNearbyRequest, FindPlaceFromTextRequest } from '@googlemaps/google-maps-services-js';
   import { z } from 'zod';
   import { BaseService } from './base';

   const PlacesSearchSchema = z.object({
     query: z.string().min(1).max(200),
     location: z.object({
       lat: z.number(),
       lng: z.number()
     }).optional(),
     radius: z.number().min(1).max(50000).optional(),
     type: z.string().optional(),
     minprice: z.number().min(0).max(4).optional(),
     maxprice: z.number().min(0).max(4).optional(),
     opennow: z.boolean().optional(),
     language: z.string().optional()
   });

   const NearbySearchSchema = z.object({
     location: z.object({
       lat: z.number().min(-90).max(90),
       lng: z.number().min(-180).max(180)
     }),
     radius: z.number().min(1).max(50000),
     type: z.string().optional(),
     keyword: z.string().optional(),
     minprice: z.number().min(0).max(4).optional(),
     maxprice: z.number().min(0).max(4).optional(),
     opennow: z.boolean().optional(),
     rankby: z.enum(['prominence', 'distance']).optional()
   });

   const PlaceDetailsSchema = z.object({
     place_id: z.string().min(1),
     fields: z.array(z.string()).optional(),
     language: z.string().optional(),
     region: z.string().optional()
   });

   export class PlacesService extends BaseService {
     constructor(client: Client, cache: CacheManager, logger: Logger) {
       super(client, cache, logger, 'places');
     }

     async searchPlaces(params: z.infer<typeof PlacesSearchSchema>) {
       const validatedParams = PlacesSearchSchema.parse(params);
       const cacheKey = this.generateCacheKey('search', validatedParams);
       
       const cachedResult = await this.cache.get(cacheKey);
       if (cachedResult) {
         return cachedResult;
       }

       try {
         const response = await this.retryRequest(async () => {
           return await this.client.findPlaceFromText({
             params: {
               input: validatedParams.query,
               inputtype: 'textquery',
               locationbias: validatedParams.location ? 
                 `circle:${validatedParams.radius || 5000}@${validatedParams.location.lat},${validatedParams.location.lng}` : 
                 undefined,
               fields: ['place_id', 'name', 'formatted_address', 'geometry', 'rating', 'price_level', 'opening_hours'],
               language: validatedParams.language,
               key: this.apiKey
             }
           });
         });

         // Cache for 12 hours (places data changes more frequently)
         await this.cache.set(cacheKey, response.data, 12 * 60 * 60);
         
         return response.data;
       } catch (error) {
         this.logger.error('Places search failed', {
           query: validatedParams.query,
           error: error.message
         });
         throw this.handleApiError(error);
       }
     }

     async nearbySearch(params: z.infer<typeof NearbySearchSchema>) {
       const validatedParams = NearbySearchSchema.parse(params);
       const cacheKey = this.generateCacheKey('nearby', validatedParams);
       
       const cachedResult = await this.cache.get(cacheKey);
       if (cachedResult) {
         return cachedResult;
       }

       try {
         const response = await this.retryRequest(async () => {
           return await this.client.placesNearby({
             params: {
               location: [validatedParams.location.lat, validatedParams.location.lng],
               radius: validatedParams.radius,
               type: validatedParams.type,
               keyword: validatedParams.keyword,
               minprice: validatedParams.minprice,
               maxprice: validatedParams.maxprice,
               opennow: validatedParams.opennow,
               rankby: validatedParams.rankby,
               key: this.apiKey
             }
           });
         });

         // Cache for 6 hours (nearby results change more frequently)
         await this.cache.set(cacheKey, response.data, 6 * 60 * 60);
         
         return response.data;
       } catch (error) {
         this.logger.error('Nearby search failed', {
           location: validatedParams.location,
           radius: validatedParams.radius,
           error: error.message
         });
         throw this.handleApiError(error);
       }
     }

     async getPlaceDetails(params: z.infer<typeof PlaceDetailsSchema>) {
       const validatedParams = PlaceDetailsSchema.parse(params);
       const cacheKey = this.generateCacheKey('details', validatedParams);
       
       const cachedResult = await this.cache.get(cacheKey);
       if (cachedResult) {
         return cachedResult;
       }

       try {
         const response = await this.retryRequest(async () => {
           return await this.client.placeDetails({
             params: {
               place_id: validatedParams.place_id,
               fields: validatedParams.fields || [
                 'place_id', 'name', 'formatted_address', 'formatted_phone_number',
                 'website', 'rating', 'user_ratings_total', 'price_level',
                 'opening_hours', 'photos', 'geometry', 'types', 'reviews'
               ],
               language: validatedParams.language,
               region: validatedParams.region,
               key: this.apiKey
             }
           });
         });

         // Cache for 24 hours (detailed place info is relatively stable)
         await this.cache.set(cacheKey, response.data, 24 * 60 * 60);
         
         return response.data;
       } catch (error) {
         this.logger.error('Place details failed', {
           place_id: validatedParams.place_id,
           error: error.message
         });
         throw this.handleApiError(error);
       }
     }

     async getPlacePhotos(place_id: string, maxPhotos: number = 5) {
       // First get place details to get photo references
       const placeDetails = await this.getPlaceDetails({ 
         place_id, 
         fields: ['photos'] 
       });

       if (!placeDetails.result?.photos?.length) {
         return [];
       }

       const photoPromises = placeDetails.result.photos
         .slice(0, maxPhotos)
         .map(async (photo) => {
           try {
             const response = await this.client.placePhoto({
               params: {
                 photoreference: photo.photo_reference,
                 maxwidth: 800,
                 key: this.apiKey
               },
               responseType: 'arraybuffer'
             });

             return {
               photo_reference: photo.photo_reference,
               width: photo.width,
               height: photo.height,
               data: Buffer.from(response.data).toString('base64'),
               attributions: photo.html_attributions
             };
           } catch (error) {
             this.logger.warn('Failed to fetch photo', {
               place_id,
               photo_reference: photo.photo_reference,
               error: error.message
             });
             return null;
           }
         });

       const photos = await Promise.all(photoPromises);
       return photos.filter(photo => photo !== null);
     }
   }
   ```

### MCP Tool Implementation Standards

{{mcpToolImplementationStandards}}

1. **Geocoding MCP Tools**
   ```typescript
   // src/tools/geocoding-tools.ts
   import { Tool } from '@modelcontextprotocol/sdk/types.js';
   import { z } from 'zod';
   import { GeocodingService } from '../services/geocoding';
   import { Logger } from '../utils/logger';

   export class GeocodingTools {
     constructor(
       private geocodingService: GeocodingService,
       private logger: Logger
     ) {}

     getGeocodeAddressTool(): Tool {
       return {
         name: 'geocode_address',
         description: 'Convert an address or place name to geographic coordinates (latitude/longitude)',
         inputSchema: {
           type: 'object',
           properties: {
             address: {
               type: 'string',
               description: 'The address or place name to geocode',
               minLength: 1,
               maxLength: 500
             },
             region: {
               type: 'string',
               description: 'Region code (e.g., "us", "uk") to bias results',
               optional: true
             },
             bounds: {
               type: 'object',
               description: 'Bounding box to bias results',
               properties: {
                 northeast: {
                   type: 'object',
                   properties: {
                     lat: { type: 'number' },
                     lng: { type: 'number' }
                   },
                   required: ['lat', 'lng']
                 },
                 southwest: {
                   type: 'object',
                   properties: {
                     lat: { type: 'number' },
                     lng: { type: 'number' }
                   },
                   required: ['lat', 'lng']
                 }
               },
               required: ['northeast', 'southwest'],
               optional: true
             }
           },
           required: ['address']
         }
       };
     }

     async handleGeocodeAddress(args: any) {
       try {
         this.logger.info('Geocoding address', { address: args.address });
         
         const result = await this.geocodingService.geocode({
           address: args.address,
           region: args.region,
           bounds: args.bounds
         });

         if (result.results.length === 0) {
           return {
             success: false,
             error: 'No results found for the given address',
             address: args.address
           };
         }

         const topResult = result.results[0];
         
         return {
           success: true,
           results: result.results.map(result => ({
             formatted_address: result.formatted_address,
             coordinates: {
               latitude: result.geometry.location.lat,
               longitude: result.geometry.location.lng
             },
             place_id: result.place_id,
             types: result.types,
             address_components: result.address_components.map(component => ({
               long_name: component.long_name,
               short_name: component.short_name,
               types: component.types
             })),
             geometry: {
               location_type: result.geometry.location_type,
               viewport: result.geometry.viewport,
               bounds: result.geometry.bounds
             },
             partial_match: result.partial_match
           })),
           primary_result: {
             formatted_address: topResult.formatted_address,
             coordinates: {
               latitude: topResult.geometry.location.lat,
               longitude: topResult.geometry.location.lng
             },
             place_id: topResult.place_id,
             confidence_score: this.calculateConfidenceScore(topResult)
           }
         };
       } catch (error) {
         this.logger.error('Geocoding tool error', {
           address: args.address,
           error: error.message
         });
         
         return {
           success: false,
           error: error.message || 'Geocoding failed',
           address: args.address
         };
       }
     }

     getReverseGeocodeTool(): Tool {
       return {
         name: 'reverse_geocode',
         description: 'Convert geographic coordinates to a human-readable address',
         inputSchema: {
           type: 'object',
           properties: {
             latitude: {
               type: 'number',
               description: 'Latitude coordinate',
               minimum: -90,
               maximum: 90
             },
             longitude: {
               type: 'number',
               description: 'Longitude coordinate',
               minimum: -180,
               maximum: 180
             },
             result_type: {
               type: 'array',
               description: 'Filter results by type (e.g., street_address, route)',
               items: { type: 'string' },
               optional: true
             },
             location_type: {
               type: 'array',
               description: 'Filter by location type (e.g., ROOFTOP, RANGE_INTERPOLATED)',
               items: { type: 'string' },
               optional: true
             }
           },
           required: ['latitude', 'longitude']
         }
       };
     }

     async handleReverseGeocode(args: any) {
       try {
         this.logger.info('Reverse geocoding coordinates', {
           coordinates: `${args.latitude},${args.longitude}`
         });

         const result = await this.geocodingService.reverseGeocode({
           latitude: args.latitude,
           longitude: args.longitude,
           result_type: args.result_type,
           location_type: args.location_type
         });

         if (result.results.length === 0) {
           return {
             success: false,
             error: 'No address found for the given coordinates',
             coordinates: { latitude: args.latitude, longitude: args.longitude }
           };
         }

         return {
           success: true,
           coordinates: { latitude: args.latitude, longitude: args.longitude },
           results: result.results.map(result => ({
             formatted_address: result.formatted_address,
             place_id: result.place_id,
             types: result.types,
             address_components: result.address_components,
             location_type: result.geometry.location_type,
             plus_code: result.plus_code
           })),
           primary_address: result.results[0].formatted_address,
           location_info: this.extractLocationInfo(result.results[0])
         };
       } catch (error) {
         this.logger.error('Reverse geocoding tool error', {
           coordinates: `${args.latitude},${args.longitude}`,
           error: error.message
         });

         return {
           success: false,
           error: error.message || 'Reverse geocoding failed',
           coordinates: { latitude: args.latitude, longitude: args.longitude }
         };
       }
     }

     getBatchGeocodeTool(): Tool {
       return {
         name: 'batch_geocode',
         description: 'Convert multiple addresses to coordinates in a single request',
         inputSchema: {
           type: 'object',
           properties: {
             addresses: {
               type: 'array',
               description: 'Array of addresses to geocode',
               items: { type: 'string' },
               minItems: 1,
               maxItems: 100
             }
           },
           required: ['addresses']
         }
       };
     }

     async handleBatchGeocode(args: any) {
       try {
         this.logger.info('Batch geocoding addresses', {
           count: args.addresses.length
         });

         const results = await this.geocodingService.batchGeocode(args.addresses);
         
         const processedResults = results.map((result, index) => ({
           input_address: args.addresses[index],
           success: result.results.length > 0,
           result: result.results.length > 0 ? {
             formatted_address: result.results[0].formatted_address,
             coordinates: {
               latitude: result.results[0].geometry.location.lat,
               longitude: result.results[0].geometry.location.lng
             },
             place_id: result.results[0].place_id,
             confidence_score: this.calculateConfidenceScore(result.results[0])
           } : null,
           error: result.results.length === 0 ? 'No results found' : null
         }));

         const successCount = processedResults.filter(r => r.success).length;
         
         return {
           success: true,
           total_addresses: args.addresses.length,
           successful_geocodes: successCount,
           failed_geocodes: args.addresses.length - successCount,
           results: processedResults,
           summary: {
             success_rate: (successCount / args.addresses.length) * 100,
             total_processed: args.addresses.length
           }
         };
       } catch (error) {
         this.logger.error('Batch geocoding tool error', {
           addressCount: args.addresses?.length,
           error: error.message
         });

         return {
           success: false,
           error: error.message || 'Batch geocoding failed',
           addresses_attempted: args.addresses?.length || 0
         };
       }
     }

     private calculateConfidenceScore(result: any): number {
       let score = 100;
       
       // Reduce score for partial matches
       if (result.partial_match) {
         score -= 20;
       }
       
       // Adjust based on location type
       switch (result.geometry.location_type) {
         case 'ROOFTOP':
           break; // No reduction
         case 'RANGE_INTERPOLATED':
           score -= 10;
           break;
         case 'GEOMETRIC_CENTER':
           score -= 20;
           break;
         case 'APPROXIMATE':
           score -= 30;
           break;
       }
       
       return Math.max(0, score);
     }

     private extractLocationInfo(result: any) {
       const components = result.address_components || [];
       
       return {
         street_number: this.findComponent(components, 'street_number'),
         street_name: this.findComponent(components, 'route'),
         neighborhood: this.findComponent(components, 'neighborhood'),
         city: this.findComponent(components, 'locality'),
         county: this.findComponent(components, 'administrative_area_level_2'),
         state: this.findComponent(components, 'administrative_area_level_1'),
         country: this.findComponent(components, 'country'),
         postal_code: this.findComponent(components, 'postal_code'),
         plus_code: result.plus_code?.global_code
       };
     }

     private findComponent(components: any[], type: string): string | null {
       const component = components.find(c => c.types.includes(type));
       return component?.long_name || null;
     }
   }
   ```

2. **Places MCP Tools**
   ```typescript
   // src/tools/places-tools.ts
   import { Tool } from '@modelcontextprotocol/sdk/types.js';
   import { PlacesService } from '../services/places';
   import { Logger } from '../utils/logger';

   export class PlacesTools {
     constructor(
       private placesService: PlacesService,
       private logger: Logger
     ) {}

     getFindPlacesTool(): Tool {
       return {
         name: 'find_places',
         description: 'Search for places by text query with optional location bias',
         inputSchema: {
           type: 'object',
           properties: {
             query: {
               type: 'string',
               description: 'Search query (e.g., "coffee shops", "restaurants near me")',
               minLength: 1,
               maxLength: 200
             },
             location: {
               type: 'object',
               description: 'Location to bias search results',
               properties: {
                 latitude: { type: 'number', minimum: -90, maximum: 90 },
                 longitude: { type: 'number', minimum: -180, maximum: 180 }
               },
               required: ['latitude', 'longitude'],
               optional: true
             },
             radius: {
               type: 'number',
               description: 'Search radius in meters (max 50,000)',
               minimum: 1,
               maximum: 50000,
               optional: true
             },
             type: {
               type: 'string',
               description: 'Place type to filter results (e.g., restaurant, gas_station)',
               optional: true
             },
             price_range: {
               type: 'object',
               description: 'Price range filter (0-4, where 0=free, 4=very expensive)',
               properties: {
                 min: { type: 'number', minimum: 0, maximum: 4 },
                 max: { type: 'number', minimum: 0, maximum: 4 }
               },
               optional: true
             },
             open_now: {
               type: 'boolean',
               description: 'Only return places that are currently open',
               optional: true
             }
           },
           required: ['query']
         }
       };
     }

     async handleFindPlaces(args: any) {
       try {
         this.logger.info('Finding places', { query: args.query });

         const result = await this.placesService.searchPlaces({
           query: args.query,
           location: args.location,
           radius: args.radius,
           type: args.type,
           minprice: args.price_range?.min,
           maxprice: args.price_range?.max,
           opennow: args.open_now
         });

         if (result.candidates.length === 0) {
           return {
             success: false,
             error: 'No places found matching your query',
             query: args.query
           };
         }

         return {
           success: true,
           query: args.query,
           results_count: result.candidates.length,
           places: result.candidates.map(place => ({
             place_id: place.place_id,
             name: place.name,
             formatted_address: place.formatted_address,
             coordinates: place.geometry ? {
               latitude: place.geometry.location.lat,
               longitude: place.geometry.location.lng
             } : null,
             rating: place.rating,
             user_ratings_total: place.user_ratings_total,
             price_level: place.price_level,
             types: place.types,
             opening_hours: place.opening_hours ? {
               open_now: place.opening_hours.open_now,
               periods: place.opening_hours.periods,
               weekday_text: place.opening_hours.weekday_text
             } : null,
             photos: place.photos?.slice(0, 3).map(photo => ({
               photo_reference: photo.photo_reference,
               width: photo.width,
               height: photo.height
             }))
           })),
           search_metadata: {
             location_bias: args.location,
             radius_meters: args.radius,
             type_filter: args.type,
             open_now_filter: args.open_now
           }
         };
       } catch (error) {
         this.logger.error('Find places tool error', {
           query: args.query,
           error: error.message
         });

         return {
           success: false,
           error: error.message || 'Place search failed',
           query: args.query
         };
       }
     }

     getSearchNearbyTool(): Tool {
       return {
         name: 'search_nearby',
         description: 'Find places near a specific location',
         inputSchema: {
           type: 'object',
           properties: {
             location: {
               type: 'object',
               description: 'Center point for nearby search',
               properties: {
                 latitude: { type: 'number', minimum: -90, maximum: 90 },
                 longitude: { type: 'number', minimum: -180, maximum: 180 }
               },
               required: ['latitude', 'longitude']
             },
             radius: {
               type: 'number',
               description: 'Search radius in meters (max 50,000)',
               minimum: 1,
               maximum: 50000
             },
             type: {
               type: 'string',
               description: 'Place type (e.g., restaurant, hospital, gas_station)',
               optional: true
             },
             keyword: {
               type: 'string',
               description: 'Keyword to match against place names and types',
               optional: true
             },
             rank_by: {
               type: 'string',
               enum: ['prominence', 'distance'],
               description: 'How to rank results (prominence or distance)',
               optional: true
             },
             min_rating: {
               type: 'number',
               description: 'Minimum rating (1.0-5.0)',
               minimum: 1.0,
               maximum: 5.0,
               optional: true
             }
           },
           required: ['location', 'radius']
         }
       };
     }

     async handleSearchNearby(args: any) {
       try {
         this.logger.info('Searching nearby places', {
           location: args.location,
           radius: args.radius,
           type: args.type
         });

         const result = await this.placesService.nearbySearch({
           location: args.location,
           radius: args.radius,
           type: args.type,
           keyword: args.keyword,
           rankby: args.rank_by
         });

         let filteredResults = result.results;

         // Apply rating filter if specified
         if (args.min_rating) {
           filteredResults = filteredResults.filter(place => 
             place.rating && place.rating >= args.min_rating
           );
         }

         return {
           success: true,
           center_location: args.location,
           radius_meters: args.radius,
           results_count: filteredResults.length,
           places: filteredResults.map(place => ({
             place_id: place.place_id,
             name: place.name,
             vicinity: place.vicinity,
             coordinates: {
               latitude: place.geometry.location.lat,
               longitude: place.geometry.location.lng
             },
             rating: place.rating,
             user_ratings_total: place.user_ratings_total,
             price_level: place.price_level,
             types: place.types,
             opening_hours: place.opening_hours,
             photos: place.photos?.slice(0, 2).map(photo => ({
               photo_reference: photo.photo_reference,
               width: photo.width,
               height: photo.height
             })),
             distance_meters: this.calculateDistance(
               args.location.latitude,
               args.location.longitude,
               place.geometry.location.lat,
               place.geometry.location.lng
             )
           })).sort((a, b) => {
             if (args.rank_by === 'distance') {
               return a.distance_meters - b.distance_meters;
             }
             // Default prominence sorting (by rating and popularity)
             return (b.rating || 0) - (a.rating || 0);
           }),
           search_metadata: {
             type_filter: args.type,
             keyword_filter: args.keyword,
             ranking_method: args.rank_by || 'prominence',
             min_rating_filter: args.min_rating
           }
         };
       } catch (error) {
         this.logger.error('Search nearby tool error', {
           location: args.location,
           error: error.message
         });

         return {
           success: false,
           error: error.message || 'Nearby search failed',
           location: args.location
         };
       }
     }

     getPlaceDetailsTool(): Tool {
       return {
         name: 'get_place_details',
         description: 'Get comprehensive details about a specific place',
         inputSchema: {
           type: 'object',
           properties: {
             place_id: {
               type: 'string',
               description: 'Google Place ID',
               minLength: 1
             },
             fields: {
               type: 'array',
               description: 'Specific fields to retrieve (optional, all fields returned if not specified)',
               items: { type: 'string' },
               optional: true
             },
             include_photos: {
               type: 'boolean',
               description: 'Whether to include place photos',
               optional: true,
               default: false
             },
             max_photos: {
               type: 'number',
               description: 'Maximum number of photos to retrieve',
               minimum: 1,
               maximum: 10,
               optional: true,
               default: 3
             }
           },
           required: ['place_id']
         }
       };
     }

     async handlePlaceDetails(args: any) {
       try {
         this.logger.info('Getting place details', { place_id: args.place_id });

         const result = await this.placesService.getPlaceDetails({
           place_id: args.place_id,
           fields: args.fields
         });

         if (!result.result) {
           return {
             success: false,
             error: 'Place not found',
             place_id: args.place_id
           };
         }

         const place = result.result;
         const response: any = {
           success: true,
           place_id: args.place_id,
           details: {
             name: place.name,
             formatted_address: place.formatted_address,
             international_phone_number: place.international_phone_number,
             formatted_phone_number: place.formatted_phone_number,
             website: place.website,
             url: place.url,
             coordinates: place.geometry ? {
               latitude: place.geometry.location.lat,
               longitude: place.geometry.location.lng
             } : null,
             rating: place.rating,
             user_ratings_total: place.user_ratings_total,
             price_level: place.price_level,
             types: place.types,
             vicinity: place.vicinity,
             business_status: place.business_status,
             opening_hours: place.opening_hours ? {
               open_now: place.opening_hours.open_now,
               periods: place.opening_hours.periods,
               weekday_text: place.opening_hours.weekday_text,
               special_days: place.opening_hours.special_days
             } : null,
             address_components: place.address_components,
             plus_code: place.plus_code,
             utc_offset: place.utc_offset
           }
         };

         // Add reviews if available
         if (place.reviews) {
           response.details.reviews = place.reviews.slice(0, 5).map(review => ({
             author_name: review.author_name,
             author_url: review.author_url,
             language: review.language,
             profile_photo_url: review.profile_photo_url,
             rating: review.rating,
             relative_time_description: review.relative_time_description,
             text: review.text,
             time: review.time
           }));
         }

         // Add photos if requested
         if (args.include_photos && place.photos) {
           try {
             const photos = await this.placesService.getPlacePhotos(
               args.place_id,
               args.max_photos || 3
             );
             response.details.photos = photos;
           } catch (photoError) {
             this.logger.warn('Failed to fetch place photos', {
               place_id: args.place_id,
               error: photoError.message
             });
             response.details.photo_error = 'Failed to retrieve photos';
           }
         }

         return response;
       } catch (error) {
         this.logger.error('Place details tool error', {
           place_id: args.place_id,
           error: error.message
         });

         return {
           success: false,
           error: error.message || 'Failed to get place details',
           place_id: args.place_id
         };
       }
     }

     private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
       const R = 6371000; // Earth's radius in meters
       const dLat = this.toRadians(lat2 - lat1);
       const dLng = this.toRadians(lng2 - lng1);
       const a = 
         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
         Math.sin(dLng / 2) * Math.sin(dLng / 2);
       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
       return R * c;
     }

     private toRadians(degrees: number): number {
       return degrees * (Math.PI / 180);
     }
   }
   ```

### Caching Implementation Standards

{{cachingImplementationStandards}}

1. **Redis Cache Manager**
   ```typescript
   // src/cache/redis-cache.ts
   import Redis from 'redis';
   import { Logger } from '../utils/logger';

   export interface CacheOptions {
     ttl?: number;
     prefix?: string;
   }

   export class RedisCacheManager {
     private client: Redis.RedisClientType;
     private isConnected = false;

     constructor(
       private redisUrl: string,
       private defaultTtl: number = 3600,
       private keyPrefix: string = 'gmaps:',
       private logger: Logger
     ) {
       this.client = Redis.createClient({
         url: redisUrl,
         retry_strategy: (times) => {
           const delay = Math.min(times * 50, 2000);
           return delay;
         }
       });

       this.setupEventHandlers();
     }

     async connect(): Promise<void> {
       try {
         await this.client.connect();
         this.isConnected = true;
         this.logger.info('Redis cache connected successfully');
       } catch (error) {
         this.logger.error('Failed to connect to Redis', { error: error.message });
         throw error;
       }
     }

     async disconnect(): Promise<void> {
       if (this.isConnected) {
         await this.client.disconnect();
         this.isConnected = false;
         this.logger.info('Redis cache disconnected');
       }
     }

     async get<T>(key: string): Promise<T | null> {
       if (!this.isConnected) {
         this.logger.warn('Cache not available, skipping get operation');
         return null;
       }

       try {
         const fullKey = this.keyPrefix + key;
         const value = await this.client.get(fullKey);
         
         if (value === null) {
           return null;
         }

         const parsed = JSON.parse(value);
         this.logger.debug('Cache hit', { key: fullKey });
         return parsed;
       } catch (error) {
         this.logger.error('Cache get error', { key, error: error.message });
         return null;
       }
     }

     async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
       if (!this.isConnected) {
         this.logger.warn('Cache not available, skipping set operation');
         return false;
       }

       try {
         const fullKey = this.keyPrefix + key;
         const serialized = JSON.stringify(value);
         const expiry = ttl || this.defaultTtl;

         await this.client.setEx(fullKey, expiry, serialized);
         this.logger.debug('Cache set', { key: fullKey, ttl: expiry });
         return true;
       } catch (error) {
         this.logger.error('Cache set error', { key, error: error.message });
         return false;
       }
     }

     async del(key: string): Promise<boolean> {
       if (!this.isConnected) {
         return false;
       }

       try {
         const fullKey = this.keyPrefix + key;
         const result = await this.client.del(fullKey);
         this.logger.debug('Cache delete', { key: fullKey, deleted: result > 0 });
         return result > 0;
       } catch (error) {
         this.logger.error('Cache delete error', { key, error: error.message });
         return false;
       }
     }

     async exists(key: string): Promise<boolean> {
       if (!this.isConnected) {
         return false;
       }

       try {
         const fullKey = this.keyPrefix + key;
         const result = await this.client.exists(fullKey);
         return result > 0;
       } catch (error) {
         this.logger.error('Cache exists error', { key, error: error.message });
         return false;
       }
     }

     async flushAll(): Promise<void> {
       if (!this.isConnected) {
         return;
       }

       try {
         await this.client.flushAll();
         this.logger.info('Cache flushed');
       } catch (error) {
         this.logger.error('Cache flush error', { error: error.message });
       }
     }

     async keys(pattern: string): Promise<string[]> {
       if (!this.isConnected) {
         return [];
       }

       try {
         const fullPattern = this.keyPrefix + pattern;
         const keys = await this.client.keys(fullPattern);
         return keys.map(key => key.replace(this.keyPrefix, ''));
       } catch (error) {
         this.logger.error('Cache keys error', { pattern, error: error.message });
         return [];
       }
     }

     generateKey(service: string, method: string, params: any): string {
       const paramString = JSON.stringify(params, Object.keys(params).sort());
       const hash = require('crypto')
         .createHash('md5')
         .update(paramString)
         .digest('hex');
       return `${service}:${method}:${hash}`;
     }

     private setupEventHandlers(): void {
       this.client.on('error', (error) => {
         this.logger.error('Redis error', { error: error.message });
         this.isConnected = false;
       });

       this.client.on('connect', () => {
         this.logger.info('Redis connecting');
       });

       this.client.on('ready', () => {
         this.logger.info('Redis ready');
         this.isConnected = true;
       });

       this.client.on('end', () => {
         this.logger.info('Redis connection ended');
         this.isConnected = false;
       });

       this.client.on('reconnecting', () => {
         this.logger.info('Redis reconnecting');
       });
     }
   }
   ```

### Error Handling and Logging

{{errorHandlingLogging}}

```typescript
// src/utils/errors.ts
export class GoogleMapsApiError extends Error {
  constructor(
    message: string,
    public status: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'GoogleMapsApiError';
  }
}

export class MCPToolError extends Error {
  constructor(
    message: string,
    public toolName: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'MCPToolError';
  }
}

export class CacheError extends Error {
  constructor(message: string, public operation: string) {
    super(message);
    this.name = 'CacheError';
  }
}

// src/utils/logger.ts
import winston from 'winston';

export class Logger {
  private logger: winston.Logger;

  constructor(service: string = 'googlemaps-mcp') {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      defaultMeta: { service },
      transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        })
      ]
    });
  }

  debug(message: string, meta?: any): void {
    this.logger.debug(message, meta);
  }

  info(message: string, meta?: any): void {
    this.logger.info(message, meta);
  }

  warn(message: string, meta?: any): void {
    this.logger.warn(message, meta);
  }

  error(message: string, meta?: any): void {
    this.logger.error(message, meta);
  }
}
```

## Agent Collaboration Requirements

All agents working on this Google Maps API MCP project must:

1. **Follow Google Maps API Best Practices**
   - Implement proper API key management and security
   - Use appropriate caching strategies for different data types
   - Handle rate limiting and quota management
   - Validate all inputs according to Google Maps API specifications

2. **Implement Comprehensive MCP Integration**
   - Use Zod schemas for all tool parameter validation
   - Provide detailed error messages and success responses
   - Implement proper tool descriptions for LLM understanding
   - Follow MCP protocol specifications exactly

3. **Ensure Production Readiness**
   - Implement comprehensive error handling and retry logic
   - Add structured logging for debugging and monitoring
   - Include performance optimization and caching
   - Provide complete TypeScript type safety

4. **Maintain Code Quality**
   - Use TypeScript with strict mode enabled
   - Implement comprehensive unit and integration tests
   - Follow consistent code formatting and linting rules
   - Document all APIs and configuration options

## Quality Gates

Before any code is merged:

1. All tests must pass (>90% coverage)
2. Google Maps API integration tested with actual API calls
3. MCP tools tested with Claude Desktop or compatible clients
4. Performance benchmarks meet specified requirements
5. Security review completed for API key handling
6. Documentation updated and examples working
7. Error handling tested for all failure scenarios

## Performance Requirements

1. **API Response Times**
   - Cached responses: <50ms
   - Geocoding API calls: <2s
   - Places API calls: <3s
   - Batch operations: <10s per 100 items

2. **Caching Efficiency**
   - Cache hit rate: >70% for geocoding
   - Cache hit rate: >50% for places
   - Memory usage: <500MB for cache
   - Cache cleanup: automatic TTL management

3. **Scalability**
   - Support 1000+ requests per hour
   - Handle concurrent requests efficiently
   - Graceful degradation when APIs are unavailable
   - Auto-scaling compatibility

---

**Remember**: This document is your contract for Google Maps API MCP development. Violating these guidelines may result in rejected contributions. Always refer to CLAUDE.md for architectural decisions and update FRS.md with implementation details.