
const knex = require("../database/knex");

class NotesController {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        
        const user_id = request.user.id;
        
        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });

        const tagsInsert = tags.map(name =>{
            return {
                note_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);

        return response.json({
            message:`A nota do Filme: ( ${title} ), foi criada com sucesso.`
        });
    }

    
    async show(request, response) {
        
        const { id } = request.params

        const note = await knex("movie_notes").where({ id }).first();

        const tags = await knex("tags").where({note_id : id}).orderBy("name");
        
        return response.json({
            ...note,
            tags
        });
    }
    
    async delete(request, response) {
        const { id } = request.params;

        await knex("movie_notes").where({id}).delete();

        return response.json({
            message: `a nota de id: ( ${id} ) ,foi deletada com sucesso.`
        });


    }

    async index(request, response) {
        
        const { title,tags } = request.query;
        const user_id = request.user.id;

        let notes;

        if(tags) {
            const filterTags = tags.split(',').map(tag => tag.trim());
            

            notes = await knex("tags")
            .select([
                "movie_notes.id",
                "movie_notes.title",
                "movie_notes.description",
                "movie_notes.user_id"
            ])
            .where("movie_notes.user_id", user_id)
            .whereLike("title", `%${title}%` )
            .whereIn("name", filterTags)
            .innerJoin("movie_notes","movie_notes.id","tags.note_id")
            .orderBy("movie_notes.title")

            

        }else{
            notes = await knex("movie_notes").where({user_id}).whereLike("title", `%${title}%` ).orderBy("title");

            
        }

        const userTags = await knex("tags").where({user_id});

        const notesWithTags = notes.map(note =>{
            const noteTags = userTags.filter(tag => tag.note_id === note.id);
            return {
                ...note,
                tags: noteTags
            }
        });
       
        return response.json(notesWithTags);
    }
}


module.exports = NotesController;