const router = require('express').Router();

const Friend = require('./friendModel');

router
    .route('/')
    .get((req, res) => {
        Friend
            .find()
            .then(friend => {
                res.status(200).json(friend);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })
    .post((req, res) => {
        const friendData = req.body;
        const friend = new Friend(friendData);
        friend
            .save()
            .then(friend => {
                res.status(201).json(friend);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });

router
    .route('/:id')
    .get((req, res) => {
        const friendId = req.params.id;
        Friend
            .findById(friendId)
            .then(friend => {
                res.status(200).json(friend);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })    

module.exports = router;