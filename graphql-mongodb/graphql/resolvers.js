import Recipe from "../model/recipe.model.js";

const resolvers = {
  Query: {
    async recipe(_, { ID }) {
      return await Recipe.findById(ID);
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ dateCreated: -1 }).limit(amount);
    },
  },

  Mutation: {
    async createRecipe(_, { recipeInput: { name, description, originated } }) {
      const createdRecipe = new Recipe({
        name,
        description,
        dateCreated: new Date().toISOString(),
        originated: originated,
      });

      const response = await createdRecipe.save();

      return {
        ...response._doc,
        id: response._id,
      };
    },
    async deleteRecipe(_, { ID: ID }) {
      const recipe = await Recipe.findByIdAndDelete(ID);
      console.log(recipe);

      return recipe;
    },

    async editRecipe(_, { ID, recipeInput: { name, description } }) {
      const editRecipe = await Recipe.findByIdAndUpdate(ID, {
        name: name,
        description: description,
      });

      return editRecipe;
    },
  },
};

export default resolvers;
