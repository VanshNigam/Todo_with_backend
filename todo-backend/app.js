// Core Module
const path = require('path');

// External Module
const express = require('express');
const { default: mongoose } = require('mongoose');
const DB_PATH = "mongodb+srv://love:love@todo.juh47uw.mongodb.net/?retryWrites=true&w=majority&appName=Todo";

const app = express();
const errorsController=require('./controllers/errors')

const  todoItemsRouter= require("./routes/todoItemsRouter");
const cors = require('cors');


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({origin:"https://todo-with-backend-six.vercel.app"}))

app.use("/api/todo",todoItemsRouter)
app.use(errorsController.pageNotFound);

const PORT = 3001;

mongoose.connect(DB_PATH)
  .then(() => {
    console.log('✅ Connected to Mongo');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });

