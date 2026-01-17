# 📚 API Documentation

Bu doküman, Portfolio API'sinin tüm endpoint'lerini detaylı olarak açıklar.

## 🔐 Authentication

Bazı endpoint'ler kimlik doğrulaması gerektirir:

```http
Authorization: Bearer <API_KEY>
```

## 📖 Blog API

### List Blog Posts
```http
GET /api/blog
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Sayfa numarası (default: 1) |
| limit | number | Sayfa başına sonuç (default: 10) |
| category | string | Kategori filtresi |

**Response:**
```json
{
  "success": true,
  "posts": [
    {
      "_id": "string",
      "title": "string",
      "slug": { "current": "string" },
      "excerpt": "string",
      "publishedAt": "2024-01-01T00:00:00Z",
      "author": {
        "name": "string",
        "image": "string"
      },
      "categories": ["string"],
      "mainImage": "string"
    }
  ],
  "total": 100,
  "page": 1,
  "totalPages": 10
}
```

### Get Single Post
```http
GET /api/blog/[slug]
```

**Response:**
```json
{
  "success": true,
  "post": {
    "_id": "string",
    "title": "string",
    "slug": { "current": "string" },
    "body": [...], // Portable Text
    "publishedAt": "2024-01-01T00:00:00Z",
    "author": {...},
    "categories": [...],
    "mainImage": "string",
    "estimatedReadingTime": 5
  }
}
```

---

## 📁 Projects API

### List Projects
```http
GET /api/projects
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| featured | boolean | Öne çıkan projeler |
| technology | string | Teknoloji filtresi |

**Response:**
```json
{
  "success": true,
  "projects": [
    {
      "_id": "string",
      "title": "string",
      "slug": { "current": "string" },
      "description": "string",
      "technologies": ["Next.js", "TypeScript"],
      "image": "string",
      "liveUrl": "string",
      "githubUrl": "string",
      "featured": true
    }
  ]
}
```

---

## 📧 Contact API

### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string (required)",
  "surname": "string",
  "email": "string (required, valid email)",
  "subject": "string (required)",
  "message": "string (required)",
  "honeypot": "" // Anti-spam, leave empty
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Mesajınız başarıyla gönderildi."
}
```

**Error Responses:**
| Status | Description |
|--------|-------------|
| 400 | Validation error |
| 429 | Rate limit exceeded |
| 500 | Server error |

---

## 💬 Comments API

### Get Post Comments
```http
GET /api/comments?post=<slug>
```

**Response:**
```json
{
  "success": true,
  "comments": [
    {
      "_id": "string",
      "author": "string",
      "content": "string",
      "createdAt": "2024-01-01T00:00:00Z",
      "replies": [...]
    }
  ],
  "count": 5
}
```

### Submit Comment
```http
POST /api/comments
Content-Type: application/json
```

**Request Body:**
```json
{
  "postId": "string (required, Sanity document ID)",
  "author": "string (required, 2-100 chars)",
  "email": "string (required, valid email)",
  "content": "string (required, 3-2000 chars)",
  "parentCommentId": "string (optional, for replies)",
  "honeypot": "" // Anti-spam
}
```

**Response:**
```json
{
  "success": true,
  "message": "Yorumunuz gönderildi ve onay bekliyor."
}
```

### Moderate Comment
```http
PATCH /api/comments/moderate/[id]
Authorization: Bearer <MODERATION_API_KEY>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "approved | rejected | spam | pending",
  "moderatedBy": "string (optional)"
}
```

### Delete Comment
```http
DELETE /api/comments/moderate/[id]
Authorization: Bearer <MODERATION_API_KEY>
```

---

## 🔔 Push Notifications API

### Subscribe to Push
```http
POST /api/push/subscribe
Content-Type: application/json
```

**Request Body:**
```json
{
  "subscription": {
    "endpoint": "string",
    "keys": {
      "p256dh": "string",
      "auth": "string"
    }
  }
}
```

### Unsubscribe
```http
POST /api/push/unsubscribe
Content-Type: application/json
```

**Request Body:**
```json
{
  "endpoint": "string"
}
```

### Send Notification (Admin)
```http
POST /api/push/send
Authorization: Bearer <PUSH_API_KEY>
Content-Type: application/json
```

**Request Body:**
```json
{
  "subscription": {...},
  "payload": {
    "title": "string (required)",
    "body": "string",
    "icon": "string (default: /icon-192.png)",
    "url": "string (default: /)",
    "tag": "string"
  }
}
```

---

## 🔍 Search API

### Site Search
```http
GET /api/search?q=<query>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| q | string | Arama sorgusu (min 2 chars) |
| type | string | blog, project, all (default) |
| limit | number | Sonuç limiti (default: 10) |

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "type": "blog | project",
      "title": "string",
      "slug": "string",
      "excerpt": "string",
      "score": 0.95
    }
  ],
  "total": 5,
  "query": "string"
}
```

---

## ♻️ Revalidation API

### On-demand Revalidation
```http
POST /api/revalidate
Authorization: Bearer <REVALIDATION_TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "blog | project | page | all",
  "slug": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "revalidated": true,
  "message": "Cache successfully revalidated"
}
```

---

## 🏥 Health Check

### System Health
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "services": {
    "sanity": "connected",
    "database": "connected"
  },
  "version": "1.0.0"
}
```

---

## 📊 Analytics API (Admin)

### Dashboard Stats
```http
GET /api/analytics/dashboard
Authorization: Bearer <ADMIN_API_KEY>
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalPosts": 50,
    "totalProjects": 15,
    "totalMessages": 100,
    "unreadMessages": 5,
    "pendingComments": 3
  }
}
```

---

## ⚠️ Error Responses

All endpoints return consistent error format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE" // Optional
}
```

### Common Status Codes
| Status | Description |
|--------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---

## 🔒 Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| /api/contact | 5 requests | 5 minutes |
| /api/comments | 3 requests | 1 minute |
| /api/search | 30 requests | 1 minute |
| Other endpoints | 60 requests | 1 minute |

---

## 📝 Examples

### cURL

```bash
# Get blog posts
curl -X GET "https://your-domain.com/api/blog?page=1&limit=10"

# Submit contact form
curl -X POST "https://your-domain.com/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","subject":"Hello","message":"Hi there!"}'

# Moderate comment (admin)
curl -X PATCH "https://your-domain.com/api/comments/moderate/abc123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status":"approved"}'
```

### JavaScript

```javascript
// Fetch blog posts
const response = await fetch('/api/blog?page=1&limit=10');
const data = await response.json();

// Submit contact form
const result = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John',
    email: 'john@example.com',
    subject: 'Hello',
    message: 'Hi there!'
  })
});
```
