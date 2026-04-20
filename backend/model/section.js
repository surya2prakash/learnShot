const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    // section name --->
        sectionName:{
            type:String,
            required:true,
            trim:true
        },
        // one or multiple subSection ---->
        subSectionsId:[
             {
                type:mongoose.Schema.Types.ObjectId,
                ref:"SubSection",
                required:true
             }
        ]
},{timestamps:true});

module.mongoose = mongoose.model("Section",sectionSchema);