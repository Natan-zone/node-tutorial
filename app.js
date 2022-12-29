const express = require('express');
const mongoose = require('mongoose');
const {init, Post} = require("./db");

const app = express();


app.use(express.json());

app.use((req, res, next) => {
    console.log("in middleware");
    next();
});

app.get("/", (req, res, next) => {
    res.send(`hello ${req.query.name}`);
});

app.post("/", (req, res, next) => {
    res.send(`hello ${req.body.name}`);
});
//create a post
app.post("/post", async (req, res) => {
    const post = new Post({title: req.body.title, author: req.body.author, creationDate: req.body.creationDate, content: req.body.content});

    await post.save();
    res.send(post);
});

//get all posts sorted by creation date
app.get("/posts", async(req, res) => 
{
    const posts = await Post.find().sort({creationDate: req.query.sort});
       // const posts = await Post.find().sort({creationDate: 'asc'});
     //ascending sort by default
    //TODO 
    //const posts = await Post.find().sort({creationDate: req.query.sort});
    res.send(posts);
});

//example for query by _id
app.get("/post/getByID/:id", async (req, res) => {
    
    const post = await Post.findById(req.params.id);

    if (post == null) {
       return res.status(404).send("Post not found");
    }
    res.send(post);
});

//get all posts by user
app.get("/post/getByUser/:user", async (req, res) => {
    
    const post = await Post.findOne({author: req.params.user});

    if (post == null) {
       return res.status(404).send("Post not found");
    }
    res.send(post);
});

//example for query by min year
/*
app.get("/newBoards", async (req, res) => {
    let query = {};

    /* if (req.query.minYear != null) {
        query = {year: {$gte: req.query.minYear}}
    }
    
    
    const boards = await Board.find(query);

    res.send(boards);
}); */

//delete post by name
app.delete("/post/:name", async (req, res) => {
    const post = await Post.findOne({title: req.params.name});

    if (post == null) {
        return res.status(404).send("Post not found");
    }

    await post.delete();
    res.send(post);
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
  });



init().then(() => app.listen(3000, () => console.log('server started')));

