/* global AFRAME */
/* global Queue */
/* global stages */
/* global playBtnContainer */

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
  //speechSynthesis.speak(generalVoice);
  console.log("TALK: hello, there");
  playBtnContainer.style.display = "none"
}

var voices = window.speechSynthesis.getVoices();

var currentLevel=1;
var speechSynthesis = null;

AFRAME.registerComponent("talker", {
  schema: { type: "string" },

  init: function() {
    var el = this.el;
    //console.log(this.data);
    //speak(this.data);
    var wordArr = this.data;//.split("|");
    // create a new queue
    //var queue = new Queue();
    //queue.enqueueAll(wordArr);

    this.handleTalk = function() {
      //console.log("talker!");
      //console.log(this);
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
      var words = wordArr;//queue.dequeue();
      if (words)
      {
        generalVoice.text = words;
        //speechSynthesis.speak(generalVoice);
        console.log("TALK: "+words);
      }
      
      //el.parentNode.removeChild(el);

      
  
    };
    
    el.addEventListener("click", this.handleTalk);
  },
  remove: function()
  {
    this.el.removeEventListener('click', this.handleTalk);
    //console.log("removed click from");
  }
});