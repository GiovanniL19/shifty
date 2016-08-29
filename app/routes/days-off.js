import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'Days Off');
      
      controller.set('application.year', new Date().getFullYear());
      controller.set('application.month', Ember.Object.create({label: moment(new Date()).format('MMMM'), value: parseInt(moment(new Date()).format('M')) - 1}));
      controller.calculateDaysOff(controller.get('application.month.value'), controller.get('application.year'));
      
      controller.get('application').clearAction();
      controller.set('application.action.add', true);
      controller.set('application.action.calendarView', true);
      controller.set('application.showBack', false);
    }else{
      controller.transitionToRoute('login');
    }
  }
});
