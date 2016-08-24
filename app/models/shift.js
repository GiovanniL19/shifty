import DS from 'ember-data';

export default DS.Model.extend({
  rev: DS.attr('string'),
  inputDate: DS.attr('number'),
  reference: DS.attr('string'),
  day: DS.attr('boolean'),
  dateTimeStamp: DS.attr('number'),
  dateText: DS.attr('string'),
  startTime: DS.attr('string')
});
