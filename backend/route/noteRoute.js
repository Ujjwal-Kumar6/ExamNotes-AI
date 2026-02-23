import express from "express";
import { currentNotes, getNotes } from "../controllers/notesControllers.js";
import isLoging from '../middleware/isLogin.js';


const noteRoute = express.Router();

noteRoute.get("/d1",isLoging, getNotes);
noteRoute.get("/d1/:noteId",isLoging, currentNotes);

export default noteRoute;