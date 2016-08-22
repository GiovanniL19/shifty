import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  showNav: false,
  message: '',
  messageObserver: function(){
    let controller = this;
    if(this.get('message')){
      setTimeout(function(){
        controller.set('message', '');
      }, 4000);
    }
  }.observes('message'),
  actions: {
    invalidateSession: function(){
      this.get('session').invalidate();
      this.transitionToRoute('login');
    }
  }
});
