import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr('string', {defaultValue: 'preset'}),
  title: function(){
    return this.get('reference') + " - " + this.get('startTime') + " to " + this.get('endTime') ;
  }.property('reference', 'startTime', 'endTime'),
  reference: DS.attr('string'),
  startTime: DS.attr('string'),
  endTime: DS.attr('string'),
  user: DS.belongsTo('user', {async: true}),
  isDay: DS.attr('boolean'),
  colour: DS.attr('string')
});
