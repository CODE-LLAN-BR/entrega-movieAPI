const{ Router } = require ("express");

const NotesController = require("../controllers/NotesController");
const AppError = require("../utils/AppError");

const notesRoutes = Router();

const notesController = new NotesController();


function middleWare(request,response,next){
    let { rating } = request.body
    
    function isValidRating(input) {
        const ratingCompare = /^[1-5]$/;
        return ratingCompare.test(input);
    }

    if(!isValidRating(rating)){
        throw new AppError("Para avaliações(rating), Você deve usar valores inteiros que podem variar de 1 até o 5.")
    }
 
    next()
}


notesRoutes.post("/:user_id", middleWare, notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);
notesRoutes.get("/", notesController.index);
module.exports = notesRoutes;


