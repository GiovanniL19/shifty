import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  sideMenu: Ember.inject.service(),
    
  user: null,
  userID: '',
  showNav: false,
  message: '',
  title: 'Overview',
  action: {
    add: true
  },
  messageObserver: function(){
    let controller = this;
    if(this.get('message')){
      setTimeout(function(){
        controller.set('message', '');
      }, 4000);
    }
  }.observes('message'),
  
  getUser: function(){
    let controller = this;
    if(this.get('userID')){
      this.store.find('user', this.get('userID')).then(function(user){
        controller.set('user', user);
      });
    }
  }.observes('userID'),
  actions: {
    invalidateSession: function(){
      this.get('session').invalidate();
      this.get("sideMenu").close();
      this.transitionToRoute('login');
    }
  }
});
