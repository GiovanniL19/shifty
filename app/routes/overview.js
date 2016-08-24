import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'Overview');
      controller.set('application.showNav', true);
      
      controller.get('application').clearAction();
      controller.set('application.action.add', true);
      
      controller.set('application.showBack', false);
    }else{
      controller.transitionToRoute('login');
    }
  }
});
