const faker = require('faker');
const fs = require('fs');

faker.locale = 'vi';

// random catergories
const randomCategories = (n) =>{
    if(n<=0) return [];
    const list = [];

    Array.from(new Array(n)).forEach(()=>{

        const category = {
            categoryID: faker.random.uuid(),
            categoryName: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        list.push(category);
    })

    return list;
}

// random products for category
const randomProducts = (n, categories) =>{
    const list = [];

    if(n <=0) return [];

    for(category of categories){
        Array.from(new Array(n)).forEach(()=>{

            const product = {
                productID: faker.random.uuid(),
                name: faker.commerce.productName(),
                price: Number.parseInt(faker.commerce.price()),
                priceSale: Number.parseInt(faker.commerce.price()),
                rate: Number.parseInt(faker.random.number(5)),
                images: [
                    faker.image.imageUrl(),
                    faker.image.imageUrl(),
                    faker.image.imageUrl(),
                    faker.image.imageUrl()
                ],
                sizes: [
                    faker.random.number(10),
                    faker.random.number(10),
                    faker.random.number(10),
                    faker.random.number(10),
                ],
                desc: [
                    faker.commerce.productDescription(),
                    faker.commerce.productDescription(),
                    faker.commerce.productDescription(),
                ],
                color:[
                    faker.commerce.color(),
                    faker.commerce.color(),
                    faker.commerce.color(),
                    faker.commerce.color()
                ],
                categoryID: category.categoryID,
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
            list.push(product);
        })
    }

    return list;
}


(()=>{

    const categories = randomCategories(15);
    const products = randomProducts(25,categories);

    const db = {
        categories: categories,
        products: products,
        users: [],
        carts: [],

    }
    

    // write to db.json
    fs.writeFile("db.json",JSON.stringify(db), ()=>{
        console.log("write data successfully!");
    })
})()

