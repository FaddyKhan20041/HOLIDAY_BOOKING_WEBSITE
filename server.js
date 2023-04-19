/*****************************
 * WEB322 - 2231 Project
 * I declare that this assignment is my own work in accordance with the Seneca Academic
 * Policy. No part of this assignment has been copied manually or electronically from
 * any other source (including web sites) or distributed to other students.
 *
 * Student Name  : Fardeen Hamed Raheem Khan
 * Student ID    : 166812214
 * Course/Section: WEB322 ZBB
 * Cyclic link - https://nice-blue-elk-gown.cyclic.app
 *
 ******************************/

const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const rentalsList = require("./models/rentals-db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
dotenv.config();

const app = express();

// Set up HandleBars
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", ".hbs");

// Make the "assets" folder public.
app.use(express.static(path.join(__dirname, "/assets")));
app.use(bodyParser.urlencoded({ extended: true }));
// setup a 'route' to listen on the default url path (http://localhost)

let loggedInUser = {};
app.get("/", function (req, res) {
  res.render("home");
});
app.get("/rentals", function (req, res) {
  res.render("rentals", {
    featuredRentals: rentalsList.getFeaturedRentals(),
    rentals: rentalsList.getRentalsByCityAndProvince(),
  });
});
app.get("/sign-up", function (req, res) {
  res.render("sign-up");
});

app.get("/log-in", function (req, res) {
  res.render("log-in");
});
app.get("/welcome", function (req, res) {
  res.render("welcome", loggedInUser);
});

app.post("/sign-up", function (req, res) {
  let msgData = {};
  let fname = req.body.fname;
  let lname = req.body.lname;
  let email = req.body.email;
  let password = req.body.password;
  let onlySpaces = /^\s+$/;
  let emailValid = /^[0-9a-zA-Z_]+@[a-zA-Z_]+\.[a-zA-Z]+$/;
  let passValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*.!@$%^&(){}:<>.?~#]).{8,12}$/;
  if (fname == "" || fname == null || onlySpaces.test(fname)) {
    msgData.fnameMsg = "Please enter a valid first name";
  }
  if (lname == "" || lname == null || onlySpaces.test(lname)) {
    msgData.lnameMsg = "Please enter a valid last name";
  }
  if (
    email == "" ||
    email == null ||
    onlySpaces.test(email || !emailValid.test(email))
  ) {
    msgData.emailMsg = "Please enter a valid email address";
  }
  if (
    password == "" ||
    password == null ||
    onlySpaces.test(password) ||
    !passValid.test(password)
  ) {
    msgData.passwordMsg =
      "Please enter a valid password with atleast 8 and maximum 12 characters, atleast one uppercase, one lowercase, one number and one special character";
  }
  if (
    msgData.fnameMsg ||
    msgData.lnameMsg ||
    msgData.emailMsg ||
    msgData.passwordMsg
  ) {
    msgData.fname = fname;
    msgData.lname = lname;
    msgData.email = email;
    msgData.password = password;
    res.render("sign-up", msgData);
  } else {
    //check for email in spam and promotions folder,it would be in one of them
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "fardeenwebassignment@gmail.com",
      subject: "Welcome to Cozy Corner",
      text: `Hi Welcome to Cozy Corner ${fname}, We are glad to have you with us.`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

    loggedInUser.email = email;
    res.redirect("/welcome");
  }
});

app.post("/login", function (req, res) {
  let msgData = {};
  let email = req.body.email;
  let password = req.body.password;
  let onlySpaces = /^\s+$/;

  if (email == "" || email == null || onlySpaces.test(email)) {
    msgData.emailMsg = "Please enter a valid email address";
  }
  if (password == "" || password == null || onlySpaces.test(password)) {
    msgData.passwordMsg = "Please enter your password";
  }
  if (msgData.emailMsg || msgData.passwordMsg) {
    msgData.email = email;
    msgData.password = password;
    res.render("log-in", msgData);
  } else {
    loggedInUser.email = email;
    res.redirect("/welcome");
  }
});
// * DO NOT MODIFY THE LINES BELOW *

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);
