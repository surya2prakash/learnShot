const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema(
    {
        // category name ---->
        categoryName:{
             type:String,
             trim:true,
             required:true
        },
        // category description ---->
        description:{
             type:String,
             trim:true,
             required:true
        },
        // courses ---->
        courseId:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Course",
                required:true
            }
        ]
    },{timestamps:true}
);

module.exports = mongoose.model("Category",categorySchema);