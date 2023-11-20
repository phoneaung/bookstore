import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Bookstore!')
});

// Route for save a new book
app.post('/books', async (request, response) => {
    try {
        // Validate input 
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }
        // Create new variable for new book
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for get all books from database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            "count": books.length, 
            "data": books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}); 

// Route for get one book from database by id
app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params 

        const books = await Book.findById(id);

        return response.status(200).json({
            "count": books.length, 
            "data": books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}); 

// Route for update a book
app.put('/books/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        } 

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!request) {
            return response.status(404).send({
                message: 'Book not found!',
            })
        }

        return response.status(200).send({
            message: 'Book updated successfully!',
        })

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database.');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

