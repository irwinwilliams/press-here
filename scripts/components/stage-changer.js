/* global AFRAME */
/* global Queue */
/* global stages */

AFRAME.registerComponent("stage-changer", {
  init: function() {
    var el = this.el;
    var isActivator=this.data;
    
    el.addEventListener("click", function() {
      if (isActivator)
      {
        el.sceneEl.emit('interact', {item:el});
        el.sceneEl.emit('advanceStage', {item:el, index:this.data});
      }
      else
        {
          console.log(el);
          console.log("is inert");
        }
    });
  }
});