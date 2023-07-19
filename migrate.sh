#!/bin/bash
docker cp NodejsApp/data.json test_fcorp-elasticsearch-1:/tmp
docker exec test_fcorp-elasticsearch-1 curl -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/books/_bulk?pretty' --data-binary @/tmp/data.json