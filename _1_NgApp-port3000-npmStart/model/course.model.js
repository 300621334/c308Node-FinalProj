const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new Schema(
    {
        title: {
                type: String,
                required: true,
                unique: true
            },
           
            author:{
                type: String,
                required: true,
                unique: false
            },
            section:{
                type: String          
               
            },
            isbn: {
                type:String,
                required: true,
                unique: true
            },
            respRate:{
                type: String          
            },
            bloodPress:{
                type: String          
            },
            tipOfDay:{
                type: String          
            },
            emergEmail:{
                type: String          
            },
            dateCreated:{
                type: String          
            },
     },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("book", bookSchema);
