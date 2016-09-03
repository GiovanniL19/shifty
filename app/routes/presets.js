import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    this._super();
    window.scrollTo(0,0);
  },
  setupController: function(controller) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'Presets');
      
      controller.get('application').clearAction();
      controller.set('application.action.addPreset', true);
      
      controller.set('application.showBack', true);
    }else{
      controller.transitionToRoute('login');
    }
  }
});
