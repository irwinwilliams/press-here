const SILENT = "";

var itemTemplate = 
{
  type:"item",
  name:"t",
  activator:false,
  mark:0,
  index:"-0",
  stageIndex:"",
  target:null,
  pos:"0 0.25 -5",
  text:"",
  color:"#FFCC00",
  isRaycastable:false,
  eventListeners:[],
  currentEventIndex:0,
  pressFn:function(){console.log("pressed");},
  unpressFn:function(){console.log("unpressed");},
  nextStage:function(){console.log("next stage");}
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
      obj.stage = stageIndex;
    }
  return obj;
}

function smallTalk(stage, itemIndexArr, textArr)
{
  for (var i=0;i<stage.items.length;i++)
  {
    stage.items[i].text = SILENT;
  }

  for (var i=0;i<itemIndexArr.length;i++)
  {
    stage.items[itemIndexArr[i]].text = textArr[i];
  }
}

function shuffle(stage, indexes)
{
  for (var i=0;i<stage.items.length;i++)
  {
    var prevPos = stage.items[i].pos;
    var locs = prevPos.split(" ");
    locs[0] = locs[0]*1.0;
    locs[1] = locs[1]*1.0;
    locs[2] = locs[2]*1.0;
    var nextX = 1 * (locs[0] * Math.random() + locs[0]);
    var nextY = 1* (locs[1] * Math.random() + locs[1]);

    var nextPos = `${nextX}  ${nextY} -5`;
    stage.items[i].pos = nextPos;
    console.log(nextPos);
  }

}


var stage1 = make(stageTemplate, "s1");
var s1it1 = make(itemTemplate,stage1.index, 1);
stage1.items.push(s1it1);

var stage2 = make(stage1, "s2");
var s2it2  = make(itemTemplate, stage2.index, 2);
s2it2.pos  = "3 0.25 -5";
stage2.items.push(s2it2);

var stage3 = make(stage2, "s3");

var stage4 = make(stage3, "s4");
var s4it3 = make(itemTemplate, stage4.index, 3);
s4it3.pos = "-3 0.25 -5"
stage4.items.push(s4it3);

var stage5 = make(stage4, "s5");
stage5.items[2].color= "#FF0000";

var stage6 = make(stage5, "s6");

var stage7 = make(stage5, "s7");
stage7.items[1].color = "#0000FF";


var stage8 = make(stage7, "s8");
var s8it1 = stage8.items[0];
var movAmt = 1;
for (var i=4,j=1;i<6;i++,j++)
  {
    var s9it = make(s8it1, stage8.index, i);
    s9it.pos = `0 ${0.25+(j*movAmt)} -5`;
    stage8.items.push(s9it);
  }

for (var i=7,j=1;i<9;i++,j++)
  {
    var s9it = make(s8it1, stage8.index, i);
    s9it.pos = `0 ${0.25-(j*movAmt)} -5`;
    stage8.items.push(s9it);
  }


var stage9 = make(stage8, "s9");

var s9it3 = stage9.items[2];

movAmt = 1;
for (var i=10,j=1;i<12;i++,j++)
  {
    var s9it = make(s9it3, stage9.index, i);
    s9it.pos = `-3 ${0.25+(j*movAmt)} -5`;
    stage9.items.push(s9it);
  }

for (var i=13,j=1;i<15;i++,j++)
  {
    var s9it = make(s9it3, stage9.index, i);
    s9it.pos = `-3 ${0.25-(j*movAmt)} -5`;
    stage9.items.push(s9it);
  }


var stage10 = make(stage9, "s10");
stage10.interactions = 8;

var s10it2 = stage10.items[1];
//var movAmt = 1;
for (var i=16,j=1;i<18;i++,j++)
  {
    var s10it = make(s10it2, stage10.index, i);
    s10it.pos = `3 ${0.25+(j*movAmt)} -5`;
    stage10.items.push(s10it);
  }

for (var i=18,j=1;i<20;i++,j++)
  {
    var s10it = make(s10it2, stage10.index, i);
    s10it.pos = `3 ${0.25-(j*movAmt)} -5`;
    stage10.items.push(s10it);
  }

var stage11 = make(stage10, "s11");

var stage12 = make(stage11, "s12");
shuffle(stage12, [10, 9, 2, 7, 8]);

stages.push(stage1);
stages.push(stage2);
stages.push(stage3);
stages.push(stage4);
stages.push(stage5);
stages.push(stage6);
stages.push(stage7);
stages.push(stage8);
stages.push(stage9);
stages.push(stage10);
stages.push(stage11);
stages.push(stage12);

activate(stage1, 0);
activate(stage2, 1);
activate(stage3, 0);
activate(stage4, 2);
activate(stage5, 0);
activate(stage6, 1);
activate(stage7, 0);
activate(stage8, 2);
activate(stage9, 1);
activate(stage10, 1);
activate(stage11, 8);
activate(stage12, 0);



smallTalk(stage1, [0], ["Focus here - then look to your right!"]);
smallTalk(stage2, [1], ["Great! You got me! Now press the middle dot again"]);
smallTalk(stage3, [0], ["Perfect. Now, gaze at the sphere on the left until it shakes a bit"]);
smallTalk(stage4, [2], ["Good, we're cooking with gas! Look back at the middle sphere."]);
smallTalk(stage5, [0], ["Well done! Now, gaze at the sphere on the right... until it shakes too"]);
smallTalk(stage7, [1], ["Fabulous! Press the yellow now"]);
smallTalk(stage8, [0], ["Take a peek at the red"]);
smallTalk(stage9, [2], ["Finally, take a peek at the blue"]);
smallTalk(stage10, [1], ["Perfect. Now, look at the top red one!"]);
smallTalk(stage11, [0], ["Nice! Press the middle yellow!"]);
