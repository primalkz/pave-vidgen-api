# Video Generation Job Service

A simple backend service for managing video generation jobs. This service allows users to create, view, and track the status of video generation jobs.

## Features

- Create a new video generation job with a product image and template
- View job details by ID
- List all jobs with sorting (newest first)
- Update job status (pending → processing → completed/failed)
- Input validation
- Error handling
- In-memory storage (no database required)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Create a Job
```http
POST /jobs
Content-Type: application/json

{
  "productImageUrl": "https://example.com/shoe.png",
  "template": "zoom_in"
}
```

**Valid Templates:** `zoom_in`, `fade`, `slide`

### Get Job by ID
```http
GET /jobs/:id
```

### List All Jobs
```http
GET /jobs
```

### Update Job Status
```http
PATCH /jobs/:id/status
Content-Type: application/json

{
  "status": "processing"
}
```
**Valid Statuses:** `pending`, `processing`, `completed`, `failed`

## Testing

### Automated Tests
Run the test script to verify all endpoints:

1. Make the script executable:
   ```bash
   chmod +x test_api.sh
   ```

2. Run the tests:
   ```bash
   ./test_api.sh
   ```

### Manual Testing with cURL

1. Create a job:
   ```bash
   curl -X POST http://localhost:3000/jobs \
     -H "Content-Type: application/json" \
     -d '{"productImageUrl":"https://example.com/shoe.png","template":"zoom_in"}'
   ```

2. Get job by ID:
   ```bash
   curl http://localhost:3000/jobs/<job_id>
   ```

3. List all jobs:
   ```bash
   curl http://localhost:3000/jobs
   ```

4. Update job status:
   ```bash
   curl -X PATCH http://localhost:3000/jobs/<job_id>/status \
     -H "Content-Type: application/json" \
     -d '{"status":"processing"}'
   ```

## Project Structure

```
src/
  controllers/    # Request handlers
  middleware/    # Express middleware
  routes/        # API routes
  services/      # Business logic
  index.js       # Application entry point
```