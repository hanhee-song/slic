export function collapse(element) {
  var sectionHeight = element.scrollHeight;
  
  var elementTransition = element.style.transition;
  element.style.transition = '';
  
  requestAnimationFrame(function() {
    element.style.height = sectionHeight + 'px';
    element.style.transition = elementTransition;
    
    requestAnimationFrame(function() {
      element.style.height = 0 + 'px';
    });
  });
  
  // element.setAttribute('data-collapsed', 'true');
}

export function expand(element) {
  var sectionHeight = element.scrollHeight;
  
  element.style.height = sectionHeight + 'px';
}
