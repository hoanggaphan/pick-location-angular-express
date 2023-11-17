import express from 'express';
import * as locationController from '../controllers/location.controller.js';

const router = express.Router();

router.get('/', locationController.getAllLocation);
router.get('/:id', locationController.getLocation);
router.post('/', locationController.createLocation);
router.post('/submit', locationController.submit);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

export default router;
