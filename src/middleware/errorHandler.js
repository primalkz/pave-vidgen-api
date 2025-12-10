const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  
  console.error(`[${new Date().toISOString()}] ERROR ${status} - ${req.method} ${req.path}: ${message}`);
  if (err.stack) {
    console.error(err.stack);
  }
  
  res.status(status).json({ success: false, error: message });
};

const notFound = (req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
};

module.exports = { errorHandler, notFound };
