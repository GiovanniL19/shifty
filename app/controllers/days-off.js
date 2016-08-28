import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  
  months: [
    {label: 'Januray', value: 1},
    {label: 'Febuary', value: 2},
    {label: 'March', value: 3},
    {label: 'April', value: 4},
    {label: 'May', value: 5},
    {label: 'Jun', value: 6},
    {label: 'July', value: 7},
    {label: 'August', value: 8},
    {label: 'September', value: 9},
    {label: 'October', value: 10},
    {label: 'November', value: 11},
    {label: 'December', value: 12},
    
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
    let chosenMonth = month;
    if(chosenMonth == undefined){
      chosenMonth = 1;
    }
    
    console.log('Month ' + parseInt(chosenMonth));
    var days = this.getDaysInMonth(parseInt(chosenMonth), year);
    
    this.store.query('shift', {userID: user.get('id'), month: parseInt(chosenMonth), year: year}).then(function(shifts){
      if(shifts.get('length') === 0){
        controller.set('holidays', days);
      }else{
        async.each(shifts, function(shift, nextShift){
          var date = shift.get('dateTimeStamp');
          
          async.eachSeries(days, function(day, nextDay){
            var i = days.indexOf(day);
            if (moment(days[i]).format('DD/MM/YYYY') === moment.unix(date).format('DD/MM/YYYY')) {
              console.log('Splicing');
              days.splice(i, 1);
            }
            nextDay();
          }), function done(){
            nextShift();
          };
        }, function done(){
          controller.set('holidays', days);
          console.log(days);
        });
      }
    });
    
  }, 
  actions: {
    selectMonth: function(month){
      this.calculateDaysOff(month);
    }
    
  }
});
