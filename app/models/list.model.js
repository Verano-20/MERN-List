const mongoose = require('mongoose')

const List = mongoose.model(
    'List',
    new mongoose.Schema({
        items: [
            {
                _id: mongoose.Schema.Types.ObjectId,
                title: String,
                completed: Boolean,
                timeStamp: String
            }
        ]
    })
);

module.exports = List;