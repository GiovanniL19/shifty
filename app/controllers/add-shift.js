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
    this.set('sectionOne', false);
    this.set('application.action.nextAddShift', false);
  },
  datesListener: function() {
    if (this.get('dates.length') > 0) {
      this.set('application.action.nextAddShift', true);
    } else {
      this.set('application.action.nextAddShift', false);
    }
  }.observes('dates.length'),
  actions: {
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
      if (user.get('id')) {

        if (this.get('reference') && this.get('startTime') && this.get('endTime')) {
          var dates = this.get('dates');

          //date format: Thu Aug 04 2016 00:00:00 GMT+0100 (BST)

          let controller = this;
          this.set('application.loading', true);
          async.eachSeries(dates, function iterator(date, callback) {
            date = date.get('fullDate');
            let formattedDate = moment(date, 'DD/MM/YY');

            var timeStamp = moment(formattedDate).unix();

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

            shift.save().then(function(shift) {
              user.get('shifts').pushObject(shift);
              user.save().then(function() {
                callback();
              });
            });
          }, function done() {
            controller.set('application.loading', false);
            controller.transitionToRoute('overview');
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
