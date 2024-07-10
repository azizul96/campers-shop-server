// src/controllers/productController.ts
import { Request, Response } from 'express';
import Product, { IProduct } from '../models/product';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      price,
      category,
      stock,
      description,
      ratings,
      images,
    }: IProduct = req.body;

    const newProduct = new Product({
      name,
      price,
      category,
      stock,
      description,
      ratings,
      images,
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      price,
      category,
      stock,
      description,
      ratings,
      images,
    }: IProduct = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    product.price = price;
    product.category = category;
    product.stock = stock;
    product.description = description;
    product.ratings = ratings;
    product.images = images;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
