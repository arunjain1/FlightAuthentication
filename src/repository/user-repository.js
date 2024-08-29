const ValidationError = require("../utils/errors/validation-error");
const { User,Role}  = require("../models/index");

class UserRepository{

    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                throw new ValidationError(error);
            }
            console.log("something went wrong in user create repo layer");
            throw error;
        }
    }

    async destroy({id}){
        try {
            const response = await User.destroy({
                where : {
                    id : id
                }
            })
            return response;
        } catch (error) {
            console.log("something went wrong in user destroy repo layer");
            throw error;
        }
    }

    async getById(userId){
        try {
            const response = await User.findByPk(userId.id,
              {
                attributes : ['email','id']
              }
            );
            console.log(response);
            return response;
        } catch (error) {
            console.log("something went wrong in user getById repo layer");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try {
            const response = await User.findOne(
              {
                where : {
                    email : userEmail.email
                },
                attributes : ['email','id','password']
              }
            );
            return response;
        } catch (error) {
            console.log("something went wrong in user getByEmail repo layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where : {
                    name : "ADMIN"
                }
            });
            const response = await user.hasRole(adminRole);
            return response;
        } catch (error) {
           console.log("Something went wrong in repository layer");
           throw error;
        }
    }

}

module.exports = UserRepository;