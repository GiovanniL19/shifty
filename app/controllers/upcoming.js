import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  
  calendar: [],
  calendarDays: [],
  
  shift: null,
  
  actions: {
    select: function(day){
      if(day === this.get('shift')){
        this.set('shift', null);
      }else{
        this.set('shift', day.get('shift'));
      }
    },
    selectMonth: function(month){
      this.get('application.month', month);
      this.get('application').calculateShifts(month, this.get('application.year'), this.get('model'), this);
    },
    
    selectYear: function(year){
      this.get('application.year', parseInt(year));
      this.get('application').calculateShifts(this.get('application.month'), parseInt(year), this.get('model'), this);
    },
    
    removeShift: function(shift){
      let controller = this;
      if(confirm('Are you sure you want to remove this shift?')){
          
        
        var card = document.getElementById(shift.get('id'));
        card.className += " fadeOutRight";
          
        setTimeout(function(){
          controller.get('application.user.shifts').removeObject(shift);
          controller.get('application.user').save().then(function(){
            $('#'+shift.get('id')+'').remove();
            shift.destroyRecord().then(function(){
              controller.set('application.message', 'Shift Removed');
            });
          });
        },1000);
      }
    }
  }
});
