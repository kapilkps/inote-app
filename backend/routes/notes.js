const express = require('express');
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { response } = require('express');
const router = express.Router();

// Route 1 get all the notes /api/notes - login required
router.get('/api/notes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred");
  }
})
// Route 2 post the note /api/addnote - login required
router.post('/api/addnote', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const note = new Notes({
      user: req.user.id,
      title: title,
      description: description,
      tag: tag
    });
    note.save();
    res.send(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred");
  }
});
// Route 2 post the note /api/addnote - login required
router.post('/api/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote={};
  try {
      //create object new update body item
      if(title){newNote.title=title}
      if(description){newNote.description=description}
      if(tag){newNote.tag=tag}
      // find the note with the given id 
      let note =await Notes.findById(req.params.id);
      
      // console.log(note.user.toString());
      if(!note){ 
        return res.status(404).send('Not Found'); 
      }else {
        // 
        if(note.user.toString()!==req.user.id){
          return res.status(401).send("Not Allowed");
        }else {
          // update the user data with updated data 
          note= await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
          return res.send({note});
        }
      }

  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred");
  }
});
// Route 3 post the note /api/deletenote - login required
router.delete('/api/deletenote/:id', fetchuser, async (req, res) => {
  
  try {
      
      // find the note with the given id 
      let note =await Notes.findById(req.params.id);
      if(!note){ 
        return res.status(404).send('Not Found'); 
      }else {
        // 
        if(note.user.toString()!==req.user.id){
          return res.status(401).send("Not Allowed");
        }else {
          // delete the user data with id  
          note= await Notes.findByIdAndDelete(req.params.id);
          return res.send({success:"Deleted Successfully",note:note});
        }
      }

  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred");
  }
});
module.exports = router