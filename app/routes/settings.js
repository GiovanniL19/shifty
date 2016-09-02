import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    this._super();
    window.scrollTo(0,0);
  },
  deactivate: function(){
    let controller = this.controllerFor('settings');
    controller.set('newPassword', '');
  },
  setupController: function(controller) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'Settings');
      
      controller.get('application').clearAction();
      controller.set('application.action.saveSettings', true);
      
      controller.set('application.showBack', false);
    }else{
      controller.transitionToRoute('login');
    }
  }
});
