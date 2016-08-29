import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'Days Off');
      
      controller.get('application').clearAction();
      controller.set('application.action.add', true);
      controller.set('application.action.calendarView', true);
      controller.calculateDaysOff();
      controller.set('application.showBack', false);
    }else{
      controller.transitionToRoute('login');
    }
  }
});
