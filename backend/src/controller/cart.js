const Cart = require(`${__models}/cart`);
const Product = require(`${__models}/product`);
const { responseHandler } = require(`${__utils}/responseHandler`);
const { connectToDatabase } = require(`${__config}/dbConn`);

exports.addToCart = async (req, res) => {
    try {
        await connectToDatabase();
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        const product = await Product.findById(productId);
        if (!product) return responseHandler.validationError(res, "Product not found");

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (existingIndex > -1) {
            cart.items[existingIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        return responseHandler.success(res, cart, "Product added to cart successfully");
    } catch (error) {
        console.error(error);
        return responseHandler.error(res, error);
    }
};

exports.getCart = async (req, res) => {
    try {
        await connectToDatabase();
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart) return responseHandler.success(res, [], "Your cart is empty");

        return responseHandler.success(res, cart, "Cart fetched successfully");
    } catch (error) {
        console.error(error);
        return responseHandler.error(res, error);
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        if (!userId || !productId || quantity === undefined) {
            return responseHandler.validationError(res, "userId, productId and quantity are required");
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return responseHandler.notFound(res, "Cart not found");
        }

        const productIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (productIndex === -1) {
            return responseHandler.notFound(res, "Product not found in cart");
        }

        if (quantity <= 0) {
            cart.items.splice(productIndex, 1); // remove item
        } else {
            cart.items[productIndex].quantity = quantity; // update quantity
        }

        // Recalculate total
        let total = 0;
        for (const item of cart.items) {
            const product = await Product.findById(item.product);
            if (product) total += product.price * item.quantity;
        }

        cart.totalAmount = total;
        await cart.save();
        return responseHandler.success(res, cart, "Cart updated successfully");
    } catch (error) {
        console.error("Error updating cart:", error.message);
        return responseHandler.error(res, error.message);
    }
};

exports.removeItem = async (req, res) => {
    try {
        await connectToDatabase();
        const { productId } = req.params;
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return responseHandler.validationError(res, "Cart not found");

        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        await cart.save();

        return responseHandler.success(res, cart, "Item removed from cart");
    } catch (error) {
        console.error(error);
        return responseHandler.error(res, error);
    }
};

exports.clearCart = async (req, res) => {
    try {
        await connectToDatabase();
        const userId = req.user._id;

        await Cart.findOneAndDelete({ user: userId });
        return responseHandler.success(res, null, "Cart cleared successfully");
    } catch (error) {
        console.error(error);
        return responseHandler.error(res, error);
    }
};
