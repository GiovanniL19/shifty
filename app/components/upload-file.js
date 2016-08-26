import Ember from 'ember';

export default Ember.Component.extend({
tagName: 'input',
  attributeBindings: ['name', 'type'],
  type: 'file',
  file: null,
  fileSize: 0,
  fileType: null,
  change: function (e) {
    var reader = new FileReader(), 
    that = this;
    reader.onload = function (e) {
        var fileToUpload = e.target.result;
        Ember.run(function() {
            that.set('file', fileToUpload);
        });
    };
    that.set('fileType', e.target.files[0].type);
    that.set('fileSize', e.target.files[0].size);
    return reader.readAsDataURL(e.target.files[0]); 
  }
});
