import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'Add Shifts');
      
      controller.set('year', new Date().getFullYear());
      controller.set('month', Ember.Object.create({label: moment(new Date()).format('MMMM'), value: parseInt(moment(new Date()).format('M')) - 1}));
      controller.calculateShifts(controller.get('month.value'), controller.get('year'));
      
      controller.get('application').clearAction();
      
      controller.set('application.showBack', true);
      
    }else{
      controller.transitionToRoute('login');
    }
  },
  deactivate: function(){
    let controller = this.controllerFor('addShift');
    
    controller.set('sectionOne', true);
    controller.set('dates', []);
  }
});
