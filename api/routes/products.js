const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// import Product model
const Product = require("../models/products");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json({
        message: "handling get requests to /products",
        products: docs,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
});
router.post("/", (req, res, next) => {
  const newProduct = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  newProduct
    .save()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  res.status(201).json({
    message: "handling post requests to /products",
    product: newProduct,
  });
});

router.get("/:id", (req, res, next) => {
  const p_id = req.params.id;
  Product.findById(p_id)
    .exec()
    .then((result) => {
      res.status(200).json({ result });
      console.log(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: `Updated the product ${id}`,
  });
});
router.delete("/:id", (req, res, next) => {
  const p_id = req.params.id;
  Product.deleteOne({ _id: p_id })
    .exec()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
