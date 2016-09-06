import Ember from 'ember';

export default Ember.Route.extend({
  activate: function(){
    let controller =  this.controllerFor('application');
    controller.getUser();
    
    this._super();
    window.scrollTo(0,0);
    
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      var admobid = {};
      if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
        admobid = {
          banner: 'ca-app-pub-3722628766211811/2692697487',
          interstitial: 'ca-app-pub-3722628766211811/2692697487'
        };
      }
    
      if(AdMob) AdMob.createBanner({
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true,
        isTesting: false });
    
        if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );

        setInterval(function(){
          // show the interstitial later, e.g. at end of game level
          if(AdMob) AdMob.showInterstitial();
        }, 120000);
      }
  },
  setupController: function(controller){
    if(!controller.get('session.isAuthenticated')){
      controller.transitionToRoute('login');
    }else{
      controller.transitionToRoute('overview');
      controller.getPastAndNextYears();
      
      let addShiftController = this.controllerFor('add-shift');
      addShiftController.getPastAndNextYears();
    }   
  }  
});
