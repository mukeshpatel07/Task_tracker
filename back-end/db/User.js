const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name:String,
    email:{type:String, unique:true},
    password:String,
    country:String
});

const User = mongoose.model('users', userSchema);

module.exports = User;