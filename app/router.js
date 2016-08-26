import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('navigation');
  this.route('overview');
  this.route('add-shift');
  this.route('history');
  this.route('upcoming');
  this.route('settings');
});

export default Router;
