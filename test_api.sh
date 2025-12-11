#!/bin/bash

BASE_URL="http://localhost:3000"
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

make_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    
    if [ "$method" = "GET" ]; then
        curl -s -X GET "${BASE_URL}${endpoint}"
    elif [ "$method" = "POST" ]; then
        curl -s -X POST -H "Content-Type: application/json" -d "$data" "${BASE_URL}${endpoint}"
    elif [ "$method" = "PATCH" ]; then
        curl -s -X PATCH -H "Content-Type: application/json" -d "$data" "${BASE_URL}${endpoint}"
    fi
}

print_result() {
    if [ "$2" = "pass" ]; then
        echo -e "${GREEN}✓ $1${NC}"
    else
        echo -e "${RED}✗ $1${NC}"
        echo "Response: $response"
        exit 1
    fi
}

echo "Making sure the server is ready..."
sleep 2

response=$(make_request "GET" "/health")
[[ $response == *"status"* ]] \
    && print_result "Health check looks good" "pass" \
    || { print_result "Health check failed" "fail"; exit 1; }

echo -e "\nCreating a test job..."
job_data='{"productImageUrl":"https://example.com/shoe.png","template":"zoom_in"}'
response=$(make_request "POST" "/jobs" "$job_data")
job_id=$(echo $response | jq -r '.data.id' 2>/dev/null)

if [ -z "$job_id" ] || [ "$job_id" = "null" ]; then
    print_result "Failed to create job" "fail"
    exit 1
fi
print_result "Created job: $job_id" "pass"

response=$(make_request "GET" "/jobs/$job_id")
retrieved_id=$(echo $response | jq -r '.data.id' 2>/dev/null)
[ "$retrieved_id" = "$job_id" ] \
    && print_result "Successfully retrieved job" "pass" \
    || { print_result "Failed to get job by ID" "fail"; exit 1; }

response=$(make_request "GET" "/jobs")
job_count=$(echo $response | jq -r '.data | length' 2>/dev/null)
[ -n "$job_count" ] && [ "$job_count" -gt 0 ] \
    && print_result "Found $job_count jobs" "pass" \
    || { print_result "Failed to list jobs" "fail"; exit 1; }

update_data='{"status":"processing"}'
response=$(make_request "PATCH" "/jobs/$job_id/status" "$update_data")
status=$(echo $response | jq -r '.data.status' 2>/dev/null)
[ "$status" = "processing" ] \
    && print_result "Updated job status to processing" "pass" \
    || { print_result "Failed to update job status" "fail"; exit 1; }

echo -e "\n${GREEN}All tests passed! 🎉${NC}"
echo "Try it yourself: curl http://localhost:3000/jobs"
