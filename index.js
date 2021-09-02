const express = require("express");
//the express function creates an application we set that application to the value of app
const app = express();

/* The get function takes two arguments; the first is the path and the second is a
callback function. The callback function should have two arguments request(req) 
and response(res) */
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});
// * In express the on function does not operate as the listen function unlike
// the eventemitter module
app.listen(3000, () => console.log("listening on port 3000"));
