import Ember from 'ember';

export default Ember.Controller.extend({
  showNav: false,
  message: '',
  messageObserver: function(){
    let controller = this;
    if(this.get('message')){
      setTimeout(function(){
        controller.set('message', '');
      }, 4000);
    }
  }.observes('message')
});
