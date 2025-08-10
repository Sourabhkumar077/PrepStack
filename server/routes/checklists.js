const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getChecklists, createChecklist, updateChecklist,deleteChecklist } = require('../controllers/checklistController');

// @route   GET api/checklists
router.get('/', auth, getChecklists);

// @route   POST api/checklists
router.post('/', auth, createChecklist);

// @route   PUT api/checklists/:id
router.put('/:id', auth, updateChecklist);

// @route   DELETE api/checklists/:id
router.delete('/:id', auth, deleteChecklist);

module.exports = router;