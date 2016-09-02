import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  sideMenu: Ember.inject.service(),
  addShift: Ember.inject.controller(),
  settings: Ember.inject.controller(),
  
  isOffline: false,
  user: null,
  userID: '',
  message: '',
  showBack: false,
  title: 'Overview',
  action: {
    add: true,
    nextAddShift: false,
    saveSettings: false,
    calendarView: false,
    addPreset: false
  },
  loading: false,
  percentageDaysThisMonth: 0,
  percentageNightsThisMonth: 0,
  
  cardView: true,

  months: [
    {label: 'January', value: 0},
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
  years: [],
  year: 0,
  month: 0,
  getPastAndNextYears: function(){
    var years = [];
    for(var i = 4; i >= 0; i--){
      var date = new Date();
      date.setFullYear(date.getFullYear() - i); 
      years.push(moment(date).format('YYYY'));
    }
    
    for(var i = 1; i <= 4; i++){
      var date = new Date();
      date.setFullYear(date.getFullYear() + i); 
      years.push(moment(date).format('YYYY'));
    }
    this.set('years', years);
  },
  
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
  
  
  calculateShifts: function(month, year, shifts, controller){
    
    controller.set('calendarDays', []);
    controller.set('calendar', []);
    
    var user = this.get('user');
    var chosenMonth = month;
    var days = this.getDaysInMonthFormatted(parseInt(chosenMonth), year);
    
    var calendarDays = [];
    
    var unFormattedDays = this.getDaysInMonth(parseInt(chosenMonth), year);
    unFormattedDays.forEach(function(day){
      if(calendarDays.length !== 7){
        calendarDays.push(moment(day).format('dd'));
      }
      
      var object = Ember.Object.create({
          day: moment(day).format('DD/MM/YYYY'), 
          dayFormatted: moment(day).format('DD'), 
          isActive: false
       });
      controller.get('calendar').push(object);
    });
    
    controller.set('calendarDays', calendarDays);
    chosenMonth += 1;
    
    shifts.forEach(function(shift){
      var timeStamp = shift.get('dateTimeStamp');
      
      async.eachSeries(controller.get('calendar'), function(date, nextDay){
        if (date.get('day') === moment.unix(timeStamp).format('DD/MM/YYYY')) {
          date.set('isActive', true);
        }
        nextDay();
      }), function done(){
        nextShift();
      };
    });
    
  }, 
  
  
  generatePercentages: function(){
    let controller = this;
    var userID = this.get('user.id');
    var totalDaysWorked = [];
    
    this.store.query('shift', {userID: userID, month: parseInt(moment(new Date()).format('M')), year: moment(new Date()).format('YYYY')}).then(function(shifts){      
      shifts.forEach(function(shift){
        if(shift.get('day')){
          if(totalDaysWorked.indexOf(shift.get('dateText')) === -1){
            totalDaysWorked.push(shift.get('dateText'));
          }
        }
      });
      
      var days = controller.getDaysInMonth(parseInt(moment(new Date()).format('M')), moment(new Date()).format('YYYY'));
      
      var daysWorked = totalDaysWorked.length;
      var totalDays = days.length;
      var percentage = Math.floor((parseInt(daysWorked) / parseInt(totalDays)) * 100);

      controller.set('percentageDaysThisMonth', percentage);
      
      totalDaysWorked = [];
      
      shifts.forEach(function(shift){
        if(!shift.get('day')){
          if(totalDaysWorked.indexOf(shift.get('dateText')) === -1){
            totalDaysWorked.push(shift.get('dateText'));
          }
        }
      });
      
      var daysWorked = totalDaysWorked.length;
      var totalDays = days.length;
      var percentage = Math.floor((parseInt(daysWorked) / parseInt(totalDays)) * 100);

      controller.set('percentageNightsThisMonth', percentage);
      
      
    });
  }.observes('user.shifts.length'),
  
  isLoginPage: function(){
    let path = this.get('currentPath');
    if(path === 'login'){
      return true;
    }else{
      return false;
    }
  }.property('currentPath'),
  isOverview: function(){
    let path = this.get('currentPath');
    if(path === 'overview'){
      return true;
    }else{
      return false;
    }
  }.property('currentPath'),
  
  isHistory: function(){
    let path = this.get('currentPath');
    if(path === 'history'){
      return true;
    }else{
      return false;
    }
  }.property('currentPath'),
  
  isUpcoming: function(){
    let path = this.get('currentPath');
    if(path === 'upcoming'){
      return true;
    }else{
      return false;
    }
  }.property('currentPath'),
  
  isSettings: function(){
    let path = this.get('currentPath');
    if(path === 'settings'){
      return true;
    }else{
      return false;
    }
  }.property('currentPath'),
  
  isAddShift: function(){
    let path = this.get('currentPath');
    if(path === 'add-shift'){
      return true;
    }else{
      return false;
    }
  }.property('currentPath'),
  clearAction: function(){
    this.set('action', {
      add: false,
      nextAddShift: false,
      saveSettings: false,
      calendarView: false,
      addPreset: false
    });
  },
  
  messageObserver: function(){
    let controller = this;
    if(this.get('message')){
      setTimeout(function(){
        controller.set('message', '');
      }, 4000);
    }
  }.observes('message'),
  
  getUser: function(){
    this.set('userID', this.get('session.session.authenticated.userId'));
    let controller = this;
    if(this.get('userID')){
      this.set('loading', true);
      this.store.find('user', this.get('userID')).then(function(user){
        controller.set('loading', false);
        controller.set('user', user);
        if(user.get('secure.tempPass') === 'true'){
          controller.transitionToRoute('settings');
        }
      });
    }
  },
  actions: {
    toggleAddPresets: function(){
      this.set('settings.newPreset', !this.get('settings.newPreset'));
    },
    toggleView: function(){
      this.set('cardView', !this.get('cardView'));
    },
    invalidateSession: function(){
      this.get('session').invalidate();
      this.get("sideMenu").close();
      this.transitionToRoute('login');
    },
    saveShift: function(type){
      if(type === 'next'){
        this.get('addShift').nextAddShift();
      }
    },
    saveSettings: function(){
      this.get('settings').save();
    }
  }
});
