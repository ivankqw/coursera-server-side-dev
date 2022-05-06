const express = require("express"),
  http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const hostname = "localhost";
const port = 3000;

const app = express();

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

//dishes endpoint, callback with req, res, next
app.all("/dishes", (req, res, next) => {
  //when a request comes in, status code set to 200 and set header
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  //continue on to look for specification that matches the dishes endpoint
  //will work for GET, PUT etc
  next();
});

//modification to res carried into get
app.get("/dishes", (req, res, next) => {
  res.end("Will send all the dishes to you!");
});

app.post("/dishes", (req, res, next) => {
  res.end(
    "Will add the dish: " +
      req.body.name +
      " with details: " +
      req.body.description
  );
});

app.put("/dishes", (req, res, next) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /dishes");
});

//will see how we can add authentication later
app.delete("/dishes", (req, res, next) => {
  res.end("Deleting all dishes");
});

//more specific
app.get("/dishes/:dishId", (req, res, next) => {
  res.end("Will send details of the dish: " + req.params.dishId + " to you!");
});

app.post("/dishes/:dishId", (req, res, next) => {
  res.statusCode = 403;
  res.end("POST operation not supported on /dishes/" + req.params.dishId);
});

app.put("/dishes/:dishId", (req, res, next) => {
  res.write("Updating the dish: " + req.params.dishId + "\n");
  res.end(
    "Will update the dish: " +
      req.body.name +
      " with details: " +
      req.body.description
  );
});

app.delete("/dishes/:dishId", (req, res, next) => {
  res.end("Deleting dish: " + req.params.dishId);
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
