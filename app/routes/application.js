import Ember from 'ember';

export default Ember.Route.extend({
  activate: function(){
    let controller =  this.controllerFor('application');
    controller.getUser();
    
    var online = navigator.onLine;
    if(!online){
      controller.set('isOffline');
    }
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
