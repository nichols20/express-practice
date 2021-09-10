const express = require("express");
const router = express.Router();

//To return the html markup to the client you'd use res.render then assign the file name as the first argument
//followed by creating an object and attributing values to any parameters defined in the markup as the second argument
router.get("/", (req, res) => {
  res.render("index", { title: "My express app", message: "Hello" });
});

module.exports = router;
