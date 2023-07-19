import Fastify from 'fastify';
import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook
} from './routes.js';

const app = Fastify({
    logger: true
})


const postBodySchema = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 1 },
        title: { type: 'string', minLength: 1 },
        author: { type: 'string', minLength: 1 },
        publishedDate: { type: 'string', minLength: 1 },
        description: { type: 'string', minLength: 1 },
        price: { type: 'number', minLength: 1, minimum: 0 }
    },
    required: ['id', 'title', 'author', 'publishedDate', 'description', 'price']
};

const putBodySchema = {
    type: 'object',
    properties: {
        title: { type: 'string', minLength: 1 },
        author: { type: 'string', minLength: 1 },
        publishedDate: { type: 'string', minLength: 1 },
        description: { type: 'string', minLength: 1 },
        price: { type: 'number', minLength: 1, minimum: 0 }
    },
};

// Register the routes
app.get('/books', getAllBooks);
app.get('/books/:id', getBookById);
app.post('/books', { schema: {body: postBodySchema} }, createBook);
app.put('/books/:id', { schema: {body: putBodySchema} } , updateBook);

// Start the server
app.listen({ host: '0.0.0.0', port: 3000 }, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
    console.log('Server is listening on port 3000');
});
