import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service(),
  identification: 'GiovanniLenguito',
  password: '123',
  loginAttempt: false,
  message: '',

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
        controller.set('application.message', 'Incorrect Login Details');
      });
    }
  }
});
