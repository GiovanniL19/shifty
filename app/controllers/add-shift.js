import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  dates: [],
  sectionOne: true,
  reference: '',
  day: true,
  startTime: 0,
  endTime: 0,
  presetSelected: null,
  paletteOfColours: ['rgb(0, 99, 153)', 'rgb(197, 33, 33)', 'rgb(33, 197, 121)', 'rgb(197, 101, 33)', 'rgb(111, 33, 197)', 'rgb(219, 51, 222)'],
  presetColour: 'rgba(0, 99, 153, 0.86)',
  months: [{
    label: 'January',
    value: 0
  }, {
    label: 'Febuary',
    value: 1
  }, {
    label: 'March',
    value: 2
  }, {
    label: 'April',
    value: 3
  }, {
    label: 'May',
    value: 4
  }, {
    label: 'June',
    value: 5
  }, {
    label: 'July',
    value: 6
  }, {
    label: 'August',
    value: 7
  }, {
    label: 'September',
    value: 8
  }, {
    label: 'October',
    value: 9
  }, {
    label: 'November',
    value: 10
  }, {
    label: 'December',
    value: 11
  }, ],
  years: [],

  calendar: [],
  calendarDays: [],
  //set all dates in system in dates valu
  //on save ignore dates that already exist in database
  presets: [],
  getPresets: function(){
    let controller = this;
    this.get('application.user.presets').then(function(presets){
      controller.set('presets', presets.toArray().reverse());
    });
  },
  getPastAndNextYears: function() {
    var years = [];
    for (var i = 4; i >= 0; i--) {
      var date = new Date();
      date.setFullYear(date.getFullYear() - i);
      years.push(moment(date).format('YYYY'));
    }

    for (var i = 1; i <= 4; i++) {
      var date = new Date();
      date.setFullYear(date.getFullYear() + i);
      years.push(moment(date).format('YYYY'));
    }
    this.set('years', years);
  },

  getPastAndNextYears: function() {
    var years = [];
    for (var i = 4; i >= 0; i--) {
      var date = new Date();
      date.setFullYear(date.getFullYear() - i);
      years.push(moment(date).format('YYYY'));
    }

    for (var i = 1; i <= 4; i++) {
      var date = new Date();
      date.setFullYear(date.getFullYear() + i);
      years.push(moment(date).format('YYYY'));
    }
    this.set('years', years);
  },

  getDaysInMonthFormatted: function(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(moment(new Date(date)).format('DD/MM/YYYY'));
      date.setDate(date.getDate() + 1);
    }
    return days;
  },
  getDaysInMonth: function(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  },


  calculateShifts: function(month, year) {
    let controller = this;

    controller.set('calendarDays', []);
    controller.set('calendar', []);

    var user = this.get('application.user');
    var shifts = user.get('shifts');

    var chosenMonth = month;
    var days = this.getDaysInMonthFormatted(parseInt(chosenMonth), year);

    var calendarDays = [];

    var unFormattedDays = this.getDaysInMonth(parseInt(chosenMonth), year);
    unFormattedDays.forEach(function(day) {
      if (calendarDays.length !== 7) {
        calendarDays.push(moment(day).format('dd'));
      }

      var object = Ember.Object.create({
        day: moment(day).format('DD/MM/YYYY'),
        dayFormatted: moment(day).format('DD'),
        fullDate: day,
        isPreSelected: false,
        isSelected: false,
        isToday: false,
      });

      if (moment(object.get('fullDate')).format('DDMMYYYY') === moment(new Date()).format('DDMMYYYY')) {
        object.set('isToday', true);
      }
      controller.get('calendar').push(object);
    });

    controller.set('calendarDays', calendarDays);
    chosenMonth += 1;

    shifts.forEach(function(shift) {
      var timeStamp = shift.get('dateTimeStamp');

      async.eachSeries(controller.get('calendar'), function(date, nextDay) {
          if (date.get('day') === moment.unix(timeStamp).format('DD/MM/YYYY')) {
            date.set('isPreSelected', true);
          }
          nextDay();
        }),
        function done() {
          nextShift();
        };
    });

  },

  nextAddShift: function() {
    this.getPresets();
    this.set('sectionOne', false);
    this.set('application.showBack', false);
    this.set('application.action.nextAddShift', false);
    this.set('startTime', moment(new Date()).format('hh:mm'));
    this.set('endTime', moment(new Date()).format('hh:mm'));
  },
  datesListener: function() {
    if (this.get('dates.length') > 0) {
      this.set('application.action.nextAddShift', true);
    } else {
      this.set('application.action.nextAddShift', false);
    }
  }.observes('dates.length'),
  actions: {
    dontUse: function(){
      this.set('presetSelected', null);
    },
    back: function(){
      this.set('sectionOne', true);
      this.set('application.action.nextAddShift', true);
      this.set('application.showBack', true);
    },
    selectPreset: function(preset){
      this.set('presetSelected', preset);
    },
    selectMonth: function(month) {
      this.get('month', month);
      this.calculateShifts(month, this.get('year'));
    },

    selectYear: function(year) {
      this.get('year', parseInt(year));
      this.calculateShifts(this.get('month.value'), parseInt(year));
    },
    select: function(type) {
      this.set('day', !this.get('day'));
    },
    selectDate: function(date) {
      if (date.get('isSelected') === true) {
        date.set('isSelected', false);
        this.get('dates').removeObject(date);
      } else {
        date.set('isSelected', true);
        this.get('dates').pushObject(date);
      }
    },
    saveShifts: function() {
      var user = this.get('application.user');
      let controller = this;
      
      if(user.get('id')) {

        if (this.get('reference') && this.get('startTime') && this.get('endTime') || this.get('presetSelected')) {
          var dates = this.get('dates');
          this.set('application.savingShifts', true);
          //date format: Thu Aug 04 2016 00:00:00 GMT+0100 (BST)

          this.set('application.loading', true);          
          async.forEachOf(dates, function iterator(date, index, callback) {
            date = date.get('fullDate');
            let formattedDate = moment(date, 'DD/MM/YY');

            var timeStamp = moment(formattedDate).unix();

            if(controller.get('presetSelected') === null){
              var shift = controller.store.createRecord('shift', {
                inputDate: Date.now(),
                reference: controller.get('reference'),
                day: controller.get('day'),
                dateTimeStamp: timeStamp,
                dateText: formattedDate,
                startTime: controller.get('startTime'),
                endTime: controller.get('endTime'),
                user: user,
                colour: controller.get('presetColour')
              });
            }else{
              var shift = controller.store.createRecord('shift', {
                inputDate: Date.now(),
                reference: controller.get('presetSelected.reference'),
                day: controller.get('presetSelected.day'),
                dateTimeStamp: timeStamp,
                dateText: formattedDate,
                startTime: controller.get('presetSelected.startTime'),
                endTime: controller.get('presetSelected.endTime'),
                user: user,
                colour: controller.get('presetSelected.colour')
              });
            
            }
            
            shift.save().then(function(shift) {
              user.get('shifts').pushObject(shift);
              callback();
            });
          }, function(err) {
            if(err){
              console.log(err);
              controller.set('application.message', 'There was an error, please try again');
              controller.set('application.savingShifts', false);
              controller.set('application.loading', false);
              controller.set('presetSelected', null);
              controller.transitionToRoute('overview');
            }
            if(controller.get('presetSelected') === null){
              var newPreset = controller.store.createRecord('preset', {
                reference: controller.get('reference'),
                startTime: controller.get('startTime'),
                endTime: controller.get('endTime'),
                isDay: controller.get('day'),
                user: controller.get('application.user'),
                colour: controller.get('presetColour')
              });
              newPreset.save().then(function(newPreset){
                user.get('presets').pushObject(newPreset);
                user.save().then(function(){
                  controller.set('application.savingShifts', false);
                  controller.set('application.loading', false);
                  controller.set('presetSelected', null);
                  controller.transitionToRoute('overview');
                });
              });
            }else{
              user.save().then(function(){
                controller.set('application.savingShifts', false);
                controller.set('application.loading', false);
                controller.set('presetSelected', null);
                controller.transitionToRoute('overview');
              });
            }
          });
        } else {
          this.set('application.message', 'Please fill in all fields')
        }
      } else {
        this.set('application.message', 'There was an error')
      }
    }
  }
});
