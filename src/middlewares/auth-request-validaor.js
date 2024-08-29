const authValidator = (req,res,next)=>{
   if(!req.body.email || !req.body.password){
     return res
     .status(400)
     .json(
        {
            success : false,
            data : {},
            message : "Something went wrong",
            err : "Missing either Email or password"
        }
     )
   }
   next();
}

module.exports = authValidator;