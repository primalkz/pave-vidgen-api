const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use('/jobs', jobRoutes);
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
