//Data API
import DS from "ember-data";
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:token',
	host: 'http://192.168.0.21:3002'
  //host: 'http://52.89.48.249:3002'
});
