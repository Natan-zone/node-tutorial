const express = require('express');
const mongoose = require('mongoose');
const {init, Post} = require("./db");

console.log("starting server");

const app = express();

process.on('SIGINT', () => process.exit(0));


app.use(express.json());

/*
app.use((req, res, next) => {
    console.log("Handle request:");
    next();
});
*/

app.get("/", (req, res, next) => {
    res.send(`Hello ${req.query.name}!`);
});



//create a post
app.post("/post", async (req, res) => {
    const post = new Post({title: req.body.title, author: req.body.author, creationDate: req.body.creationDate, content: req.body.content});

    await post.save();
    res.send(post);
});


//get a post by ID
app.get("/post/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).send("Post not found");
        }
        res.send(post);

    } catch (error) {
        console.error("error! invalid objectID");
        return res.status(404).send("Post not found");
    }
    

});

//search post by title
app.get("/post/title/:title", async (req, res) => {
    const post = await Post.findOne({title: req.params.title});

    if (post == null) {
        return res.status(404).send("Post not found");
    }
    res.send(post);

});

//delete post by title
app.delete("/post/title/:title", async (req, res) => {
    const post = await Post.findOne({title: req.params.title});

    if (post == null) {
        return res.status(404).send("Post not found");
    }

    await post.delete();
    res.send(post);
});

//continue from here
  //get all posts by user (author)
app.get("/posts/users", async (req, res) => {
   
    const post = await Post.find({author: req.query.author});
    
    if (post == null) {
       return res.status(404).send("Post not found");
    }
    
    res.send(post);
});


//get all posts sorted by creation date
app.get("/posts", async(req, res) => 
{
    const posts = await Post.find().sort({creationDate: req.query.sort});
    res.send(posts);
});

app.all('*', (req, res) => {
    res.status(404).send('404! Page not found');
  });


init().then(() => app.listen(3000, () => console.log('server started')));


 /*let query = {};

    if (req.query.minYear != null) {
        query = {year: {$gte: req.query.minYear}}
    }
    
    const boards = await Board.find(query);

    res.send(boards);
    */
