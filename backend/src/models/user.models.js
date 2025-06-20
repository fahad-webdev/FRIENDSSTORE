const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    profilePic:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/13078/13078067.png",
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user',
    },
    phone:{
        type:String,
        match: [/^\d{11}$/, 'Phone number must be exactly 11 digits.'],
        default:null
    },
    address:{
        type:String,
        default:null
    },
},
{
    timestamps:true
});
//for bcrypting the password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    const saltValue = 12;
    this.password = await bcrypt.hash(this.password,saltValue);
    this.paswordChangedAt = Date.now() - 1000 ;
    next();
})

//for comparing password
userSchema.methods.comparePassword = async function(userPassword){
    return await bcrypt.compare(userPassword , this.password);
}



/*userSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next(); // we will check if the password is modified or not is its not then will direct to the next middleware
    const saltValue = 12;//this value will define the complexity or the no of digits to which you want to bcrypt your password
    this.password = await bcrypt.hash(this.password , saltValue); // we will bcrypt the password that we get from user
    this.passwordChangedAt = Date.now() - 1000; // we need to bcrypt the password before the JWT 
    next();//after successfully bcrypting password we will call the next middleware
});*/
module.exports = mongoose.model('User',userSchema);