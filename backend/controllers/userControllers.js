import bcrypt from 'bcryptjs';
import createResponse from '../utils/response.js';
import User from '../schemas/userSchema.js';
import generateToken from '../utils/generateToken.js';

export const registerUser=async (req,res)=> {
    const {firstName,lastName,email,password,birthDate,gender}=req.body;
    const avatarPath = req.file?.path;
    // console.log(1)
    const existing=await User.findOne({email});

    if(existing) {
        // console.log(2)
        // res.status(400).json({message: 'User already exists'});
        return res.status(400).json(createResponse('error','User already exists'));
    }

    // console.log(3)

    const hashedPassword=await bcrypt.hash(password,10);
    const newUser =await new User ({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        birthDate,
        gender,
        avatar: avatarPath
    });
    await newUser.save();
    const token=await generateToken({email,id:newUser._id});
    // console.log(4)
    res.status(201)
    .json(createResponse('success','User registered successfully',{user:newUser,token}));
    

}


export const loginUser=async (req,res)=> {
    const {email,password}=req.body;

    const user= await User.findOne({email});

    if(!user) {
        return res.status(404).json(createResponse('error','User not found'));
    }

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch) {
        return res.status(400).json(createResponse('error','Password is incorrect'));
    }

    const token=await generateToken({email,id:user._id});

    res.status(200).json(createResponse('success','User logged in successfully',{user,token}));

}
