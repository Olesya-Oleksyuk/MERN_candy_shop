import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async (uri, callback) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,
    });

    console.log(
      `MongoDB Connected: ${mongoose.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
