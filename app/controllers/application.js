import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  sideMenu: Ember.inject.service(),
  addShift: Ember.inject.controller(),
  
  user: null,
  userID: '',
  showNav: false,
  message: '',
  showBack: false,
  title: 'Overview',
  action: {
    add: true,
    nextAddShift: false,
  },
  loading: false,
  
  isOverview: function(){
    let path = this.get('currentPath');
    if(path === 'overview'){
      return true;
    }else{
      return false;
    }
  }.property('currentPath'),
  
  isHistory: function(){
    let path = this.get('currentPath');
    if(path === 'history'){
      return true;
    }else{
      return false;
    }
  }.property('currentPath'),
  
  isUpcoming: function(){
    let path = this.get('currentPath');
    if(path === 'upcoming'){
      return true;
    }else{
      return false;
    }
  }.property('currentPath'),
  
  isSettings: function(){
    let path = this.get('currentPath');
    if(path === 'settings'){
      return true;
    }else{
      return false;
    }
  }.property('currentPath'),
  
  isAddShift: function(){
    let path = this.get('currentPath');
    if(path === 'add-shift'){
      return true;
    }else{
      return false;
    }
  }.property('currentPath'),
  clearAction: function(){
    this.set('action', {
      add: false,
      nextAddShift: false
    });
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
    this.set('userID', this.get('session.session.authenticated.userId'));
    let controller = this;
    if(this.get('userID')){
      this.set('loading', true);
      this.store.find('user', this.get('userID')).then(function(user){
        controller.set('loading', false);
        controller.set('user', user);
      });
    }
  },
  actions: {
    invalidateSession: function(){
      this.get('session').invalidate();
      this.get("sideMenu").close();
      this.transitionToRoute('login');
    },
    saveShift: function(type){
      if(type === 'next'){
        this.get('addShift').nextAddShift();
      }
    }
  }
});
