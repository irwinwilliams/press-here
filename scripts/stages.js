const SILENT = "";

var itemTemplate = 
    {
      name:"t",
      activator:false,
      mark:0,
      index:"-0",
      target:null,
      pos:"0 0.25 -5",
      position:{x:0, y:0, z:0},
      text:"",
      color:"#FFCC00",
      isRaycastable:false,
      eventListeners:[],
      currentEventIndex:0,
      pressFn:function(){console.log("pressed");},
      unpressFn:function(){console.log("unpressed");},
      nextStage:function(){console.log("next stage");},
    }
var stageTemplate = {
  type:"stage",
  items:[],
  index:"-0",
  mark:0,
  interactions:0,
  push:function(item){this.items.push(item);}
}

function label(item, stage, val)
{
  item.mark = val;
  item.index = stage.index + "-"+val;
}

function activate(stage, index)
{
  for (var i=0;i<stage.items.length;i++)
    {
      if (i!= index)
      {
        stage.items[i].activator = false;
      }
      else
      {
        stage.items[i].activator = true;
      }
    }
}

var stages = [];

function make(template, stageIndex, itemIndex)
{
  var obj=  JSON.parse(JSON.stringify(template));
  obj.label =  function(lbl){ this.mark = lbl; this.index = lbl;}
  if (obj.type === "stage" && obj.items)
    {
      obj.index = stageIndex;
      for(var i=0;i<obj.items.length;i++)
        {
          obj.items[i].index = `${stageIndex}-${i}`;
        }
    }
  else
    {
      obj.index = `${stageIndex}-${itemIndex}`;
    }
  return obj;
}

var stage1 = make(stageTemplate, "s1");

var s1it1 = make(itemTemplate,stage1.index, 1);
s1it1.text = "Focus here - then look to your right!";
s1it1.target = "#sphere2";
label(s1it1, stage1, 1);
stage1.items.push( s1it1);

activate(stage1, 0);

var stage2 = make(stage1, "s2");

var s2it1 = stage2.items[0];
s2it1.text = SILENT;
s2it1.pos = "0 0.25 -5"
//label(s2it1, stage2,  1);

var s2it2 = make(itemTemplate, stage2.index, 2);
s2it2.text= "Great! You got me! Now press the middle dot again";
//label(s2it2, stage2, 2);
s2it2.pos = "3 0.25 -5"
stage2.items.push(s2it2);
activate(stage2, 1);


var stage3 = make(stage2, "s3");
stage3.interactions = 1;
var s3it1 = stage3.items[0];
s3it1.text = "Perfect. Now, gaze at the sphere on the left until it shakes a bit";
var s3it2 = stage3.items[1];
s3it2.text = SILENT;
var s3it3 = make(itemTemplate, stage3, 3);
//label(s3it3, stage3, 2);
s3it3.pos = "-3 0.25 -5"
stage3.items.push(s3it3);
activate(stage3, 0);

var stage4 = make(stage3, "s4");
var s4it3 =stage4.items[2];
s4it3.text = "Good, we're cooking with gas! Look back at the middle sphere."

activate(stage4, 2);



var stage5 = make(stage4, "s5");
stage5.interactions = 1;
var s5it1 = stage5.items[0];
s5it1.text = "Well done! Now, gaze at the sphere on the right... until it shakes too";

activate(stage5, 1);



stages.push(stage1);
stages.push(stage2);
stages.push(stage3);
stages.push(stage4);
stages.push(stage5);
