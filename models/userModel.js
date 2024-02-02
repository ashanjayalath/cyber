const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            // match: /[a-z]/,
            required: [true,"Please enter your name"]
        },
        email:{
            type: String,
            unique: [true,"Email address already taken"],
            required: [true,"Please enter your email address"]
        },
        password:{
            type: String,
            required: [true,"Please enter the password"]
        },
        phone:{
            type: String,
            validate: {
              validator: function(v) {
                return /\d{10}/.test(v);
              },
              message: (props) => {`${props.value} is not a valid phone number!`}
            },
            required: [false, 'User phone number required'],
            unique: [true,"Phone number already taken"],
            maxlength:10,
        },
        city:{
            type: String,
            // match: /[a-z]/,
            required: [false,"Please enter your city"]
        },
        age:{
            type: Number,
            maxlength:2,
            minlength:2,
            required: [false,"Please enter your age"]
        },
        image:{
            type: Object,
            required: [false,"Please add your profile photo"],
            default:process.env.DEFAULT_AVATAR
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('User',userSchema);