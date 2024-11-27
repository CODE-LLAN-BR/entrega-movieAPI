const {Router} = require('express');

const UsersController = require("../controllers/UserController");
const usersController = new UsersController()


const userRoutes = Router();

userRoutes.post("/users",usersController.create);


module.exports = userRoutes;