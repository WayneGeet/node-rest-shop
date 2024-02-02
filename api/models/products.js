const mongoose = require("mongoose");
// schemas and models
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
});

module.exports = mongoose.model("Product", productSchema);
