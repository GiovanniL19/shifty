import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  identification: '',
  password: '',
  message: '',
  loginImage: 'https://static.pexels.com/photos/110143/pexels-photo-110143-large.jpeg',
  isLogin: true,
  choose: true,
  newUser: null,
  newPassword: '',
  cNewPassword: '',
  //ip: 'localhost',
  ip: '52.89.48.249',
  resetPassword: false,
  resetEmail: '',
 /* imageGenerator: function(){
    let controller = this;
    
		$.ajax({
			url: 'http://api.pexels.com/v1/search?query=work&per_page=15&page=1',
			type: 'GET',
      headers: { "Authorization": "563492ad6f91700001000001ec52f31e44ae4cc85bcff65039983df1" },
			accepts: 'application/json',
			success: function(data) {
        let number = Math.floor(Math.random() * 10) + 1;
        controller.set('loginImage', data.photos[number].src.large);
			},
			error: function(err) {
				console.log(err);
			}
		});
    
  },*/
  
  actions: {
    sendPassword: function(){
      let controller = this;
      Ember.$.ajax({
        url: 'http://'+controller.get('ip')+':3002/resetPassword?email=' + this.get('resetEmail'),
        type: 'GET',
        success: function(data) {
          if (data == true) {
            controller.set('resetPassword', false);
            controller.set('application.message', 'A new password has been sent to your inbox');
          }else{
            controller.set('application.message', 'There was an error, please try again later');
          }
        },
        error: function(err){
          controller.set('application.message', 'There was an error, please try again later');
        }
      });
    },
    forgotPassword: function(){
      this.set('resetPassword', true);
    },
    goTo: function(option){
      this.set('choose', false);
      if(option === 'login'){
        this.set('isLogin', true);
      }else if(option === 'register'){
        this.set('isLogin', false);
        var newUser = this.store.createRecord('user', {
          identity: this.store.createFragment('user-identity'),
          secure: this.store.createFragment('user-secure'),
        });
        
        this.set('newUser', newUser);
      }else{
        this.set('choose', true);
      }
    },
    register: function(){
      var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      let controller = this;
      if(this.get('newUser.secure.username') !== '' && this.get('newUser.identity.email') !== '' && this.get('newPassword') !== '' && this.get('cNewPassword') !== ''){
        if(this.get('newUser.identity.email').search(emailRegEx) !== -1){
          if(this.get('newPassword.length') >= 8){
            if(this.get('newPassword') === this.get('cNewPassword')){
              
              Ember.$.ajax({
                url: 'http://'+controller.get('ip')+':3002/check?email=' + this.get('newUser.identity.email'),
                type: 'GET',
                success: function(data) {
                  if (data == true) {
                    controller.set('application.message', 'Email already exists, please use another');
                  } else {
                    Ember.$.ajax({
                      url: 'http://'+controller.get('ip')+':3002/check?username=' + controller.get('newUser.secure.username'),
                      type: 'GET',
                      success: function(data) {
                        if (data == true) {
                          controller.set('application.message', 'Username already exists, please choose another');
                        } else {
                          let date = Date.now();
                          var user = controller.get('newUser');
                          user.set('dateCreated', date);
                          user.set('dateModified', date);
                          var md5Password = md5('j*(XY@^T%&!F%I)' + controller.get('cNewPassword') + 'juxhUGBG@^&DF(A)');
        
                          user.set('secure.salt', md5Password);
        
                          user.save().then(function(){
                            controller.set('isLogin', true);
                            controller.set('choose', true);
                            var credentials = {
                              identification: user.get('secure.username'),
                              password: md5Password
                            };

                            var authenticator = 'authenticator:token';

                            controller.get('session').authenticate(authenticator, credentials).then(() => {
                              controller.transitionToRoute('overview');
                            }, (err) => {
                              console.log(err);
                              controller.set('application.message', 'There was an error, please login');
                            });
                          });
                        }
                      },
                      error: function() {
                        controller.set('application.message', 'There was an error, please try again later');
                      }
                    });
                  }
                },
                error: function() {
                  controller.set('application.message', 'There was an error, please try again later');
                }
              });
            }else{
              this.set('application.message', 'Passwords do not match');
            }
          }else{
            this.set('application.message', 'Password must be 8 or more characters long');
          }
        }else{
          this.set('application.message', 'Incorrect email format');
        }
      }else{
        this.set('application.message', 'Please enter all required fields');
      }
    },
    authenticate: function() {
      let controller = this;

      var md5Password = md5('j*(XY@^T%&!F%I)' + this.get('password') + 'juxhUGBG@^&DF(A)');

      var credentials = {
        identification: this.get('identification'),
        password: md5Password
      };

      var authenticator = 'authenticator:token';

      this.get('session').authenticate(authenticator, credentials).then(() => {
        controller.set('application.message', '');
        controller.transitionToRoute('overview');
      }, (err) => {
        console.log(err);
        controller.set('application.message', 'Incorrect Login Details');
      });
    }
  }
});
