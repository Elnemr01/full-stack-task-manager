import jwt from 'jsonwebtoken';

const generateToken=async (payload)=> {
    let token =await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'1w'});
    return token;
}

export default generateToken;