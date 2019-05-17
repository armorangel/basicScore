var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: String,
    author: String,
    published_date: { type: Date, default: Date.now  }
});

//var dataSchema = new Schema({..}, { collection: 'COLLECTION_NAME' });
module.exports = mongoose.model('book', bookSchema);

/*
schema에서 사용되는 SchemaType은 총 8종류가 있습니다.

String
Number
Date
Buffer
Boolean
Mixed
Objectid
Array


*/