import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    this._super();
    window.scrollTo(0,0);
  },
  
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
