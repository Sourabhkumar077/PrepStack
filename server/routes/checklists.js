const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getChecklists, createChecklist, updateChecklist } = require('../controllers/checklistController');

// @route   GET api/checklists
router.get('/', auth, getChecklists);

// @route   POST api/checklists
router.post('/', auth, createChecklist);

// @route   PUT api/checklists/:id
router.put('/:id', auth, updateChecklist);

module.exports = router;