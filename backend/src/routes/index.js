const express = require("express");
const userController = require(`${__controller}/user`);
const productController = require(`${__controller}/product`);
const contactController = require(`${__controller}/contact`);
const newsletterController = require(`${__controller}/newsletter`);
const cartController = require(`${__controller}/cart`);

const router = express.Router();
require(`${__routes}/user`)(router, userController);
require(`${__routes}/product`)(router, productController);
require(`${__routes}/contact`)(router, contactController);
require(`${__routes}/newsletter`)(router, newsletterController);
require(`${__routes}/cart`)(router, cartController);

module.exports = router;
