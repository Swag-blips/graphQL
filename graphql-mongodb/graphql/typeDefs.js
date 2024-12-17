import { gql } from "apollo-server";

const typeDefs = gql`
  type Recipe {
    name: String
    description: String
    dateCreated: String
    originated: String
  }

  input RecipeInput {
    name: String
    description: String
    originated: String
  }

  type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int!): [Recipe]
  }

  type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean
  }
`;

export default typeDefs;
