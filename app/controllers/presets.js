import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  
  newPreset: false,
  currentPreset: null,
  
  actions: {
    selectPreset: function(preset){
      this.set('newPreset', true);
      this.set('currentPreset', preset);
      window.scrollTo(0,0);
    },
    cancel: function(){
      this.set('newPreset', false);
      this.set('currentPreset', null);
      window.scrollTo(0,0);
    },
    savePreset: function(){
      let controller = this;
      let object = this.get('currentPreset');
      
      if(object.get('title') && object.get('reference') && object.get('startTime') && object.get('endTime')){
        object.set('user', controller.get('application.user'));
        
        object.save().then(function(preset){
          controller.get('application.user.presets').pushObject(preset);
          controller.get('application.user').save().then(function(){
            controller.set('newPreset', false);
            controller.set('application.message', 'Preset Saved');
          });
        });
      }else{
        this.set('application.message', 'Please fill in all required fields');
      }
    },
  }
});
