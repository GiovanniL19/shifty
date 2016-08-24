export default function(){
  this.transition(
      this.hasClass('nextPage'),
      this.toValue(true),
      this.use('crossFade'),
      this.reverse('toLeft')
    );
};