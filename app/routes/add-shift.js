import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.showNav', true);
    }else{
      controller.transitionToRoute('login');
    }
  }
});
