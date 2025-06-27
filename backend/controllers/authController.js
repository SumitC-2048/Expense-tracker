import User from "../models/users.js";
import bcrypt from 'bcrypt';

const SigninController = async (req,res) => {
    try{
        const {email,password} = req.body;
        console.log(email);
        console.log(password);
        const user = await User.findOne({email: email});
        if(!user){
            console.log('Email does not Exist');
            return res.json({
                success: false,
                message: 'email does not exist' 
            });
        }
        const match = await bcrypt.compare(password,user.password);
        console.log(match);
        if(!match){
            console.log("Bad credentials");
            return res.json({
                success: false,
                message: 'Bad credentials'
            });
        }

        return res.status(200).json({ 
            success: true,
            message: 'Welcome Back!',
            user,
        });

    }
    catch(err){
        console.log('inside catch block');
        console.log('error message',err.message);
        return res.status(401).json({
            success: false,
            message: err.message
        });
    }
};

const SignupController = async (req,res) => {
    try{
        const {Username,email,password} = req.body;
        console.log(Username);
        console.log(email);
        console.log(password);
        if(!Username || !email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            });
        }
        let user = await User.findOne({email: email});
        if(user){
            console.log("User already exist");
            return res.status(400).json({ 
                success: false,
                message: 'User already exist'
            });
        }

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password,salt);

        const NewUser = await User.create({
            Username: Username,
            email: email,
            password: hashedPassword
        });
        console.log(NewUser);
        return res.status(201).json({
            success: true,
            message: 'New User has been created',
            user: NewUser
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

export {SigninController,SignupController};