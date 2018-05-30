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
                // console.log('FRIEND', friend)
                // if (!friend.firstName || !friend.lastName || !friend.age) {
                //     res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
                // } else if (friend.age < 0 || friend.age > 120) {
                //     res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
                // }
                // else {
                    res.status(201).json(friend);
                // }
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
                res.status(500).json({ errorMessage: "The friend information could not be retrieved." });
            })
    });

router
    .route('/:id')
    .delete((req, res) => {
        const friendId = req.params.id;
        let deleted;
        Friend
            .remove(friendId)
            .then(deleted => {
                if (deleted) {
                    res.status(201).json({ deleted })
                } else {
                    return res.status(404).json({ message: "The friend with that ID does not exist" })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The friend could not be removed" })
            })
    })



module.exports = router;