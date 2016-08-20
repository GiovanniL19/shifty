import Ember from 'ember';

export default Ember.Controller.extend({
	application: Ember.inject.controller(),
	session: Ember.inject.service(),
	identification: '',
	password: '',
	loginAttempt: false,
	message: '',
	
	authenticateObserver: function(){
		let controller = this;
		this.set('loginAttempt', true);
		if(this.get('session.isAuthenticated')){
			controller.transitionToRoute('main');
		}else{
			this.set('application.message', 'Incorrect Login Details');
		}
	}.observes('session.isAuthenticated'),
	actions:{
		authenticate: function() {
			/*var md5Password = md5('j*(XY@^T%&!F%I)' + this.get('password') + 'juxhUGBG@^&DF(A)');
			
      var credentials = {
				identification: this.get('identification'),
				password: md5Password
			};
			
      var authenticator = 'authenticator:token';
			this.authenticateObserver();
      this.get('session').authenticate(authenticator, credentials);*/
      this.transitionToRoute('overview')
    }
	}
});
