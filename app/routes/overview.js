import Ember from 'ember';

export default Ember.Route.extend({
  activate: function(){
    let controller = this.controllerFor('overview');
    controller.getWeekData();
  },
  setupController: function(controller) {
    
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
