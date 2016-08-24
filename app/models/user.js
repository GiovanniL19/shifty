import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  type: DS.attr('string', {defaultValue: 'user'}),
  dateCreated: DS.attr('string'),
  dateModified: DS.attr('string'),
  identity: MF.fragment('user-identity'),
  secure: MF.fragment('user-secure'),
	isAdmin: function(){
		if(this.get('permission') === 'Admin'){
			return true;
		}else{
			return false;
		}
	}.property('permission'),
  
  shifts: DS.hasMany('shift', {async: true, defaultValue: []})
});
