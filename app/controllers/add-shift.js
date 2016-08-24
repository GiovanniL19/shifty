import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  dates: [],
  sectionOne: true,
  
  day: true,
  
  nextAddShift: function(){
    this.set('sectionOne', false);
    this.set('application.action.nextAddShift', false);
  },
  
  actions:{
    select: function(type){
      this.set('day', !this.get('day'));
    },
    saveShifts: function(){
      var dates = this.get('dates');
      debugger;
    }
  }
});
