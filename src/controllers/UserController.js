//error handling
const AppError = require("../utils/AppError");

//connection to data bank
const sqliteConnection = require("../database/sqlite");

//password encryption
const { hash, compare } = require('bcryptjs');

class UserController {

      async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();

    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(checkUserExists) {
      throw new AppError("Este email já está em uso.");
    }

    const hashPassword =  await hash(password,8);


    await database.run("INSERT INTO users (name ,email ,password) VALUES(? ,? ,?)",[name ,email ,hashPassword]);



    return response.json();

  }

      async update(request, response) {
  const { name, email, password, old_password} = request.body;
  const user_id = request.user.id;

  const database = await sqliteConnection();
  
  const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

  if(!user) {
      throw new AppError("Usuário não encontrado");
  }
  


  const userUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)",[email]);

  if(userUpdatedEmail && userUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso.");
  }

  user.name = name ?? user.name;
  user.email = email ?? user.email;

  if(password && !old_password) {
      throw new AppError('Você precisa informar a senha antiga para atualizar seus dados');
  }

  if(password && old_password) {
      const pwComparator = await compare(old_password, user.password);
        if(!pwComparator) {
          throw new AppError('Senha antiga não corresponde');
        }

      user.password = await  hash(password, 8);
  }

  await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ? `,
  [user.name, user.email,user.password, user_id]);

  return response.json();

  }

}

module.exports = UserController;