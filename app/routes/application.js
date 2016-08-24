import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    controller.set('userID', controller.get('session.session.authenticated.userId'));
    
    if(!controller.get('session.isAuthenticated')){
      controller.transitionToRoute('login');
    }else{
      controller.transitionToRoute('overview');
    }   
  }  
});
