const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://gazi:tZ292abr0r8EqiyL@cluster0-0wnhm.mongodb.net/node-angular?retryWrites=true&w=majority').then(() => {
  console.log('connected');
}).catch(() => {
    console.log('connection failed');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader(`Access-Control-Allow-Origin`, '*');
  res.setHeader(`Access-Control-Allow-Headers`, 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully.'
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'post fetched successfully.',
      posts: documents
    });
  });

});

module.exports = app;
