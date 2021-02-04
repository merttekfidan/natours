const morgan = require('morgan');
const express = require('express');
const app = express();
const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRoutes.js');
////////////////////
////MIDDLEWARE
app.use(express.json()); //middleware
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
////////////////////
////SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
