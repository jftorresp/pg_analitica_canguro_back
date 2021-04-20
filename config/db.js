import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // database name (local)
    const dbName = "va_analitica_canguro";
    const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Database connected : ${con.connection.host}`);
  } catch (err) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
