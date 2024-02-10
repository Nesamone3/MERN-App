
import express from 'express';
import Contact from '../models/contactModels.js';

const router = express.Router();

// Example: GET route to fetch all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to create a new contact
router.post('/contacts', async (req, res) => {
    try {
      const newContact = new Contact(req.body);
      const savedContact = await newContact.save();
      res.status(201).json(savedContact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // PUT route to update an existing contact
  router.put('/contacts/:id', async (req, res) => {
    try {
      const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.json(contact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // DELETE route to delete a contact
  router.delete('/contacts/:id', async (req, res) => {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(204).json({ message: 'Contact deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
export default router;
