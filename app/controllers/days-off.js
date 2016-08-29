import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  
  months: [
    {label: 'Januray', value: 0},
    {label: 'Febuary', value: 1},
    {label: 'March', value: 2},
    {label: 'April', value: 3},
    {label: 'May', value: 4},
    {label: 'June', value: 5},
    {label: 'July', value: 6},
    {label: 'August', value: 7},
    {label: 'September', value: 8},
    {label: 'October', value: 9},
    {label: 'November', value: 10},
    {label: 'December', value: 11},
    
  ],
  holidays: [],
  getDaysInMonth: function(month, year) {
    var date = new Date(year, month, 1);
     var days = [];
     while (date.getMonth() === month) {
        days.push(moment(new Date(date)).format('DD/MM/YYYY'));
        date.setDate(date.getDate() + 1);
     }
     return days;
  },

  calculateDaysOff: function(month){
    let controller = this;
    
    let year = new Date().getFullYear();
    var user = this.get('application.user');
    
    
    var chosenMonth = 0;
    
    if(month !== undefined){
      chosenMonth = parseInt(month); 
    }    
    
    var days = this.getDaysInMonth(parseInt(chosenMonth), year);
    
    chosenMonth += 1;
    this.store.query('shift', {userID: user.get('id'), month: parseInt(chosenMonth), year: year}).then(function(shifts){
      if(shifts.get('length') === 0){
        controller.set('holidays', days);
      }else{
        shifts.forEach(function(shift){
          var date = shift.get('dateTimeStamp');
          
          async.eachSeries(days, function(day, nextDay){
            var i = days.indexOf(day);
            if (days[i] === moment.unix(date).format('DD/MM/YYYY')) {
              days.splice(i, 1);
              console.log('splice');
            }
            nextDay();
          }), function done(){
            nextShift();
          };
        });
        controller.set('holidays', days);
        console.log(days);
      }
    });
    
  }, 
  actions: {
    selectMonth: function(month){
      this.calculateDaysOff(month);
    }
    
  }
});
