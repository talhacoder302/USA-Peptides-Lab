const Order = require(`${__models}/order`);
const Cart = require(`${__models}/cart`);
const { responseHandler } = require(`${__utils}/responseHandler`);
const { connectToDatabase } = require(`${__config}/dbConn`);

exports.createOrder = async (req, res) => {
    try {
        await connectToDatabase();
        const userId = req.user._id;
        const { paymentMethod, shippingAddress, billingAddress } = req.body;

        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart || cart.items.length === 0)
            return responseHandler.validationError(res, "Your cart is empty");

        const totalAmount = cart.items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );

        const order = new Order({
            user: userId,
            items: cart.items.map((i) => ({
                product: i.product._id,
                quantity: i.quantity,
                price: i.product.price,
            })),
            totalAmount,
            paymentMethod,
            shippingAddress,
            billingAddress,
        });

        await order.save();
        // await Cart.findOneAndDelete({ user: userId });

        return responseHandler.success(res, order, "Order placed successfully");
    } catch (error) {
        console.error(error);
        return responseHandler.error(res, error);
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        await connectToDatabase();
        const userId = req.user._id;

        const orders = await Order.find({ user: userId }).populate("items.product");
        return responseHandler.success(res, orders, "Orders fetched successfully");
    } catch (error) {
        console.error(error);
        return responseHandler.error(res, error);
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        await connectToDatabase();
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order)
            return responseHandler.validationError(res, "Order not found");

        return responseHandler.success(res, order, "Order status updated");
    } catch (error) {
        console.error(error);
        return responseHandler.error(res, error);
    }
};
