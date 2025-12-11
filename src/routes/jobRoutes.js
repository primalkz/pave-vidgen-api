const express = require('express');
const { body, param, validationResult } = require('express-validator');
const jobController = require('../controllers/jobController');

const router = express.Router();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', [
  body('productImageUrl').isURL().notEmpty(),
  body('template').isIn(['zoom_in', 'fade', 'slide']).notEmpty(),
  handleValidationErrors
], jobController.createJob);

router.get('/:id', [
  param('id').isString().notEmpty(),
  handleValidationErrors
], jobController.getJobById);

router.get('/', jobController.listJobs);

router.patch('/:id/status', [
  param('id').isString().notEmpty(),
  body('status').isIn(['pending', 'processing', 'completed', 'failed']),
  handleValidationErrors
], jobController.updateJobStatus);

module.exports = router;
