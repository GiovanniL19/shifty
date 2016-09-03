import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  newPassword: '',
  profilePicture: null,
  tempPassSet: function(){
    if(this.get('application.user.secure.tempPass') === "true"){
      return true;
    }else{
      return false;
    }
  }.property('application.user'),
  save: function(){
    var user = this.get('application.user');
    
    let controller  = this;
    let logout = false;  
    
    if(this.get('newPassword')){
      var md5Password = md5('j*(XY@^T%&!F%I)' + this.get('newPassword') + 'juxhUGBG@^&DF(A)');
      user.set('secure.salt', md5Password);
      user.set('secure.tempPass', '');
      logout = true;
    }
    
    user.save().then(function(){
      controller.set('application.message', 'Update Successful');
      if(logout){
        controller.get('session').invalidate();
        controller.get("application.sideMenu").close();
        location.reload();
      }
    });
  },
	uplodPicture: function(){
    var controller = this;
  
    try {
      if(this.get('imageSize') > 3000000){
        alert('Image size to large, please do not exceed 3MB');
      }else{
        if(this.get('imageType') === 'image/jpeg' || this.get('imageType') === 'image/jpg' || this.get('imageType') === 'image/png'){
          controller.set('application.user.identity.image', this.get('profilePicture'));
        }else{
          alert('Please make sure you upload a image (.JPG, .JPEG, .PNG)');
        }
      }
    } catch(err){
      console.log('No image selected');
    }

  }.observes('profilePicture'),
  actions: {
    changeViewSetting: function(option){
      this.set('application.user.calendarView', option);
    }
  }
});
