const UserRepository = require("../repository/user-repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
class UserService{

    constructor(){
        this.userRespository = new UserRepository();
    }

    async create(data){
      try {
        const user = await this.userRespository.create(data);
        return user; 
      } catch (error) {
        console.log("Something went wrong in user create service");
        throw error;
      }
    }

    async destroy(userId){
      try {
        const user = await this.userRespository.destroy(userId);
        return user;
      } catch (error) {
        console.log("Something went wrong in user destory service");
        throw error;
      }
    }

    async getById(userId){
      try {
        const user = await this.userRespository.getById(userId);
        return user;
      } catch (error) {
        console.log("Something went wrong in user getById service");
        throw error;
      }
    }

    async getByEmail(userEmail){
      try {
        const user = await this.userRespository.getByEmail(userEmail);
        return user;
      } catch (error) {
        console.log("Something went wrong in user getByEmail service");
        throw error;
      }
    }

    async signin(email,password){
      try {
        const user = await this.getByEmail(email);
  
        if(!user){
          console.log("No User Found");
          throw {error : "No User Found"}
        }
  
        const passwordMatch= this.checkPassword(password,user.password);
  
        if(!passwordMatch){
          console.log("Password doesn't match");
          throw {error : "Incorrect Password"}
        }
        
        const newToken = this.createToken({email : user.email, id : user.id});
        return newToken;
      } catch (error) {
        console.log("Something went wrong while signing in");
        throw error;
      }
    }

    

    async isAuthenticated(token){
       try {
        const response = this.verifyToken(token);
        if(!response){
          throw {error : "Invalid Token"}
        }
        const user = this.userRespository.getById(response.id);

        if(!user){
          throw {error : "User doesnot exists"}
        }
        return user.id;
       } catch (error) {
         console.log("Something went wrong while authenticating");
         throw error;
       }
    }

    async isAdmin(userId){
      try {
        const response = await this.userRespository.isAdmin(userId);
        return response;
      } catch (error) {
        console.log("Something went wrong in service layer");
        throw error;
        
      }
    }

    createToken(user){
      try {
        const result = jwt.sign(user,JWT_KEY,{expiresIn:"1d"});
        return result;
      } catch (error) {
        console.log("Something went wrong while creating the token");
        throw error;
      }
    }

    verifyToken(token){
      try {
        const response = jwt.verify(token);
        return response;
      } catch (error) {
        console.log("Something went wrong while verifying the token");
        throw error;
      }
    }

    checkPassword(plainpassword,encryptedPassword){
       try {
         return bcrypt.compareSync(plainpassword,encryptedPassword);
       } catch (error) {
         console.log("Something went wrong while matching the passsword");
         throw error;
       }
    }
}

module.exports = UserService;