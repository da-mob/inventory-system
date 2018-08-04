var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Cart1 = require('../models/cart1');
var User = require('../models/user');

var Product = require('../models/product');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function(err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', {
      title: 'Inventory System',
      products: productChunks,
      successMsg: successMsg,
      noMessages: !successMsg
    });
  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect('/');
  });
});

router.get('/reduce/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/add/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.addByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});






router.get('/remove-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart1 = new Cart1(req.session.cart1 ? req.session.cart1 : {});

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart1.add(product, product.id);
    req.session.cart1 = cart1;
    res.redirect('/');
  });
});

router.get('/reduce1/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart1 = new Cart1(req.session.cart1 ? req.session.cart1 : {});

  cart1.reduceByOne(productId);
  req.session.cart1 = cart1;
  res.redirect('/removal-cart');
});
router.get('/add1/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart1 = new Cart1(req.session.cart1 ? req.session.cart1 : {});

  cart1.addByOne(productId);
  req.session.cart1 = cart1;
  res.redirect('/removal-cart');
});


router.get('/remove1/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart1 = new Cart1(req.session.cart1 ? req.session.cart1 : {});

  cart1.removeItem(productId);
  req.session.cart1 = cart1;
  res.redirect('/removal-cart');
});






router.get('/shopping-cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
});


router.get('/removal-cart', function(req, res, next) {
  if (!req.session.cart1) {
    return res.render('shop/removal-cart', {
      products: null
    });
  }
  var cart1 = new Cart1(req.session.cart1);
  res.render('shop/removal-cart', {
    products: cart1.generateArray(),
    totalPrice: cart1.totalPrice
  });
});





router.get('/update', isLoggedIn, function(req, res, next) {
  if (!req.session.cart1) {
    return res.redirect('/shopping-cart');
  }
  var cart1 = new Cart1(req.session.cart1);
  var errMsg = req.flash('error')[0];
  res.render('shop/update', {
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg
  });
});

router.post('/update', isLoggedIn, function(req, res, next) {
  if (!req.session.cart1) {
    return res.redirect('/shopping-cart');
  }
  var cart1 = new Cart1(req.session.cart1);

  var stripe = require("stripe")("sk_test_bgBdBuFAydIEVdepmjpaJKUy1");

  var col = db.xx-shopping("products").cart1;
var cart1 = db.findOne({
    _id: userId
  , "products._id": productId
  , status: "active"});
var oldQuantity = 0;
for(var i = 0; i < cart1.products.length; i++) {
  if(cart1.products[i]._id == productId) {
    oldQuantity = cart1.products[i].quantity;
  }
}

var newQuantity = 2;
var delta = newQuantity - oldQuantity;

col.update({
    _id: userId
  , "products._id": productId
  , status: "active"
}, {
  $set: {
      modified_on: new Date()
    , "products.$.quantity": newQuantity
  }
});

  
});








router.get('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg
  });
});

router.post('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")("sk_test_bgBdBuFAydIEVdepmjpaJKUy");

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "ruprees",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function(err, charge) {
    if (err) {
      req.flash('error', 'We could not finalize your purchase!');
      return res.redirect('/checkout');
    }
    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });
    order.save(function(err, result) {
      req.flash('success', 'Purchase completed successfully!');
      req.session.cart = null;
      res.redirect('/');
    });
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}
