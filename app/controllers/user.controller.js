const mongoose = require('mongoose');
const db = require('../models');
const User = db.user;
const List = db.list;

exports.getList = (req, res) => {
    // request validation
    if (!req.body.listId) {
        res.status(400).send({message: "Invalid request."});
        return;
    }

    // find user
    User.findById(req.userId)
    .populate('roles', '-__v')
    .exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!user) {
            return res.status(404).send({message: "User not found."});
        }

        if (!user.lists.includes(req.body.listId)) {
            return res.status(403).send({message: "List does not belong to user."});
        }

        List.findById(req.body.listId).exec((err, list) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            res.status(200).send(list.items);
        });
    });
};

exports.newTask = (req, res) => {
    // request validation
    if (!(req.body.listId && req.body.itemTitle)) {
        res.status(400).send({message: "Invalid request."});
        return;
    }

    // find user
    User.findById(req.userId)
    .populate('roles', '-__v')
    .exec((err, user) => { 
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        
        if (!user) {
            return res.status(404).send({message: "User not found."});
        }

        // check list is in user's lists
        if (!user.lists.includes(req.body.listId)) {
            return res.status(403).send({message: "List does not belong to user."})
        }

        // find list
        List.findById(req.body.listId).exec((err, list) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            let taskId = new mongoose.Types.ObjectId();

            list.items.push({
                _id: taskId,
                title: req.body.itemTitle,
                completed: false,
                timeStamp: Date.now()
            });

            list.save(err => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                res.status(200).send({
                    message: "List item added successfully.",
                    id: taskId
                });
            });
        });
    });
};

exports.deleteTask = (req, res) => {
    // request validation
    if (!(req.body.listId && req.body.itemId)) {
        res.status(400).send({message: "Invalid request."});
        return;
    }

    // find user
    User.findById(req.userId)
    .populate('roles', '-__v')
    .exec((err, user) => { 
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        
        if (!user) {
            return res.status(404).send({message: "User not found."});
        }

        // check list is in user's lists
        if (!user.lists.includes(req.body.listId)) {
            return res.status(403).send({message: "List does not belong to user."})
        }

        // find list
        List.findById(req.body.listId).exec((err, list) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            for (let i = 0; i < list.items.length; i++) {
                if (list.items[i]._id == req.body.itemId) {
                    list.items.splice(i, 1);
                    break;
                }

                if (i == list.items.length - 1) {
                    res.status(404).send({message: "List item not found."});
                    return;
                }
            }

            list.save(err => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                res.status(200).send({message: "List item deleted successfully."});
            });
        });
    });
};

exports.completedTask = (req, res) => {
    // request validation
    if (!(req.body.listId && req.body.itemId)) {
        res.status(400).send({message: "Invalid request."});
        return;
    }

    // find user
    User.findById(req.userId)
    .populate('roles', '-__v')
    .exec((err, user) => { 
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        
        if (!user) {
            return res.status(404).send({message: "User not found."});
        }

        // check list is in user's lists
        if (!user.lists.includes(req.body.listId)) {
            return res.status(403).send({message: "List does not belong to user."})
        }

        // find list
        List.findById(req.body.listId).exec((err, list) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            for (let i = 0; i < list.items.length; i++) {
                if (list.items[i]._id == req.body.itemId) {
                    list.items[i].completed = !(list.items[i].completed);
                    break;
                }
                
                if (i == list.items.length - 1) {
                    res.status(404).send({message: "List item not found."});
                    return;
                }
            }

            list.save(err => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                res.status(200).send({message: "List item completion updated successfully."});
            });
        });
    });
}