import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  sideMenu: Ember.inject.service(),
  
  showNav: false,
  message: '',
  title: 'Overview',
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
      this.get("sideMenu").close();
      this.transitionToRoute('login');
    }
  }
});
