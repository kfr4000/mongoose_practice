const express = require('express');
const app = express()
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://kfr4000:wkdaudgns1%40@cluster0.ldcto.mongodb.net/Cluster0?retryWrites=true&w=majority", {
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("Connected..."))
.catch(err => console.log(err))



app.get('/', (req, res) => res.send("Hello World 안녕하세요"));

app.listen(port, () => console.log(`Example of Port ${port}!`));
