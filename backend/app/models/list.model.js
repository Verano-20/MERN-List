const mongoose = require('mongoose')

const List = mongoose.model(
    'List',
    new mongoose.Schema({
        items: [
            {
                title: String,
                completed: Boolean,
                timeStamp: String // might need to be a number depending on how date is formatted
            }
        ]
    })
);

module.exports = List;