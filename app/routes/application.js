import Ember from 'ember';

export default Ember.Route.extend({
  activate: function(){
    this.controllerFor('application').getUser();
  },
  setupController: function(controller){
    if(!controller.get('session.isAuthenticated')){
      controller.transitionToRoute('login');
    }else{
      controller.transitionToRoute('overview');
    }   
  }  
});
