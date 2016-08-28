import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  username: DS.attr('string'),
  salt: DS.attr('string'),
  tempPass: DS.attr('string', {defaultValue: false})
});
