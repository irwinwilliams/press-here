var itemTemplate = 
    {
      position:{x:0, y:0, z:0},
      text:[],
      eventListeners:[],
      currentEventIndex:0,
      pressFn:function(){console.log("pressed");},
      unpressFn:function(){console.log("unpressed");},
      nextStage:function(){console.log("next stage");}
      
    }
var stageTemplate = {
  items:[],
  index:0,
  push:function(item){this.items.push(item);}
}

var stages = [];

function make(template)
{
  return JSON.parse(JSON.stringify(template));
}

var stage1 = make(stageTemplate);

stage1.index = 0;
var s1it1 = make(itemTemplate);
s1it1.text.push("Focus here - then look to your right!");
stage1.items.push( s1it1);


var stage2 = make(stage1);
stage2.index= 1;
var s2it1 = stage2.items[0];
s2it1.text = [];
var s2it2 = make(itemTemplate);
s2it2.text.push("Great! You got me! Now press the middle dot again");
stage2.items.push(s2it2);

var stage3 = make(stage2);
stage3.index = 2;
var s3it1 = stage3.items[0];
s3it1.text = ["Perfect. Now, gaze at the sphere on the left until it shakes a bit"];
var s3it2 = stage3.items[1];
s3it2.text = [];
var s2it3 = make(itemTemplate);
stage3.items.push(s2it3);

var stage4 = make(stage3);
stage4.index = 3;
var s4it1 = stage3.items[0];
s4it1.text = ["Well done! Now, gaze at the sphere on the right... until it shakes too"];
var s4it3 = stage3.items[2];






stages.push(stage1);
stages.push(stage2);
stages.push(stage3);
stages.push(stage4);
