import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  username: DS.attr('string'),
  salt: DS.attr('string')
});
