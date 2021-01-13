const mongoose = require('mongoose')

const List = mongoose.model(
    'List',
    new mongoose.Schema({
        items: [
            {
                itemID: String, // not sure if this is needed, or might cause issues
                title: String,
                completed: Boolean,
                timeStamp: String // might need to be a number depending on how date is formatted
            }
        ]
    })
);

module.exports = List;