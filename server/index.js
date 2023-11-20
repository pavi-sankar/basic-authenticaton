const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt");

const demoModel = require('./models/demo')

const app = express()
app.use(express.json())
app.use(cors()) 

mongoose.connect("mongodb://127.0.0.1:27017/demo"); //connectiong DB and nodejs

//add data 
app.post('/register', (req,res) => {
    demoModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

//get all existing data
app.get('/getreg',async(req,res)=>{
    await demoModel.find(req.body)
    .then(users =>res.json(users))
    .catch(err =>res.json(err))
});

//remove documents from collection 
app.delete('/deleteUser/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const deletedUser = await demoModel.findByIdAndDelete({ _id: id });
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully', deletedUser });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//update existing data
app.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const updateUser = await demoModel.findByIdAndUpdate(id ,{
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
      }, { new: true });

      res.json(updateUser);
  } catch (err) {
      res.json({ error: err.message });
  }
}); 

  //get data needs to be updated
  app.get('/getUser/:id',(req,res)=>{
    const id = req.params.id;
    const getuser=demoModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err => res.json(err))
  })

  //login data
  app.post('/login', (req, res) => {
    const { email, password } = req.body; 
  
    demoModel.findOne({ email: email })
      .then(user => {
        if (user) {
          if (user.password === password) {
            res.json("Success");
          } else {
            res.json("the password is incorrect");
          }
        } else {
          res.json("no record");
        }
      })
      .catch(err => console.log(err));
  });
  

app.listen(3000, () => {
    console.log("server is working")
})