const { Router } = require('express');

const UserController = require("../controllers/UserController");
const userController = new UserController()




const userRoutes = Router();
userRoutes.post("/users", userController.create);
userRoutes.put("/:id", userController.update);



module.exports = userRoutes;