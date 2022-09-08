const path = require("path");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

// Database
const db = "mongodb+srv://usertechswarup:J41JgR9on6u8BRAd@cluster0.g6lll.mongodb.net/payroll?retryWrites=true&w=majority";

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
function(err) {
    if (err) {
        console.error(err)
    } else {
        console.log('Connect Live MongoDB')
    }
});
const postRoutes = require('./routes/app');

// De-structing User Input
app.use(express.json());

//This middleware will allow file to be read/GET when performed select Query
app.use("/images", express.static(path.join("images")));

app.use(postRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`App is running on port ${PORT}.`);
});