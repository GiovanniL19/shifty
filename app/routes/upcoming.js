import Ember from 'ember';

export default Ember.Route.extend({
  activate: function(){
    let controller = this.controllerFor('upcoming');
    this.store.query('shift', {showUpcoming: 'true', user: controller.get('application.user.id')}).then(function(shifts){
      controller.set('model', shifts.sortBy('dateTimeStamp'));
    });
  },
  setupController: function(controller) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'Coming Up');
      controller.set('application.showNav', true);
      
      controller.get('application').clearAction();
      controller.set('application.action.add', true);
      
      controller.set('application.showBack', true);
    }else{
      controller.transitionToRoute('login');
    }
  }
});
