import DS from 'ember-data';

export default DS.Model.extend({
  rev: DS.attr('string'),
  type: DS.attr('string', {defaultValue: 'shift'}),
  inputDate: DS.attr('number'),
  reference: DS.attr('string'),
  day: DS.attr('boolean'),
  dateTimeStamp: DS.attr('number'),
  dateText: DS.attr('string'),
  startTime: DS.attr('string'),
  endTime: DS.attr('string'),
  user: DS.belongsTo('user', {async: true}),
  colour: DS.attr('string'),
  dateFormatted: function(){
    return moment.unix(this.get('dateTimeStamp')).format('MMMM Do YYYY');
  }.property('dateTimeStamp'),
  isDone: function(){
    let now = Math.floor(Date.now() / 1000);
    
    if(this.get('dateTimeStamp') < now){
      return true;
    }else{
      return false;
    }
    
  }.property('dateTimeStamp'),
  upcoming: function(){
    let now = Math.floor(Date.now() / 1000);
    
    if(this.get('dateTimeStamp') > now && this.get('dateTimeStamp') < (now + (86400 * 7))){
      return true;
    }else{
      return false;
    }
  }.property('dateTimeStamp')
});
