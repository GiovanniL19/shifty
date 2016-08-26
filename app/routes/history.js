import Ember from 'ember';

export default Ember.Route.extend({
  activate: function(){
    let controller = this.controllerFor('history');
    controller.set('application.loading', true);
    this.store.query('shift', {showHistory: 'true', user: controller.get('application.user.id')}).then(function(shifts){
      controller.set('model', shifts.sortBy('dateTimeStamp').reverse());
      controller.set('application.loading', false);
    });
  },
  setupController: function(controller) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'History');
      
      
      controller.get('application').clearAction();
      controller.set('application.action.add', true);
      
      controller.set('application.showBack', true);
    }else{
      controller.transitionToRoute('login');
    }
  }
});
