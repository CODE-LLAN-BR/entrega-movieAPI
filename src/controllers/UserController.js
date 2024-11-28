//error handling
const AppError = require("../utils/AppError");

//connection to data bank
const sqliteConnection = require("../database/sqlite");

//password encryption
const {hash} = require('bcryptjs');

class UsersController {

  async create (request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();

    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(checkUserExists) {
      throw new AppError("Este email já está em uso.");
    }

    const hashPassword = await hash(password,8);


    await database.run("INSERT INTO users (name ,email ,password) VALUES(? ,? ,?)",[name ,email ,hashPassword]);



    return response.status(201).json

 }

}

module.exports = UsersController;