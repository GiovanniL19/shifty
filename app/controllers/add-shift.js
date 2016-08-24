import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  dates: [],
  sectionOne: true,
  reference: '',
  day: true,
  startTime: 0,
  endTime: 0 ,
  
  nextAddShift: function(){
    this.set('sectionOne', false);
    this.set('application.action.nextAddShift', false);
  },
  datesListener: function(){
    if(this.get('dates.length') > 0){
      this.set('application.action.nextAddShift', true);
    }else{
      this.set('application.action.nextAddShift', false);
    }
  }.observes('dates'),
  actions:{
    select: function(type){
      this.set('day', !this.get('day'));
    },
    saveShifts: function(){
      var user = this.get('application.user');
      if(user.get('id')){
        
        if(this.get('reference') && this.get('startTime') && this.get('endTime')){
          var dates = this.get('dates');
      
          //date format: Thu Aug 04 2016 00:00:00 GMT+0100 (BST)
      
          let controller = this;
          this.set('application.loading', true);
          async.eachSeries(dates, function iterator(date, callback) {
        
            let formattedDate = moment(date, 'DD/MM/YY');
        
            var timeStamp = moment(formattedDate).unix();
            console.log(moment.unix(timeStamp).format("DD/MM/YYYY"));
        
        
            var shift = controller.store.createRecord('shift', {
              inputDate: Date.now(),
              reference: controller.get('reference'),
              day: controller.get('day'),
              dateTimeStamp: timeStamp,
              dateText: formattedDate,
              startTime: controller.get('startTime'),
              endTime: controller.get('endTime'),
              user: user
            });
        
            shift.save().then(function(shift){
              user.get('shifts').pushObject(shift);
              user.save().then(function(){
                callback();
              });            
            });
          }, function done() {
            controller.set('application.loading', false);
            controller.transitionToRoute('overview');
          });
        }else{
          this.set('application.message', 'Please fill in all fields')
        }
      }else{
        this.set('application.message', 'There was an error')
      }
    }
  }
});
