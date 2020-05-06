const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
})
//Add Posts

router.post('/',
    async (req, res) => {
        const posts = await loadPostCollection();
        await posts.insertOne({
            text: req.body.text,
            createdAt: new Date()
        })
        res.status(201).send();
    });
//Delete Posts

router.delete('/:id',
    async (req, res) => {
        const posts = await loadPostCollection();
        await posts.deleteOne({
            _id: new mongodb.ObjectID(req.params.id)
        });
        res.status(200).send();
    });


async function loadPostCollection() {

    // Connection URL
    const url = 'mongodb+srv://abc123:Noman123@cluster0-vs4y9.mongodb.net/vue-express?retryWrites=true&w=majority';

    // Use connect method to connect to the Server
    const client = await mongodb.MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    return client.db("vue-express").collection('posts');

}

module.exports = router;