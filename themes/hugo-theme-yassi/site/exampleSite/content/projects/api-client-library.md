+++
title = "API Client Library"
date = 2024-01-12
summary = "A type-safe HTTP client library with automatic retry and caching"
featured = false
tags = ["api", "library", "typescript"]
categories = ["Libraries"]
+++

A modern HTTP client library that makes API integration simple and reliable. Built with TypeScript for full type safety.

## Features

- Automatic retries with exponential backoff
- Smart caching layer
- Request/response interceptors
- TypeScript generics for type-safe responses
- Middleware system
- Progress tracking for uploads/downloads
- Cancel token support

## Example

```typescript
import { ApiClient } from 'api-client-library';

const client = new ApiClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
});

// Type-safe request
const user = await client.get<User>('/users/123');
```

## Benefits

- Reduces boilerplate code
- Handles edge cases automatically
- Improves reliability with smart retries
- Better developer experience with TypeScript

Available on npm.
