const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config()


const app = express();

// middleware
app.use(express.static(path.join(__dirname, 'static/')));
app.use(express.urlencoded({extended: true}))
app.use(cors());

// set view engine
app.set("view engine", "ejs");
app.set("gui", path.join(__dirname, "gui/"));

app.get('/', (req, res) => {
    const url = process.env.ANALYZE_URL
    res.render('index', {url})
})

app.listen(3000, () => {
    console.log("app started on port 3000")
});