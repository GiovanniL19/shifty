export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    shifts: {
      serialize: 'ids',
      deserialize: 'ids'    
    }
  }
});