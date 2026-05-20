require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Task = require('./models/Task');

const app = express();

/* MIDDLEWARE */

app.use(cors());
app.use(express.json());

/* DATABASE */

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* TEST ROUTE */

app.get('/', (req, res) => {
    res.send("Backend Running");
});

/* SERVER */

const PORT = process.env.PORT || 5000;

/* GET */

app.get('/api/tasks', async (req, res) => {

    try {

        const tasks = await Task.find();

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* POST */

app.post('/api/tasks', async (req, res) => {

    try {

        const newTask = await Task.create(req.body);

        res.status(201).json(newTask);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* DELETE */

app.delete('/api/tasks/:id', async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* PATCH */

app.patch('/api/tasks/:id', async (req, res) => {

    try {

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                status: "Done"
            },
            {
                new: true
            }
        );

        res.json(updatedTask);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.listen(PORT, () => {
    console.log(`Server Running at Port ${PORT}`);
});