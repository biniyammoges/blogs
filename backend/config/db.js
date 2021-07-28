const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`Database connected : ${con.connection.host}`.yellow.bold);
  } catch (err) {
    console.log(`Error ${err}`.red.bold);
    // process.exit(1);
  }
};

module.exports = connectDb;
