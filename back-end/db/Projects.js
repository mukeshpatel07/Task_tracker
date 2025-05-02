const mongoose=require('mongoose');

const projectsSchema=mongoose.Schema({
      name:String,
      owner:String,
      userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'}

})

module.exports=mongoose.model('projects', projectsSchema);