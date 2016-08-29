import Ember from 'ember';

export default Ember.Route.extend({
  activate: function(){
    let controller = this.controllerFor('upcoming');
    
    controller.set('application.loading', true);
    this.store.query('shift', {showUpcoming: 'true', user: controller.get('application.user.id')}).then(function(shifts){
      controller.set('model', shifts.sortBy('dateTimeStamp'));
      controller.set('application.loading', false);
      
      controller.get('application').calculateShifts(controller.get('application.month.value'), controller.get('application.year'), controller.get('model'), controller);
    });
  },
  setupController: function(controller) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'Coming Up');
      
      
      controller.set('application.year', new Date().getFullYear());
      controller.set('application.month', Ember.Object.create({label: moment(new Date()).format('MMMM'), value: parseInt(moment(new Date()).format('M')) - 1}));
      
      controller.get('application').clearAction();
      controller.set('application.action.add', true);
      controller.set('application.action.calendarView', true);
      controller.set('application.showBack', true);
    }else{
      controller.transitionToRoute('login');
    }
  }
});
