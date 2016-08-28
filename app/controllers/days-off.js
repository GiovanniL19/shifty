import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  
  month: '',
  year: '',
  
  getDaysInMonth: function(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
  
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    
    return days;
    
  }.property(),

  calculateDaysOff: function(){
    var user = this.get('application.user');
    
    var days = this.getDaysInMonth(this.get('month'), this.get('year'));
    
    this.store.find('shift', {userId: user, month: this.get('month'), year: this.get('year')}).then(function(){
      
    });
    
  }
});
