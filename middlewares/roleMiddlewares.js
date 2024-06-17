module.exports = (roles) =>{
    return(req,res,next)=>{
        const userRole = req.body.role;
        if(roles.includes(userRole)){
            next();
        }else{
            return res.status(402).send('you cant do it')
        }
    }
} 