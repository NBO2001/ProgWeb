'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    nome: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 150],
          msg: "O nome tem que ter entre 3 a 150 caracteres."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "O e-mail deve ser um endereço de e-mail válido.",
        },
      }
    },
    senha: DataTypes.STRING,
    cursoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};