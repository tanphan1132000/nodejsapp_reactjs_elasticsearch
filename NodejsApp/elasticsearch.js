// elasticsearch.js
import { Client } from '@elastic/elasticsearch';

const client = new Client(
    {
        node: 'http://elasticsearch:9200',
        healthcheck: false
    }
);

export default client;
