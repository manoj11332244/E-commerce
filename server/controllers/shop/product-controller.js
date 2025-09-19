import { Product } from "../../models/Product.js";


//  filterProduct
export const getFilteredProducts = async (req, res) => {
    try {
        const { Category = [], Brand = [], sortBy = 'price-lowtohigh' } = req.query;
        let filters = {}
        if (Category.length) {
            filters.category = { $in: Category.split(",") }
        }
        if (Brand.length) {
            filters.brand = { $in: Brand.split(",") }
        }
        let sort = {}

        switch (sortBy) {
            case 'price-lowtohigh': sort.price = 1
                break;
            case 'price-hightolow': sort.price = -1
                break;
            case 'title-atoz': sort.title = 1
                break;
            case 'title-ztoa': sort.title = -1
                break;
            default: sort.price = 1;
                break;
        }

        // filters
        const products = await Product.find(filters).sort(sort)

        res.status(200).json({
                success: true,
                data: products
            })
    } catch (error) {
        res.status(500).json({
                success: false,
                message: "Some Problem Occured"
            })
    }
}