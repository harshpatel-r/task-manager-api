const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);


/*
const User = mongoose.model('User',{
    name : {
        type : String,
        required : true,
        trim : true
    },
    age:{
        type : Number,
        default : 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number');
            }
        }
    },
    email:{
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not a contain correct format...');
            }
        }
    },
    password : {
        type : String,
        required:true,
        trim : true,
        validate(value){
            if(!validator.isStrongPassword(value, [{ minLength: 7,minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}]) || value.toLowercase().includes('password')){
                throw new Error("invalid password");
            }
        }
    }
})

const me = new User({
    name : '  jackson  ',
    email : '  harshPatel@xyz.co',
    password  :'Harsh@k1pAsswOrds'
})

me.save().then(() => {
    console.log(me);
}).catch((error)=> {
    console.log('error' , error);
})
*/
/*
const Task = mongoose.model('Task' , {
    description : {
        type : String,
        required : true,
        trim : true
    },
    completed : {
        type : Boolean,
        default: false
    }
})

const me = new Task({
    Description : "are you finished your work",
    Completed : true
   
})

me.save().then(() => 
console.log(me)
) .catch((error) => {
    console.log(error);
})
*/