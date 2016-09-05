import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  
  backTop: '',
  
  lastWeekShifts: [],
  nextWeekShifts: [],
  
  imageGenerator: function(){
    let controller = this;
    let url = '';
    if(this.get('nextWeekShifts.length') >= 1){
      url = 'http://api.pexels.com/v1/search?query=working&per_page=20&page=1';
    }else{
      url = 'http://api.pexels.com/v1/search?query=summer&per_page=20&page=1';
    }
		$.ajax({
			url: url,
			type: 'GET',
      headers: { "Authorization": "563492ad6f91700001000001ec52f31e44ae4cc85bcff65039983df1" },
			accepts: 'application/json',
			success: function(data) {
        let number = Math.floor(Math.random() * 18) + 1;
        controller.set('backTop', data.photos[number].src.large);
        controller.set('application.loading', false);
			},
			error: function(err) {
				console.log(err);
        controller.set('application.loading', false);
			}
		});
  },

  getWeekData: function(){
    let controller = this;
    controller.set('application.loading', true);
    this.store.query('shift', {when: 'last', user: this.get('application.user.id')}).then(function(shifts){
      controller.set('lastWeekShifts', shifts);
      controller.store.query('shift', {when: 'next', user: controller.get('application.user.id')}).then(function(shifts){
        controller.set('nextWeekShifts', shifts);
        controller.imageGenerator();
      });
    });
  }.observes('application.user.id'),
  
  actions:{
    refresh: function(){
      location.reload();
    },
    removeShift: function(shift){
      let controller = this;
      if(confirm('Are you sure you want to remove this shift?')){
          
        
        var card = document.getElementById(shift.get('id'));
        card.className += " fadeOutRight";
          
        setTimeout(function(){
          controller.get('application.user.shifts').removeObject(shift);
          controller.get('application.user').save().then(function(){
            $('#'+shift.get('id')+'').remove();
            shift.destroyRecord().then(function(){
              controller.set('application.message', 'Shift Removed');
            });
          });
        },400);
      }
    }
  }
});
