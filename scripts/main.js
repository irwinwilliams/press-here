/* global AFRAME */
/* global Queue */
/* global stages */
/* global playBtnContainer */

/*AFRAME.registerState({
  initialState: {
    score:0,
    visibleSpheres: [0]
  },
 
  handlers: {
    decreaseScore: function (state, action) {
      state.score -= action.points;
    },
 
    increaseScore: function (state, action) {
      state.score += action.points;
    }
  }
});*/



AFRAME.registerComponent('leveltwo', {
  schema: {
    target: {type: 'selector'},
    starter: {type: 'bool'}
  },
  init: function() {
    var el = this.el;
    var target = this.data.target;
    var starter = this.data.starter
    el.addEventListener("click", function() {
      if (target && currentLevel === 2)
        {
        el.setAttribute("visible", false);
        target.setAttribute("visible", true);
        }
    });
  }
});
AFRAME.registerComponent('buddy', {
  schema: {
    target: {type: 'selector'},
  },
  init: function() {
    var el = this.el;
    var target = this.data.target;
    el.addEventListener("click", function() {
      if (target)
        target.setAttribute("visible", true);
    });
  }
});

function confirmParterColorChanged(target)
{
  if (target)
  {
    var original = target.getAttribute("originalcolor");
    if  (original)
      {
        return true;
      }
    var childAttr = target.getChildren()[0].getAttribute("originalcolor");
    if (childAttr)
      {
        return true;
      }
  }
  
  return false;
}

AFRAME.registerComponent('colorfollow', {
  schema: {
    target: {type: 'selector'},
    nextcolor: {type: 'string'}
  },
  init: function() {
    var el = this.el;
    var target = this.data.target;
    var nextcolor = this.data.nextcolor;
    el.addEventListener("click", function() {
      //console.log(target);
      //console.log(nextcolor);
      var alreadyVisible = el.getAttribute("visible");
      var partnercolorchanged = confirmParterColorChanged(target);
      if (alreadyVisible && partnercolorchanged)
        {
          el.setAttribute("color", nextcolor);
          currentLevel = 2;
        }
    });
  }
});

AFRAME.registerComponent('nextcolor', {
  schema: { type: "string" },
  init: function() {
    var el = this.el;
    var originalColor = el.getAttribute("color");
    var target = this.data;
    el.addEventListener("click", function() {
      
      var alreadyVisible = el.getAttribute("visible");
      if (alreadyVisible && target)
        {
          el.setAttribute("originalcolor", originalColor);
          var oc = el.getAttribute("originalcolor");
          console.log(oc);
          el.setAttribute("color", target);
        }
    });
  }
});

//add an aframe reset button
AFRAME.registerComponent('start-over', {
  init: function() {
    var el = this.el;
   
    el.addEventListener("click", function() {
      el.sceneEl.emit('startOver', {});
    });
  }
});

//add an aframe back button
AFRAME.registerComponent('step-back', {
  init: function() {
    var el = this.el;
    el.addEventListener("click", function() {
      el.sceneEl.emit('back', {});
    });
  }
});


//aframe rotate towards camera
AFRAME.registerComponent('rotate-towards-camera', {
  schema: {
  },
  init: function() {
    var el = this.el;

    var camera = document.querySelector("#camera");
    var cameraPosition = camera.getAttribute("position");
    var targetPosition = el.getAttribute("position");
    var direction = new THREE.Vector3().subVectors(cameraPosition, targetPosition).normalize();
    var rotation = new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction));
    el.setAttribute("rotation", {x: rotation.x, y: rotation.y, z: rotation.z});
  }
});









function speak(words) {
  //console.log(words);
  return;
  
  var msg = new SpeechSynthesisUtterance();
  var selectedVoice = null;
  for (var i = 0; i < voices.length; i++) {
    if (
      voices[i].name.indexOf("English") > -1 &&
      voices[i].name.indexOf("Female") > -1
    ) {
      selectedVoice = voices[i];
    }
  }
  if (selectedVoice)
    msg.voice = selectedVoice; // Note: some voices don't support altering params
  
  msg.voiceURI = 'native';
  msg.volume = 1; // 0 to 1
  msg.rate = 0.9; // 0.1 to 10
  msg.pitch = 0.9; //0 to 2
  msg.text = words;
  msg.lang = 'en-US';
  speechSynthesis.speak(msg);

  
  /*var speechSynthesis = window.speechSynthesis;
  voices = speechSynthesis.getVoices();
  selectedVoice = "none yet";
  for (var i = 0; i < voices.length; i++) {
    if (
      voices[i].name.indexOf("English") > -1 &&
      voices[i].name.indexOf("Female") > -1
    ) {
      selectedVoice = voices[i];
    }
  }
  let utterance = new SpeechSynthesisUtterance(words);
  utterance.voice = selectedVoice;
  utterance.rate = 0.9;
  utterance.pitch = 0.9;
  speechSynthesis.speak(utterance);*/
}
