import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    console.log("called!");
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(connection.connect);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectMongo;
