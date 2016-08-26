import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    
    if(controller.get('session.isAuthenticated')){
      controller.transitionToRoute('overview');
    }
  },
  
  actions: {
    willTransition: function(transition) {
      this.controllerFor('application').getUser();
    }
  }
});
