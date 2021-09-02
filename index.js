const express = require("express");
//the express function creates an application we set that application to the value of app
const app = express();

app.use(express.json());

/* Created an array with random value to use a a test for pulling data based on the 
route params */
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

/* The get function takes two arguments; the first is the path and the second is a
callback function. The callback function should have two arguments request(req) 
and response(res) */
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

/*the (:id) section of the url is an implementation of a parameter. Depending on the value 
of the route parameter will determine which type of object gets sent back to us. Inside the function
There is an object course that equals a method. This method goes through the entire courses array and 
finds whichever course has an id that is equal to the requested id which we get from the route parameter.
I also threw the req.params.id into a parseInt method because the value of that object is a string where as 
the c.id is an integer. The parseInt method will convert the string given into an integer allowing both to be compared.
  */
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  //if course is falsy response status 404(not found) I also chained the .send method to send a note to the user.
  if (!course) return res.status(404).send("Course not Found");

  res.send(course);
});

//This is a proper way to assign a port to node applications. we can set the port in the
//terminal by running command: export PORT=5000
const port = process.env.PORT || 3000;

// * In express the on function does not operate as the listen function unlike
// the eventemitter module
//when deploying an operation to a hosting environment the port is dynamically
//assigned by the hosting environment
app.listen(port, () => console.log(`listening on port ${port}`));

//* Query string parameters are used to provide additional data to our backend
// services - optional data, this is signified by a ? followed by an argument
