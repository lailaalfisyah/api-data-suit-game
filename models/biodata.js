'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  class Biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Biodata.belongsTo(models.Role);
      // models.Role.hasMany(Biodata);

      // NOTE:
      // relasi tabel yang didefinisikan di sini akan memanggil kolom foreign key dari tabel referensi secara otomatis
      // jika kolom foreign key sudah dipilih secara manual, maka tidak perlu didefinisikan di sini lagi karena pemanggilan kolom tersebut akan menjadi double dan muncul error
    }

    static #encrypt = password => bcrypt.hashSync(password, 10)

    static register = ({ fullName, gender, email, username, password }, roleID = 2) => {
      const encryptedPassword = this.#encrypt(password)
      return this.create({
        fullName,
        gender,
        email,
        username,
        password: encryptedPassword,
        roleID
      })
    }

    checkPassword = password => bcrypt.compareSync(password, this.password)

    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username
      }
      const secret = 'Microservice App for Code Challenge 7'
      const token = jwt.sign(payload, secret)

      return token
    }

    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({
          where: { username }
        })
        const isPasswordValid = user.checkPassword(password)

        if(!user) return Promise.reject('User not found!')
        if(!isPasswordValid) return Promise.reject('Wrong password!')
        
        return Promise.resolve(user)
      } catch(err) {
        return Promise.reject(err)
      }
    }
  };
  
  Biodata.init({
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    roleID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Biodata',
  });
  return Biodata;
};