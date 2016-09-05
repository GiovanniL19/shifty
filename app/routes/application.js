import Ember from 'ember';

export default Ember.Route.extend({
  activate: function(){
    let controller =  this.controllerFor('application');
    controller.getUser();
    
    setInterval(function(){
      var online = navigator.onLine;
      if(!online){
        controller.set('isOffline', true);
      }else{
        if(controller.get('isOffline') === true){
          location.reload();
          controller.set('isOffline', false);
        }
      }
    }, 3000);
    this._super();
    window.scrollTo(0,0);
  },
  setupController: function(controller){
    if(!controller.get('session.isAuthenticated')){
      controller.transitionToRoute('login');
    }else{
      controller.transitionToRoute('overview');
      controller.getPastAndNextYears();
      
      let addShiftController = this.controllerFor('add-shift');
      addShiftController.getPastAndNextYears();
    }   
  }  
});
