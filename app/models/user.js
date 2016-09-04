import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  rev: DS.attr('string'),
  type: DS.attr('string', {defaultValue: 'user'}),
  dateCreated: DS.attr('string'),
  dateModified: DS.attr('string'),
  identity: MF.fragment('user-identity'),
  secure: MF.fragment('user-secure'),
  shifts: DS.hasMany('shift', {async: true, defaultValue: []}),
  presets: DS.hasMany('preset', {async: true, defaultValue: []}),
  newUser: DS.attr('string', {defaultValue: true}),
  calendarView: DS.attr('boolean')
});
