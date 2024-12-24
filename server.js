const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exeception');
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then((con) => console.log('DB connection successful'));

////console.log(app.get('env'));

// node js sets env variable which is located at process.env (process core module)
////console.log(process.env);

// start the code
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

////console.log(x);
