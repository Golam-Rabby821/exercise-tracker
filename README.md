# Exercise Tracker API 🏋️‍♂️

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.x-red.svg)](https://mongoosejs.com/)

A REST API for tracking exercises and users, built with Node.js, Express, and MongoDB. Designed to fulfill FreeCodeCamp's Backend Certification requirements. The freeCodeCamp boilerplate for the Exercise Tracker project and instructions for building this project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

## Features ✅

- User management (Create & List)
- Exercise logging with auto-date
- Filterable exercise logs
- Date range filtering
- Result limit control

## API Documentation 📚

### 1. Create User

**Endpoint**  
`POST /api/users`

**Request Body**

```json
{
  "username": "fcc_user"
}
```

**Response:**

```json
{
  "username": "fcc_user",
  "_id": "507f1f77bcf86cd799439011"
}
```

**List All Users:**
`GET /api/users`
**Response:**

```json
[
  {
    "username": "fcc_user",
    "_id": "507f1f77bcf86cd799439011"
  }
]
```

**Add Exercise:**
`POST /api/users/:\_id/exercises`
**Request Body**

```json
{
  "description": "pushups",
  "duration": 30,
  "date": "2023-08-15"
}
```

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "fcc_user",
  "description": "pushups",
  "duration": 30,
  "date": "Tue Aug 15 2023"
}
```

**Get Exercise Logs:**
`GET /api/users/:\_id/logs?from=2023-01-01&to=2023-12-31&limit=5`
**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "fcc_user",
  "count": 3,
  "log": [
    {
      "description": "pushups",
      "duration": 30,
      "date": "Tue Aug 15 2023"
    }
  ]
}
```

## Test Case Coverage ✔️

| Test # | Requirement                                | Status |
| ------ | ------------------------------------------ | ------ |
| 1      | Original project implementation            | ✅     |
| 2      | POST to /api/users creates user            | ✅     |
| 3      | User response includes username & \_id     | ✅     |
| 4      | GET /api/users returns all users           | ✅     |
| 5      | Users endpoint returns array               | ✅     |
| 6      | Array elements contain username & \_id     | ✅     |
| 7      | POST exercises with optional date          | ✅     |
| 8      | Exercise response includes user data       | ✅     |
| 9      | GET logs returns exercise history          | ✅     |
| 10     | Log response includes count                | ✅     |
| 11     | Log array in response                      | ✅     |
| 12     | Log items have description, duration, date | ✅     |
| 13     | Description is string                      | ✅     |
| 14     | Duration is number                         | ✅     |
| 15     | Date is string (toDateString)              | ✅     |
| 16     | Supports from/to/limit filters             | ✅     |

## Installation 🛠️

**Clone the repository:**

```bash
git clone https://github.com/yourusername/exercise-tracker.git
```

**Install dependencies:**

```bash
npm install
```

**Create .env file:**

```js
MONGODB_URI = your_mongodb_connection_string;
PORT = 3000;
```

**Start server:**

```bash
npm start
```

## Tech Stack 💻

- **Backend:** Node.js + Express
- **Database:** MongoDB (with Mongoose ODM)
- **Date Handling:** JavaScript Date API
- **Environment Management:** dotenv

## Testing 🔍

Test with:

1. Postman
2. cURL
3. FreeCodeCamp's automated test suite

**License 📄**
MIT License - see LICENSE for details
