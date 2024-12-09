const { Router } = require('express');
const usersRoutes = require('./users.routes.js');
const notesRoutes = require('./notes.routes.js');

const routes = Router();

routes.use("/users",usersRoutes);
routes.use("/:id",usersRoutes);

routes.use("/notes",notesRoutes);

module.exports = routes;