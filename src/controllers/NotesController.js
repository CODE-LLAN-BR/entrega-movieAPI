const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesController {
    async create(request, response) {
        const {title, description, rating, tags} = request.body;
        const {user_id} = request.params;


        

        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
        })

        const tagsInsert = tags.map(tag =>{
            return {
                note_id,
                name,
                user_id
            }
        })

        await knex("tags").insert(tagsInsert)



        response.json();
    }

    
}


module.exports = NotesController;