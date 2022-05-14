const mongoose = require("mongoose");
let mongoHost = process.env.MONGO_HOST;
let mongoDb = process.env.MONGO_DB_NAME;
let port = process.env.MONGO_PORT;
let mongoUrl = `mongodb://${mongoHost}:${port}/${mongoDb}`;

const connectToMongoDb = (result) => {
  console.log(`connecting to`, mongoUrl);
  mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      result();
    })
    .catch((err) => {
      console.log(err);
      result(err);
    });
  mongoose.Promise = global.Promise;
};

module.exports = connectToMongoDb;
