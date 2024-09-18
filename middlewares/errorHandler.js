// middlewares/errorHandler.js
module.exports = function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ msg: 'Server Error' });
};
