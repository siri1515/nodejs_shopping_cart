const express = require('express');
const router = express.Router();
const path = require('path');
const Product = require('../models/productSchema');

const fs = require('fs');
const { REFUSED } = require('dns');
const data = fs.readFileSync('productsData.json');
const documents = JSON.parse(data);

Product.insertMany(documents)
  .then(docs => {
    console.log(`${docs.length} documents inserted`);
  })
  .catch(error => {
    console.error(error);
  });



let cart = [];


router.get('/', (req, res) => {
  Product.find()
    .then((products) => {
      res.render('allProductsViews', { products, path: '/' });
    })
    .catch((err) => {
      console.log(err);
    })
})

var idNumber = 2;
router.post('/add-new-product', (req, res) => {
  const { name, color, price, size, brand, category } = req.body;
  const product = new Product({
    Name: name,
    ID: (idNumber++).toString,
    Color: color,
    Price: price,
    Size: size,
    Brand: brand,
    Category: category,
    Image: '/picture/white_clothes.jpg'
  });
  product.save()
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => {
      
    })
})



var total = 0;
router.post('/add-to-cart', (req, res) => {
  if (!req.body) {
    return res.status(400).send('nothing');
  }
  const { productId } = req.body;
  Product.find()
    .then((products) => {
      const product = products.find(p => p.ID === productId) || null
      console.log(product);
      if (product){
        cart.push({ product });
        total = total + product.Price;
        console.log('cart:', cart, 'total:', total)
      } 
      res.redirect('/');
    })
})

router.post('/delete-product', (req, res) => {
  const { deletedProductID } = req.body;
  var newCart = cart.filter((item) => {
    //if return false, delete
    if (item.product.ID === deletedProductID) {
      total = total - item.product.Price
      return false;
    }
    return true;
  });
  cart = newCart;

  res.redirect('/cart');
  /* another method
  const deletedProductIndex = cart.findIndex(item => item.product.ID === deletedProductID);
  if (deletedProductIndex !== -1) {
    cart.splice(deletedProductIndex, 1);
    res.redirect('/cart');
  } else {
    res.status(404).send('Product not found');
  }*/
})

router.get('/cart', (req, res) => {
  res.render('cartViews', { cart, total, path: '/cart' });
})

router.get('/addNewProducts', (req, res) => {
  res.render('addNewProductViews', { path: '/addNewProducts' })
})

router.get('/productDetail', (req, res) => {
  res.send('here is something');
})




/*
// 显示商品列表
router.get('/', (req, res) => {
  res.render('shopViews', { products, path: '/' });
});

// 添加商品到购物车
router.post('/add-to-cart', (req, res) => {
  const { productId, quantity } = req.body;

  const product = products.find((p) => p.id == productId);

  // 添加到购物车
  if (product) {
    cart.push({ product, quantity: parseInt(quantity) });
  }

  res.redirect('/');
});

// 显示购物车
router.get('/cartViews', (req, res) => {
  let total = 0;
  cart.forEach((item) => {
    total += item.product.price * item.quantity;
  });
  res.render('cartViews', { cart, total, path: '/cartViews' });
});*/

module.exports = router;