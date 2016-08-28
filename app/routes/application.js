import Ember from 'ember';

export default Ember.Route.extend({
  activate: function(){
    let controller =  this.controllerFor('application');
    controller.getUser();
    
    var online = navigator.onLine;
    if(!online){
      controller.set('isOffline');
    }
  },
  setupController: function(controller){
    if(!controller.get('session.isAuthenticated')){
      controller.transitionToRoute('login');
    }else{
      controller.transitionToRoute('overview');
    }   
  }  
});
