import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  name: String,
  description: String,
  dateCreated: String,
  originated: String,
});

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
