// middleware/errorMiddleware.js
const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  // if response status is still 200 (OK), bump it to 500
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    // only show stack in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export { notFound };
export default errorHandler;
