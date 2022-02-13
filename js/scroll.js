//Eases web page to the top of an element using an easing function
export default function smoothScroll(target, duration){
    var target = document.querySelector(target);
    var targetPos = target.offsetTop;
    var startPos = window.pageYOffset;
    var distance = targetPos - startPos;
    var startTime = null;
  
    function animation(currentTime){
      if(startTime === null)startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var run = ease(timeElapsed,startPos,distance,duration);
      window.scrollTo(0,run);
      if(timeElapsed < duration){requestAnimationFrame(animation)}
    }
  
    function ease(t,b,c,d){
      t /= d/2;
        if (t < 1) return c / 2 * t * t + b;
        t --;
        return -c / 2 * (t* (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
}