//the express function creates an application we set that application to the value of app
const express = require("express");
const app = express();
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const morgan = require("morgan");
const helmet = require("helmet");
const courses = require("./routes/courses");
const home = require("./routes/home");
//once we've exported and imported the courses module that handles courses http requests
//we call app.use and this time this method will take two arguments the first is the path
//and the second is the object containing the methods to handle this path. This method
//essentially tells the app that for any api that starts with /api/courses use this router
//to handle http requests
app.use("/api/courses", courses);
app.use("/", home);
app.use(helmet());
app.use(express.json());

//to return html markup to the client you would need to use a view engine. for this example I used pug
//I called the set method and set the view engine to the template engine module we installed pug
//this is essentially the replacement for the require method
app.set("view engine", "pug");

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled");
}

dbDebugger("connected to the databse");

//NODE_ENV represents the current environment stage of the application development or production.
//This variable is undefined unless eplicitly set in the terminal using export
//console.log(process.env.NODE_ENV);
//When NODE_ENV is undefined using the app.get('env') method will always return development, however if it
//is defined it will return whatever stage the object was set to
//this environment variable allows us to activate or deactivate certain modules /npm depending on the current stage of the code
//console.log(app.get("env"));

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
