'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Area);
    }
  }
  Curso.init({
    sigla: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 6],
          msg: "A sigla tem que ter entre 3 a 6 caracteres."
        }
      }
    },
    nome:{
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 50],
          msg: "O nome tem que ter entre 3 a 50 caracteres."
        }
      }
    },
    descricao: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [5, 150],
          msg: "A descrição tem que ter entre 5 a 150 caracteres."
        }
      }
    },
    areaId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: "Precisa ser um número inteiro"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Curso',
  });
  return Curso;
};