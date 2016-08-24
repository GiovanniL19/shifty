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
      
      //date format: Thu Aug 04 2016 00:00:00 GMT+0100 (BST)
      
      async.eachSeries(dates, function iterator(date, callback) {
        callback();
      }, function done() {
        alert('done');
      });
    }
  }
});
