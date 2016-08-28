import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  image: DS.attr('string'),
  
  fullName: function(){
    if(this.get('firstName') && this.get('lastName')){
      return this.get('firstName') + " " + this.get('lastName');
    }else{
      return 'Hello User';
    }
  }.property('firstName','lastName')
});