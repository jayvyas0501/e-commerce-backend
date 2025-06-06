
import productModel from "../model/product.model.js"
import { wrapAsync } from "../utils/wrapAsync.js"

export const getAllProducts = wrapAsync(async (req,res) =>{
    const {
        search = "",
        category,
        minPrice = 0,
        maxPrice = Number.MAX_SAFE_INTEGER,
        sortBy = 'createdAt',
        order = "desc",
        inStock,
        minRating,
        page = 1,
        limit = 10
    } = req.query

    const regex = new RegExp(search, "i")

    const filter = {
        $or:[{ title:regex }, { description: regex }],
        price:{ $gte:minPrice, $lte :maxPrice},
        rating:{ $gte:minRating },
        inStock:inStock,
        ...(category && { category }),
        ...(minRating && { rating: { $gte: Number(minRating) } }),
        ...(inStock !== undefined && { inStock: inStock === 'true' }), 
    }
    
    const skip = (page-1) * Number(limit)

    const products = await productModel.find(filter).sort({[sortBy]:order === 'asc' ? 1 : -1}).skip(skip).limit(Number(limit))

    const total = await productModel.countDocuments(filter)

    res.status(200).json({
        success:true,
        total,
        currentPage: Number(page),
        totalPages: Math.ceil(total/limit),
        products
    })
})

export const getProductById = wrapAsync(async (req,res) =>{
    const {id} = req.params
    const product = await productModel.findById(id)
    res.status(200).json({sucess:true,data:product})
})

export const searchProducts = (req,res) =>{

}

export const getCategories = (req,res) =>{

}