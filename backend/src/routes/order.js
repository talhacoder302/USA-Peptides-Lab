const passport = require("passport");
const { isAdmin } = require(`${__middelwares}/user`);

module.exports = (router, controller) => {
    router.post("/createOrder", passport.authenticate("jwt", { session: false }), controller.createOrder);
    router.get("/myOrders", passport.authenticate("jwt", { session: false }), controller.getUserOrders);
    router.put("/:orderId/status", passport.authenticate("jwt", { session: false }), isAdmin, controller.updateOrderStatus);
};
