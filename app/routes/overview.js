import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    this._super();
    window.scrollTo(0,0);
  },
  setupController: function(controller) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'Overview');
      
      controller.get('application').clearAction();
      controller.set('application.action.add', true);
      controller.getWeekData();
      controller.set('application.showBack', false);
    }else{
      controller.transitionToRoute('login');
    }
  }
});
