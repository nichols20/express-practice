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

//This is a proper way to assign a port to node applications. we can set the port in the
//terminal by running command: export PORT=5000
const port = process.env.PORT || 3000;

// * In express the on function does not operate as the listen function unlike
// the eventemitter module
//when deploying an operation to a hosting environment the port is dynamically
//assigned by the hosting environment
app.listen(port, () => console.log(`listening on port ${port}`));
