const Checklist = require('../models/Checklist');

// @desc    Get all checklists for a user
exports.getChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.find({ user: req.user.id });
    res.json(checklists);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @desc    Create a new checklist
exports.createChecklist = async (req, res) => {
  const { company, items } = req.body;
  try {
    const newChecklist = new Checklist({
      user: req.user.id,
      company,
      items,
    });
    const checklist = await newChecklist.save();
    res.json(checklist);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @desc    Update a checklist (specifically its items)
exports.updateChecklist = async (req, res) => {
  const { items } = req.body;
  try {
    let checklist = await Checklist.findById(req.params.id);
    if (!checklist) return res.status(404).json({ msg: 'Checklist not found' });
    if (checklist.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    checklist = await Checklist.findByIdAndUpdate(
      req.params.id,
      { $set: { items } },
      { new: true }
    );
    res.json(checklist);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};