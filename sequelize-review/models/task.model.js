'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Make sure you have `postgres` running!

var Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  due: Sequelize.DATE
}, {
  //---------VVVV---------  your code below  ---------VVV----------
  getterMethods : {
    timeRemaining: function(){
      if (!this.due) return Infinity
      return (this.due - Date.now())
     },
    overdue: function(){
      return (Date.now() > this.due && !this.complete)
     }
  },
  instanceMethods: {
    addChild: function(childTask){
      childTask.parentId = this.id
      return Task.create(childTask)
      .then(child => child)
      .catch(console.err)
    },
    getChildren: function(){
      return Task.findAll({
        where: { parentId: this.id }
      })
      .then(allChildren => allChildren)
      .catch(console.err)
    },
    getSiblings: function(){
      return Task.findAll({
        where: {
          parentId: this.parentId,
          id: { $ne: this.id }
        }
      })
      .then(allSiblings => allSiblings)
      .catch(console.err)
    }
  },
  classMethods: {
    clearCompleted: function(){
      return this.destroy({
        where: { complete: true } 
      })
      .then(console.log('deleting completed'))
      .catch(console.err)
    },
    completeAll: function(){ 
      return this.update(
          { complete: true },
          { where: { complete: false } }
      )
      .then(console.log('marked task complete'))
      .catch(console.err)
    }
  },
  hooks: {
    beforeDestroy: function(parent){
     // console.log('logging out this', parent)
      parent.getChildren()
      .then(children => {
        children.forEach(child => {
          child.destroy()
          .then(console.log('deleting child'))
          .catch(console.err)
        })
      })
      .catch(console.err)
    }
  }
  //---------^^^---------  your code above  ---------^^^----------
});

Task.belongsTo(Task, {as: 'parent'});





module.exports = Task;

