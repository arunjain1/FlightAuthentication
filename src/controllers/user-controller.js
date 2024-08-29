const UserService = require("../services/user-service");

const userService = new UserService();

const create = async(req,res)=>{
    try {
        console.log(req.body,{
            email : req.body.email,
            password : req.body.password
        });
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password
        });
        return res
        .status(201)
        .json(
            {
                success : true,
                message : "Successfully created a new user",
                data : response,
                err : {}
            }
        )
    } catch (error) {
        console.log("Something went wrong in user controller",error.statusCode,error);
        return res
        .status(error.statusCode)
        .json(
            {
                message : error.message,
                data : {},
                success : false,
                err : error.explaination
            }
        )
    }
}

const signIn = async(req,res)=>{
    try {
        console.log(req.body,{
            email : req.body.email,
            password : req.body.password
        });
        const response = await userService.signin(req.body.email,req.body.password);
        return res
        .status(201)
        .json(
            {
                success : true,
                message : "Successfully signedIn the user",
                data : response,
                err : {}
            }
        )
    } catch (error) {
        console.log("Something went wrong in user controller");
        return res
        .status(500)
        .json(
            {
                message : "Something went wrong",
                data : {},
                success : false,
                err : error
            }
        )
    }
}

const destory = async(req,res)=>{
    try {
        console.log(req.body,{
            id : req.body.id,
        });
        const response = await userService.destroy({
            id : req.body.id,
        });
        return res
        .status(201)
        .json(
            {
                success : true,
                message : "Successfully deleting a  user",
                data : response,
                err : {}
            }
        )
    } catch (error) {
        console.log("Something went wrong in user controller");
        return res
        .status(500)
        .json(
            {
                message : "Something went wrong",
                data : {},
                success : false,
                err : error
            }
        )
    }
}

const getById = async(req,res)=>{
    try {
        console.log(req.body,{
            id : req.body.id,
        });
        const response = await userService.getById({
            id : req.body.id,
        });
        return res
        .status(201)
        .json(
            {
                success : true,
                message : "Successfully getting the user",
                data : response,
                err : {}
            }
        )
    } catch (error) {
        console.log("Something went wrong in user controller");
        return res
        .status(500)
        .json(
            {
                message : "Something went wrong",
                data : {},
                success : false,
                err : error
            }
        )
    }
}

const getByEmail = async(req,res)=>{
    try {
        console.log(req.body,{
            email : req.body.email
        });
        const response = await userService.getByEmail({
            email : req.body.email
        });
        return res
        .status(201)
        .json(
            {
                success : true,
                message : "Successfully getting the user",
                data : response,
                err : {}
            }
        )
    } catch (error) {
        console.log("Something went wrong in user controller");
        return res
        .status(500)
        .json(
            {
                message : "Something went wrong",
                data : {},
                success : false,
                err : error
            }
        )
    }
}


const isAdmin =  async(req,res)=>{
   try {
    console.log(req.body);
      const response = await userService.isAdmin(req.body.id);
      return res
      .status(201)
      .json(
        {
            data : response,
            message : "Successfully fetched data",
            success : true,
            err : {}
        }
      )
   } catch (error) {
     console.log("Something went wrong in isAdmin Repo layer");
     return res
     .status(500)
     .json(
        {
            data : {},
            message : "Somthing went wrong",
            success : false,
            err : error
        }
     )
   }
}

module.exports = {
    create,
    signIn,
    destory,
    getById,
    getByEmail,
    isAdmin
}