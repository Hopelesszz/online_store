import Product from "../modules/Product.js"
import { createError } from "../utils/error.js"

export const createProduct = async (req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const updateProduct = async (req,res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedProduct)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const deleteProduct = async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted.")
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const getProduct = async (req,res)=>{
    try{
        const { ids } = req.query; 
        const idArray = ids.split(","); 
        const products = await Product.find({ '_id': { $in: idArray } });
        res.status(200).json(products)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const getOneProduct = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const getAllProducts =  async (req,res,next)=>{
    try{
        const products = await Product.find()
        res.status(200).json(products)
    }
    catch(error) {
        next(error)
    }
}
export const searchByCategory =  async (req,res,next)=>{
    const category = req.query.category
    try{
        const products = await Product.find({ category: category});
        res.status(200).json(products);
    }
    catch(error) {
        next(error)
    }
}
export const searchByCategoryFeatured =  async (req,res,next)=>{
    const category = req.query.category
    try{
        const products = await Product.find({ category: category, featured: true });
        res.status(200).json(products);
    }
    catch(error) {
        next(error)
    }
}
export const searchByBrand =  async (req,res,next)=>{
    const brand = req.query.brand
    try{
        const products = await Product.find({ brand: brand });
        res.status(200).json(products)
    }
    catch(error) {
        next(error)
    }
}
export const searchByName =  async (req,res,next)=>{
    const name = req.query.name
    try{
        const products = await Product.find({ name: name });
        res.status(200).json(products)
    }
    catch(error) {
        next(error)
    }
}
export const searchCount = async (req,res,next)=>{
    const category = req.query.category
    try{
        const count = await Product.countDocuments({ category: category});
        res.status(200).json(count);
    }
    catch(error) {
        next(error)
    }
}
export const searchPrice = async (req,res,next)=>{
    const category = req.query.category
    const min = req.query.min
    const max = req.query.max
    const brand = req.query.brand ? req.query.brand.split(',') : null;
    try{
        const filter = {
            category: category,
            cost: { $gte: min || 0, $lte: max || 1000 }
        };
        if (brand) {
            filter.brand = Array.isArray(brand) ? { $in: brand } : { $in: [brand] };
        }
        const Price = await Product.find(filter);
        res.status(200).json(Price);
    }
    catch(error) {
        next(error)
    }
}