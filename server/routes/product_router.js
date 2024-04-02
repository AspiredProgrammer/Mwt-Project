const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

let Product = require("../models/product");
let User = require("../models/user");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Unauthorized");

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = decoded;
    next();
  });
}

function verifyCredential(req, res, next){
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Unauthorized");

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");
    console.log(decoded)
    next();
  });
}

router.route("/add").post(verifyToken, async (req, res) => {
  await check("title", "Title is required").notEmpty().run(req);
  await check("price", "Price is required").notEmpty().run(req);
  await check("description", "Description is required").notEmpty().run(req);
  await check("category", "Category is required").notEmpty().run(req);
  await check("rating", "Rating is required").notEmpty().run(req);
  await check("quantity", "Quantity is required").notEmpty().run(req);
  await check("image", "Image is required").notEmpty().run(req);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let product = new Product();
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.category = req.body.category;
    product.rating = req.body.rating;
    product.quantity = req.body.quantity;
    product.image = req.body.image;
    try {
      await product.save();
      res.json({ message: "Successfully Added" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ errors: errors.array() });
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      res.json({
        product: product,
      });
    } catch (err) {
      res.status(500).json({ error: "An error occurred" });
    }
  })
  .delete(verifyToken, async (req, res) => {
    try {
      const query = { _id: req.params.id };
      const result = await Book.deleteOne(query);
      if (result.deletedCount > 0) {
        res.json({ message: "Successfully Deleted" });
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (err) {
      console.error("Error deleting book by id:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

router
  .route("/edit/:id")
  .get(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json({ product: product, genres: base_genres });
    } catch (err) {
      console.error("Error fetching book by id:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  .post(verifyToken, async (req, res) => {
    let product = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      rating: req.body.rating,
      quantity: req.body.quantity,
      image: req.body.image
    };
    const query = { _id: req.params.id };
    try {
      await Product.updateOne(query, product);
      res.json({ message: "Successfully Updated" });
    } catch (err) {
      console.error("Error updating book by id:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
module.exports = router;
