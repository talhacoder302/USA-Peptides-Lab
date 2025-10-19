const passport = require("passport");

module.exports = (router, controller) => {
    router.post("/addToCart", passport.authenticate("jwt", { session: false }), controller.addToCart);
    router.get("/getCart", passport.authenticate("jwt", { session: false }), controller.getCart);
    router.put("/updateCartItem", passport.authenticate("jwt", { session: false }), controller.updateCartItem);
    router.delete("/removeCart/:productId", passport.authenticate("jwt", { session: false }), controller.removeItem);
    router.delete("/clearCart", passport.authenticate("jwt", { session: false }), controller.clearCart);
};
