/* BECAUSE WE DEFINED THE PATH THAT WILL CALL THIS MODULE TO ACTION ( / ) 
WE DON'T NEED TO REPEAT THIS PATH IN OUR HTTP REQUEST ARGUMENTS INSTEAD WE CAN JUST 
WRITE / AND THEN ADD WHATEVER ADDITIONAL ROUTE PARAMTERS WE NEED FOR EXAMPLE /:ID */

const express = require("express");
/* In index.js we call the express() method and assign it to the object app 
however this method does not work once you seperate routes into seperate modules.
To solve this issue we need to use a router express has a method called router that
returns a router object */
const router = express.Router();
const Joi = require("joi");

/* Created an array with random value to use a a test for pulling data based on the 
route params */
let courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

/* Ran into a problem where Joi.validate() wasn't working that is because that function is now deprecated
  to validate a schema you create a schema that equals Joi.object({}) then validate it with schema.validate()*/
router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send("Course Not Found");

  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  return res.send(course);
});

/*the (:id) section of the url is an implementation of a parameter. Depending on the value 
  of the route parameter will determine which type of object gets sent back to us. Inside the function
  There is an object course that equals a method. This method goes through the entire courses array and 
  finds whichever course has an id that is equal to the requested id which we get from the route parameter.
  I also threw the req.params.id into a parseInt method because the value of that object is a string where as 
  the c.id is an integer. The parseInt method will convert the string given into an integer allowing both to be compared.
    */
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  //if course is falsy response status 404(not found) I also chained the .send method to send a note to the user.
  if (!course) return res.status(404).send("Course not Found");

  res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send("Course has already been deleted");

  const filteredCourses = courses.filter(
    (c) => c.id !== parseInt(req.params.id)
  );

  courses = filteredCourses;

  res.send(filteredCourses);
});

//Creating a function to automate the validation of schema to avoid duplicating code

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
  });

  return schema.validate(course);
}

module.exports = router;
