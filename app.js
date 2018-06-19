const express = require('express');
const app = express();
const mongoose= require('mongoose');
mongoose.connect("mongodb://localhost:27017/node-blog")

const bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const postSchema = new mongoose.Schema({body:String});
const Post = mongoose.model('Post', postSchema);


//Routes
app.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
    res.render('index', {posts: posts})   
    });
});

app.post('/addpost', (req,res) =>{
    const postData = new Post(req.body);
    postData.save().then( result => {
    res.redirect('/');
    }).catch(err => {
    res.status(400).send("unable to save data")
    });
}); 



app.listen(3030, () => console.log('Example app listening on port 3030!'))