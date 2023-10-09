const mongooose = require('mongoose');
const schema = mongooose.Schema;


const productsSchema = new schema({
    Name: {
        type: String,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Color: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Size: {
        type: String,
        required: true
    },
    Brand: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    }
}, { timestamps: true});

const Product = mongooose.model('Product', productsSchema); //create the model and name this model as Product
module.exports = Product;