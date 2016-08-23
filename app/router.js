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
});

export default Router;
