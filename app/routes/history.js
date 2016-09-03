import Ember from 'ember';

export default Ember.Route.extend({
  activate: function(){
    let controller = this.controllerFor('history');
    controller.set('application.loading', true);
    this.store.query('shift', {showHistory: 'true', user: controller.get('application.user.id')}).then(function(shifts){
      controller.set('model', shifts.sortBy('dateTimeStamp').reverse());
      controller.set('application.loading', false);
       
      controller.get('application').calculateShifts(controller.get('application.month.value'), controller.get('application.year'), controller.get('model'), controller);
    });
    
    this._super();
    window.scrollTo(0,0);
    
    if(!controller.get('application.cardView')){
      try{
        if (cordova.platformId == 'android') {
          StatusBar.backgroundColorByHexString("#313131");
        }
      }catch(err){
        console.log(err);
      } 
      controller.set('application.backColour', '#313131');
    }
    
  },
  setupController: function(controller) {
    if(controller.get('session.isAuthenticated')){
      controller.set('application.title', 'History');
      
      controller.set('application.year', new Date().getFullYear());
      controller.set('application.month', Ember.Object.create({label: moment(new Date()).format('MMMM'), value: parseInt(moment(new Date()).format('M')) - 1}));
      
      controller.get('application').clearAction();
      controller.set('application.action.add', true);
      controller.set('application.action.calendarView', true);
      
      controller.set('application.showBack', true);
    }else{
      controller.transitionToRoute('login');
    }
  }
});
