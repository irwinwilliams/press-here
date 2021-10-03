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


 AFRAME.registerState({
  initialState: {
    enemyPosition: {x: 0, y: 1, z: 2},
    gameStages: stages,
    currentStageIndex:0
  },

  handlers: {
    enemyMoved: function (state, action) {
      state.enemyPosition = action.newPosition;
    }
  },
});

var generalVoice = new SpeechSynthesisUtterance('hello, there!');

var selectedVoice = null;
function play()
{
   voices = window.speechSynthesis.getVoices();

   for (var i = 0; i < voices.length; i++) {
        if (
          voices[i].name.indexOf("English") > -1 &&
          voices[i].name.indexOf("Female") > -1
        ) {
          selectedVoice = voices[i];
        }
      }
      
  generalVoice = new SpeechSynthesisUtterance('hello, there!');
  generalVoice.volume = 10;
  generalVoice.voice = selectedVoice;
  generalVoice.rate = 0.9;
  generalVoice.pitch = 0.9;
  speechSynthesis.speak(generalVoice);
  playBtnContainer.style.display = "none"
}

var voices = window.speechSynthesis.getVoices();

var currentLevel=1;
var speechSynthesis = null;

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
      console.log(target);
      console.log(nextcolor);
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

AFRAME.registerComponent("talker", {
  schema: { type: "string" },

  init: function() {
    var el = this.el;
    //console.log(this.data);
    //speak(this.data);
    var wordArr = this.data.split("|");
    // create a new queue
    var queue = new Queue();
    queue.enqueueAll(wordArr);

    el.addEventListener("click", function() {
      console.log(this);
      voices = window.speechSynthesis.getVoices();
      
      if (el.getAttribute("visible") != true) return;

      speechSynthesis = window.speechSynthesis;
      for (var i = 0; i < voices.length; i++) {
        if (
          voices[i].name.indexOf("English") > -1 &&
          voices[i].name.indexOf("Female") > -1
        ) {
          selectedVoice = voices[i];
        }
      }
      /*let utterance = new SpeechSynthesisUtterance(words);
      utterance.voice = selectedVoice;
      utterance.rate = 0.9;
      utterance.pitch = 0.9;
      utterance.text = words;
      utterance.volume = 10;*/
      //console.log(utterance);
      //speechSynthesis.speak(utterance);
      var words = queue.dequeue();
      if (words)
      {
        generalVoice.text = words;
        speechSynthesis.speak(generalVoice);
      }
      
    });
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