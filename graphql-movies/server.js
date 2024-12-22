import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const movies = [
  {
    id: "1",
    title: "Inception",
    director: "Christopher Nolan",
    releaseYear: 2010,
    genre: "Sci-Fi",
  },
  {
    id: "2",
    title: "The Godfather",
    director: "Francis Ford Coppola",
    releaseYear: 1972,
    genre: "Crime",
  },
];

const typeDefs = `

type Movie{
    id:ID!
    title: String!
    director:String!
    releaseYear:Int!
    genre:String
}

type Query {
    getAllMovies: [Movie]
    getMovieById(id:ID): Movie
}

type Mutation{
 addMovie(title:String!, director:String!, releaseYear:Int!, genre:String): [Movie]
 updateMovie(id:ID!, title:String, director:String, releaseYear:Int genre:String): [Movie]
 deleteMovie(id:ID!): String
}
`;

const resolvers = {
  Query: {
    getAllMovies: () => {
      return movies;
    },

    getMovieById: (_, args) => {
      const movieId = args.id;

      return movies.find((movie) => movie.id === movieId);
    },
  },

  Mutation: {
    addMovie: (_, args) => {
      const { title, director, releaseYear, genre } = args;

      const newMovie = {
        id: movies.length + 1,
        title,
        director,
        releaseYear,
        genre,
      };
      movies.push(newMovie);

      return movies;
    },

    updateMovie: (_, args) => {
      const {
        id,
        title: movieTitle,
        director: movieDirector,
        releaseYear: movieReleaseYear,
        genre: movieGenre,
      } = args;

      return movies.map((movie) => {
        if (movie.id === id) {
          return {
            ...movie,
            title: movieTitle || movie.title,
            director: movieDirector || movie.director,
            releaseYear: movieReleaseYear || movie.releaseYear,
            genre: movieGenre || movie.genre,
          };
        } else {
          return movie;
        }
      });
    },

    deleteMovie: (_, args) => {
      const movieId = args.id;

      movies.filter((movie) => movie.id !== movieId);
      return "Movie successfully deleted";
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);

console.log(`server starts at ${url}`);
