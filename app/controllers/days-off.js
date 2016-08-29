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
  calendar: [],
  calendarDays: [],
  
  occurrences: Ember.A(),
  
  getDaysInMonthFormatted: function(month, year) {
    var date = new Date(year, month, 1);
     var days = [];
     while (date.getMonth() === month) {
        days.push(moment(new Date(date)).format('DD/MM/YYYY'));
        date.setDate(date.getDate() + 1);
     }
     return days;
  },
  getDaysInMonth: function(month, year) {
    var date = new Date(year, month, 1);
     var days = [];
     while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
     }
     return days;
  },

  calculateDaysOff: function(month){
    let controller = this;
    
    this.set('calendarDays', []);
    this.set('calendar', []);
        
    let year = new Date().getFullYear();
    var user = this.get('application.user');
    
    
    var chosenMonth = 0;
    
    if(month !== undefined){
      chosenMonth = parseInt(month); 
    }    
    
    var days = this.getDaysInMonthFormatted(parseInt(chosenMonth), year);
    
    var calendarDays = [];
    
    var unFormattedDays = this.getDaysInMonth(parseInt(chosenMonth), year);
    unFormattedDays.forEach(function(day){
      if(calendarDays.length !== 7){
        calendarDays.push(moment(day).format('dd'));
      }
      
      var object = Ember.Object.create({
         day: moment(day).format('DD'), 
          isActive: true
       });
      controller.get('calendar').push(object);
    });
    
    this.set('calendarDays', calendarDays);
    chosenMonth += 1;
    this.store.query('shift', {userID: user.get('id'), month: parseInt(chosenMonth), year: year}).then(function(shifts){
      if(shifts.get('length') === 0){
        controller.set('holidays', days);
      }else{
        shifts.forEach(function(shift){
          var timeStamp = shift.get('dateTimeStamp');
          
          async.eachSeries(controller.get('calendar'), function(date, nextDay){
            debugger;
            if (date.get('day') === moment.unix(timeStamp).format('DD')) {
              date.set('isActive', false);
            }
            nextDay();
          }), function done(){
            nextShift();
          };
        });
        controller.set('holidays', days);
      }
    });
    
  }, 
  actions: {
    selectMonth: function(month){
      this.calculateDaysOff(month);
    }
    
  }
});
