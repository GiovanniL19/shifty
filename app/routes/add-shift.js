import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'Add Shifts');
      
      
      
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
