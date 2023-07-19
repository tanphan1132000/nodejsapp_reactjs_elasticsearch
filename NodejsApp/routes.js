import client from "./elasticsearch.js";

// Get all books
async function getAllBooks(request, reply) {
    try {
        const { body } = await client.search({
            index: 'books',
            body: {
                query: {
                    match_all: {}
                }
            }
        });

        const books = body.hits.hits.map(hit => hit._source);
        reply.send(books);
    } catch (error) {
        reply.status(500).send({ error: 'An error occurred while retrieving the books.' });
    }
}

// Get book with id
async function getBookById(request, reply) {
    const { id } = request.params;

    try {
        const { body } = await client.get({
            index: 'books',
            id
        });
        console.log("Body: ", body);
        if (!body.found) {
            reply.status(404).send({ error: 'Book not found.' });
            return;
        }

        const book = body._source;
        reply.send(book);
    } catch (error) {
        reply.status(500).send({ error: 'An error occurred while retrieving the book.' });
    }
}

// Post a book (add new book)
async function createBook(request, reply) {
    const { id, title, author, publishedDate, description, price } = request.body;

    const book = {
        id,
        title,
        author,
        publishedDate,
        description,
        price
    };

    try {
        await client.index({
            index: 'books',
            id: book.id,
            body: book
        });
        reply.send({ message: 'Book created successfully.' });
    } catch (error) {
        reply.status(500).send({ error: 'An error occurred while creating the book.' });
    }
}

// Put a book (update a book)
async function updateBook(request, reply) {
    const { id } = request.params;

    const { title, author, publishedDate, description, price } = request.body;

    try {
        const { body } = await client.update({
            index: 'books',
            id,
            body: {
                doc: {
                    title,
                    author,
                    publishedDate,
                    description,
                    price
                }
            }
        });

        reply.send({ message: 'Book updated successfully.' });

    } catch (error) {
        reply.status(500).send({ error: 'An error occurred while updating the book.' });
    }
}

export {
    getAllBooks,
    getBookById,
    createBook,
    updateBook
};
