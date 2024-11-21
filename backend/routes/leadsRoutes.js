
const express = require('express');
const leadsController = require('../controllers/LeadController');
const router = express.Router();


router.get('/', leadsController.getLeads); 
router.get('/:id', leadsController.getLeadById);
router.post('/', leadsController.createLead);
router.put('/:id', leadsController.updateLead);
router.delete('/:id', leadsController.deleteLead);


module.exports = router;
