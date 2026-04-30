import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const header= req.headers['authorization'] || req.headers['Authorization'];
    const token= header && header.split(' ')[1];

    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    
    try {
        const decoded= jwt.verify(token, process.env.SECRET_KEY);
        req.user= decoded;
        next();
    } catch (error) {
        return res.status(403).json({message: "Forbidden"});
    }
}


export default verifyToken;