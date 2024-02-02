const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://node-rest-shop:${process.env.PASSWORD}@cluster0.bvs13wn.mongodb.net/?retryWrites=true&w=majority`
);
const ProductRoutes = require("./api/routes/products");
const OrderRoutes = require("./api/routes/orders");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Authorization, Accept, Content-Type"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, PATCH, GET, DELETE, POST");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", ProductRoutes);
app.use("/orders", OrderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message },
  });
});
module.exports = app;
