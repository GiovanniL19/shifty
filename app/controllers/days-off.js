import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  
  holidays: [],
  calendar: [],
  calendarDays: [],
  
  

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
    
    var days = this.get('application').getDaysInMonthFormatted(parseInt(chosenMonth), year);
    
    var calendarDays = [];
    
    var unFormattedDays = this.get('application').getDaysInMonth(parseInt(chosenMonth), year);
    unFormattedDays.forEach(function(day){
      if(calendarDays.length !== 7){
        calendarDays.push(moment(day).format('dd'));
      }
      
      var object = Ember.Object.create({
          day: moment(day).format('DD/MM/YYYY'), 
          dayFormatted: moment(day).format('DD'), 
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
            if (date.get('day') === moment.unix(timeStamp).format('DD/MM/YYYY')) {
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
