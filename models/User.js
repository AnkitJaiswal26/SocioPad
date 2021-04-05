const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
    },
    
}, {
    timeStamps: true
})

UserSchema.virtual('fullName')
.get(() => {
    return `${this.firstName} ${this.lastName}`;
})

UserSchema.methods = {
    authenticate: async (password) => {
        console.log("kjlk")
        const x = await bcrypt.compareSync(password, this.password);
        console.log(x);
        return x;
    }
}

module.exports = mongoose.model("User", UserSchema);