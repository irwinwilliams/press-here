const SILENT = "";

var itemTemplate = 
    {
      name:"t",
      activator:false,
      mark:0,
      index:"-0",
      target:null,
      pos:"0 0.25 -5",
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
      obj.interactions = 0;//reset interaction-count of stage
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
var s2it2 = make(itemTemplate, stage2.index, 2);
s2it2.text= "Great! You got me! Now press the middle dot again";
s2it2.pos = "3 0.25 -5"
stage2.items.push(s2it2);
activate(stage2, 1);




var stage3 = make(stage2, "s3");
var s3it1 = stage3.items[0];
s3it1.text = "Perfect. Now, gaze at the sphere on the left until it shakes a bit";
var s3it2 = stage3.items[1];
s3it2.text = SILENT;
activate(stage3, 0);

var stage4 = make(stage3, "s4");
stage4.interactions = 1;
var s4it3 = make(itemTemplate, stage4.index, 3);
s4it3.pos = "-3 0.25 -5"
s4it3.text = "Good, we're cooking with gas! Look back at the middle sphere."
stage4.items.push(s4it3);
activate(stage4, 2);

var stage5 = make(stage4, "s5");
stage5.interactions = 1;
stage5.items[0].text = "Well done! Now, gaze at the sphere on the right... until it shakes too";
stage5.items[2].text = SILENT;
stage5.items[2].color= "#FF0000";
activate(stage5, 0);

var stage6 = make(stage5, "s6");
stage6.items[0].text = SILENT;
stage6.items[1].color = "#0000FF";
stage6.items[1].text = "Fabulous! Press the yellow now";

activate(stage6, 1);

var stage7 = make(stage6, "s7");
stage7.interactions = 8;
var s7it1 = stage7.items[0];
s7it1.text = "and take a peek at the red";
var movAmt = 1;
for (var i=4,j=1;i<6;i++,j++)
  {
    var s7it = make(s7it1, stage7.index, i);
    s7it.pos = `0 ${0.25+(j*movAmt)} -5`;
    stage7.items.push(s7it);
  }

for (var i=7,j=1;i<9;i++,j++)
  {
    var s7it = make(s7it1, stage7.index, i);
    s7it.pos = `0 ${0.25-(j*movAmt)} -5`;
    stage7.items.push(s7it);
  }

stage7.items[1].text = SILENT;

activate(stage7, 0);

var stage8 = make(stage7, "s8");
stage8.interactions = 8;

var s8it3 = stage8.items[2];
s8it3.text = "finally, take a peek at the blue";
//var movAmt = 1;
for (var i=10,j=1;i<12;i++,j++)
  {
    var s8it = make(s8it3, stage8.index, i);
    s8it.pos = `-3 ${0.25+(j*movAmt)} -5`;
    stage8.items.push(s8it);
  }

for (var i=13,j=1;i<15;i++,j++)
  {
    var s8it = make(s8it3, stage8.index, i);
    s8it.pos = `-3 ${0.25-(j*movAmt)} -5`;
    stage8.items.push(s8it);
  }

stage8.items[0].text = SILENT;
activate(stage8, 2);

var stage9 = make(stage8, "s9");
stage9.interactions = 8;

var s9it2 = stage8.items[1];
s9it2.text = "Perfect. Now, quickly touch all three in the center row! Starting from the left";
//var movAmt = 1;
for (var i=16,j=1;i<18;i++,j++)
  {
    var s9it = make(s9it2, stage9.index, i);
    s9it.pos = `3 ${0.25+(j*movAmt)} -5`;
    stage9.items.push(s9it);
  }

for (var i=18,j=1;i<20;i++,j++)
  {
    var s9it = make(s9it2, stage9.index, i);
    s9it.pos = `3 ${0.25-(j*movAmt)} -5`;
    stage9.items.push(s9it);
  }

stage9.items[1].text = SILENT;
activate(stage9, 0);

stages.push(stage1);
stages.push(stage2);
stages.push(stage3);
stages.push(stage4);
stages.push(stage5);
stages.push(stage6);
stages.push(stage7);
stages.push(stage8);
