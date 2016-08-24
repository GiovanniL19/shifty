import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'Add Shift');
      
      controller.set('application.showNav', true);
      
      controller.get('application').clearAction();
      controller.set('application.action.nextAddShift', true);
      
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
