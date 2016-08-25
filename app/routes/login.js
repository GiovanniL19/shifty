import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    controller.set('application.showNav', false);
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
