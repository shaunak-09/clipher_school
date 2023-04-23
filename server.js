const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;
const routes =require("./routes.js")
const cors=require("cors")


app.use(bodyParser.json());
app.use(cors({
    origin:'*'
}))

// Connect to MongoDB database
mongoose.connect('mongodb+srv://shaunak:honda1805@cluster0.lz46p9j.mongodb.net/clipher?retryWrites=true&w=majority', 
{ useNewUrlParser: true, 
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));



app.use("/api",routes)


app.listen(port, () => console.log(`Server running on port ${port}`));
