import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  
  historyData: [],
  actions:{
    removeShift: function(shift){
      let controller = this;
      if(confirm('Are you sure you want to remove this shift?')){
        this.get('application.user.shifts').removeObject(shift);
        this.get('application.user').save().then(function(){
          shift.destroyRecord().then(function(){
            controller.set('application.message', 'Shift Removed');
          });
        });
      }
    }
  }
});
