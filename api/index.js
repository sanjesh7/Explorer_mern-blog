import express from 'express';
import cors from  'cors';
import mongoose from 'mongoose';
import UserModel from './models/user.js';
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs';
import PostModel from './models/Post.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const CONNECTION_URL=""; // enter your mongoDb url for connecting with your app
const salt=bcrypt.genSaltSync(10);
const secret="sjhs893837ssaaLQ";

app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());
const upload = multer({ dest: 'uploads/' });
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
   console.log("connection suceesfull")
}).catch((err)=>console.log(err.message));

app.post('/register', async(req, res) => {
  const {username,password}=req.body;
  try{
    const userDoc=await  UserModel.create({username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  }
     catch(err){
       res.status(400).json(err);
     }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
     const userDoc = await UserModel.findOne({ username });
         
     if (!userDoc) {
        res.status(400).send("No username found");
     } else {
        const passok = bcrypt.compareSync(password, userDoc.password);
        if (passok) {
           jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
              if (err) throw err;
               res.cookie('token',token).json({id:userDoc._id,username,});
           });
        } else {
           res.status(400).json("Wrong credentials");
        }
     }
  } catch (err) {
     res.status(500).json("Internal Server Error");
  }
});

app.get('/profile',(req,res)=>{
   const {token} = req.cookies;
   if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
   }
   jwt.verify(token, secret, {}, (err, info) => {
      if(err) {
         return res.status(401).json({ message: 'Unauthorized' });
      }
      res.json(info);
   });
});


app.post('/logout',(req,res)=>{
    res.cookie('token',0).json("ok");
})

app.post('/post',upload.single('file'),async(req,res)=>{
   const {originalname,path} = req.file;
   const parts = originalname.split('.');
   const ext = parts[parts.length - 1];
   const newPath = path+'.'+ext;
   fs.renameSync(path, newPath);
   const {title,summary,content} = req.body;
   const {token} = req.cookies;
   jwt.verify(token, secret, {}, async(err, info) => {
      if(err) {
         return res.status(401).json({ message: 'Unauthorized' });
      }
      const postDoc = await PostModel.create({
         title,
         summary,
         content,
         cover:newPath,
         author:info.id,
       });
       res.json(postDoc);
   });
   
})


app.put('/post',upload.single('file'),(req,res)=>{
   var newPath='';
   if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
       newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
   }
   const {title,summary,content,id} = req.body;
   const {token} = req.cookies;
   jwt.verify(token, secret, {}, async(err, info) => {
      if(err) {
         return res.status(401).json({ message: 'Unauthorized' });
      }
    const doc=  await PostModel.findById(id)
    const isAuthor = JSON.stringify(doc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
   
    await doc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : doc.cover,
    });

    res.json(doc);
   });
   
})


app.get('/post',async(req,res)=>{
    const doc=await PostModel.find().populate('author',['username']).sort({createdAt:-1}).limit(30);
    res.json(doc);
})

app.get('/post/:id',async(req,res)=>{
   const {id}=req.params;
   const doc= await PostModel.findById(id).populate('author', ['username']);
    res.json(doc);
})


app.listen(5000);
