import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'Add Shift');
      
      controller.set('application.showNav', true);
      
      controller.get('application').clearAction();
      controller.set('application.action.save', true);
      
      var shift = controller.store.createRecord('shift');
      shift.set('dateTime', new Date());
      controller.set('model', shift);
      
      
    }else{
      controller.transitionToRoute('login');
    }
  }
});
