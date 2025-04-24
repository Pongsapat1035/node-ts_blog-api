## 📚 Project Overview

This repository contains a blog‑style REST API built with Node.js, TypeScript, Express, and PostgreSQL, fully containerised with Docker Compose.
It demonstrates a clean, production‑ready stack for authentication and CRUD‑style resources.




## 🏗️ Tech Stack

- Node js
- Typescript
- Postgres
- Docker


## 🗝️ Environment Variables (.env)

```bash
    DB_NAME=<database name>
    DB_USER_NAME=<postgres user>
    DB_PASSWORD=<postgres password>
    PORT=<express port>
    JWT_PRIVATE_KEY=<JWT private key>
```
    
## Authentication API Reference

#### Register new user

```http
  POST /auth/register
```
create new user and get JWT token

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.  |
| `password` | `string` | **Required**.  |
| `name` | `string` | **Required**. |

#### Login exist user

```http
  POST /auth/login
```
login exist user and get JWT token
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**.  |
| `password` | `string` | **Required**.  |

## Blogs API Reference

#### Get all blog posts

```http
  GET /blog/posts
```

#### Get a blog 

```http
  GET /blog/post/{id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | **Required**. blog id  |

#### Create new blog (**Auth required)

```http
  POST /blog/post
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | **Required**. blog title |
| `content` | `string` | **Required**.   blog content |
| `tags` | `array<string>` | **Required**.  blog tags |

#### Update exist blog (**Auth required)

```http
  PATCH /blog/post/{id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | **Required**. blog id |
| `title` | `string` | **Option**.   blog title |
| `content` | `string` | **Option**.   blog content |
| `tags` | `array<string>` | **Option**.  blog tags |

#### Delete blog (**Auth required)

```http
  DELETE /blog/post/{id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | **Required**. blog id |

