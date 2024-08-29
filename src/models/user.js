'use strict';
const {
  Model
} = require('sequelize');

const bcypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role,{
        through : 'User_Roles'
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING, allowNull: false, unique: true, validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING, allowNull: false,
      validate: {
        len: [6, 300]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(    // This is sequelize Hook
    async(user)=>{
      const salt = bcypt.genSaltSync(10);
      const encryptedPassword = bcypt.hashSync(user.password,salt);
      user.password = encryptedPassword;
    }
  )
  return User;
};