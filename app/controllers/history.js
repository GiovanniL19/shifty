import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  
  actions:{
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
