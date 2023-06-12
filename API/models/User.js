const mongoose = require("mongoose");
const {Schema} = mongoose;

// Create the schema, the email should be unique so we add unique inside for email
const UserSchema = new Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
});

// Create the model, the parameter: first its the "model name", then the Schema we want to use
const UserModel = mongoose.model("User", UserSchema);

// export the model
module.exports = UserModel;