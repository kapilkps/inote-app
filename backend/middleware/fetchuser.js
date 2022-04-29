var jwt = require('jsonwebtoken');

fetchuser =(req,res,next)=>{
    // get user from jwt token and add id
    const token=req.header('auth-token');
    if(token){
        const token_decode=jwt.verify(token,'kapilHappy');
        req.user=token_decode.user;
        next();
    }else{
       res.status(401).send({error:"Please authenticate with a valid token"});
    }
}
module.exports=fetchuser;