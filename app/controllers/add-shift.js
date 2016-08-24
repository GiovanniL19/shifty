import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  dates: [],
  sectionOne: true,
  
  nextAddShift: function(){
    this.set('sectionOne', false);
  },
});
