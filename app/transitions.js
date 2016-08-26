export default function(){
  this.transition(
    this.hasClass('nextPage'),
    this.toValue(true),
    this.use('crossFade'),
    this.reverse('toLeft')
  );
  
  this.transition(
    this.fromRoute('overview'),
    this.toRoute('add-shift'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  
  this.transition(
    this.fromRoute('history'),
    this.toRoute('add-shift'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  
  this.transition(
    this.fromRoute('upcoming'),
    this.toRoute('add-shift'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  
  this.transition(
    this.fromRoute('overview'),
    this.toRoute('history'),
    this.use('fade'),
    this.reverse('fade')
  );
  
  this.transition(
    this.fromRoute('overview'),
    this.toRoute('upcoming'),
    this.use('fade'),
    this.reverse('fade')
  );
  
  this.transition(
    this.fromRoute('upcoming'),
    this.toRoute('history'),
    this.use('fade'),
    this.reverse('fade')
  );
};