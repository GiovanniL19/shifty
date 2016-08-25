import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  identification: 'GiovanniLenguito',
  password: '123',
  loginAttempt: false,
  message: '',
  loginImage: 'https://static.pexels.com/photos/110143/pexels-photo-110143-large.jpeg',
  
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
