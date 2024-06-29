const Product = require('../models/product');
const Category = require('../models/category')
const fs = require('fs');

const getProducts = async (req, res) => {
  try {   
    const data = await Product.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};

const getProductById = async (req, res) => {
  try {
    const data = await Product.findOne({ _id: req.params.id }).populate('category')
    res.status(200).json({ data, message: 'product found successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
}

const addProduct = async (req, res) => {
  try {
    console.log(req.files);
    const { name, subheading, category, brand, price, stock, discount, sale_rate, description } = req?.body
    if (req.files.length != 0) {
      const product = new Product({
        name, subheading, category, brand, price, stock, discount, sale_rate, description,
        image: req.files.map((x) => x.filename)
      });
      console.log(product);
      await product.save();
      if (product) {
        await Category.updateOne({ _id: category }, { $push: { products: product._id } })
        res.status(200).json({ message: "Product added successfully !" });

      } else {
        res.status(400).json({ message: "Something went wrong !" });
      }
    } else {
      res.status(400).json({ message: "failed only jpg ,jpeg, webp & png file supported !" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { _id, name, subheading, brand, price, stock, discount, sale_rate, description, image,isAvailable } = req?.body
    console.log('isAvailable',isAvailable);
    const images = JSON.parse(image) ?? []
    if (req?.files?.length != 0) {
      req?.files?.map((x) => images.push(x.filename))
    }
    await Product.updateOne({ _id }, {
      $set: { name, subheading, brand, price, stock, discount, sale_rate, description,isAvailable, image: images }
    })
    res.status(200).json({ message: "Product updated successfully !" });
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await Product.findByIdAndDelete(id);  
    if (!data) {
      return res.status(404).json({ message: 'Product not found' });
    }
    fs.unlink(`public/uploads/${data?.image}`, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
        return;
      }
      console.log('Image deleted successfully.');
    });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}
module.exports = {
  getProducts,
  getProductById,
  updateProduct,
  addProduct,
  deleteProduct,
}