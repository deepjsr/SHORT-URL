const mongoose= require("mongoose");
mongoose.set("strictQuery",true);

async function connecToMonGoDb(url){
    return mongoose.connect(url);
}

module.exports={
    connecToMonGoDb
}