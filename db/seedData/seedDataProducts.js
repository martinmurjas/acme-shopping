const { Product } = require("../");

const PRODUCTS = async ({categories, genres}) => {
    const products = []
    for (let category of categories) {
        for (let genre of genres) {
            products.push(await seedProduct({ genre, category }));
        }
    }
    return products;
}

const PRODUCTS_MAP = async ({categories, genres}) => {
    const products = await categories.map(async category => await genres.map(async genre => await seedProduct({genre, category})));
    return products.flatten();
}

const seedProduct = async ({category, genre}) => {
    const name = getProductName({category, genre});
    return await Product.create({ 
        name,
        inventory: 10, 
        image: 'https://i.imgur.com/FApqk3D.jpeg', 
        description: name, 
        cost: 39.99, 
        categoryId: category.id,
        genreId: genre.id
    });
}

const getProductName = ({category, genre}) => `Product for ${category.dataValues.name}/${genre.dataValues.name}`;

module.exports = { PRODUCTS };