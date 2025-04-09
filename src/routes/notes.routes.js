const{ Router } = require ("express");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const NotesController = require("../controllers/NotesController");
const AppError = require("../utils/AppError");

const notesRoutes = Router();

const notesController = new NotesController();



function middle(request,response,next){
    let { rating } = request.body
    
    function isValidRating(input) {
        const ratingCompare = /^[1-5]$/;
        return ratingCompare.test(String(input));
    }

    if (!rating) {
        throw new AppError("Rating é obrigatório.");
    }

    if(!isValidRating(rating)){
        throw new AppError("Para avaliações(rating), Você deve usar valores inteiros que podem variar de 1 até o 5.")
    }
 
    next()
}

notesRoutes.use(ensureAuthenticated);

notesRoutes.post("/",middle,notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);
notesRoutes.get("/", notesController.index);

module.exports = notesRoutes;


