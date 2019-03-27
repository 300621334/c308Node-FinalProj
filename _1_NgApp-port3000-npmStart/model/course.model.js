const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new Schema(
    {
        title: {
                type: String,
                required: true
            },
           
            author:{
                type: String
            },
            section:{
                type: String          
               
            },
            isbn: {
                type:String
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
            }
     },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("book", bookSchema);
