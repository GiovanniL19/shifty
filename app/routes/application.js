import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    controller.set('userID', controller.get('session.session.authenticated.userId'));
    controller.transitionToRoute('login');
  }  
});
