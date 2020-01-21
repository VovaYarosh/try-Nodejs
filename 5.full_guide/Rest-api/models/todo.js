const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

//першим параметром йде назви моделі яка задається
//другим набір параметрів...автоінкремент збільшує поле на одиниці
//тип вказується з бібліотеки секвалайз
const todo = sequelize.define('Todo',{
    id:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    done:{
        type:Sequelize.BOOLEAN,
        allowNull: false
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    // date:{
    //     type:Sequelize.DATE,
    //     allowNull: false
    // }
})

module.exports = todo