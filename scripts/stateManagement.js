/* global AFRAME */
/* global Queue */
/* global stages */
/* global playBtnContainer */

const startingPoint = 7;

 AFRAME.registerState({
  initialState: {
    enemyPosition: {x: 0, y: 1, z: 2},
    gameStages: stages,
    currentStageIndex:startingPoint,
    currentStageItems:stages[startingPoint].items,
    currentStage:stages[startingPoint],
    seen:[]
  },
  
  handlers: {
    interact: function(state, item)
    {
      return;
      console.log("in interact");
      //console.log(state);
      //console.log(item.item.attributes["index"]);
      var idx= item.item.attributes["index"];
      //console.log(state.seen[idx.value]);
      if (!state.seen.hasOwnProperty(idx.value))
        state.gameStages[state.currentStageIndex].interactions++;
      
      state.seen[idx.value] = "seen";
    },
    advanceStage: function(state, event)
    {
      console.log("in advance");
      let index = event.item.getAttribute("index");
      let stageNameIdx = index.indexOf("-");
      let itemStage = event.item.getAttribute("index").substring(0,stageNameIdx);
      let currentStage = state.gameStages[state.currentStageIndex].index;
      let isStageChanger = event.item.getAttribute("stage-changer");
      if (isStageChanger === "true" && itemStage === currentStage)
      //if (state.gameStages[state.currentStageIndex].interactions >= state.currentStageItems.length)
        {
          state.seen = [];
          //state.currentStageItems = [];
          //state.currentStageItems = stages[++state.currentStageIndex].items;
          state.currentStageItems.__dirty = true;
          //console.log(state.currentStageItems);
          while (state.currentStageItems.length) { state.currentStageItems.pop(); }
          //console.log(state);
          state.currentStageIndex++;
          if (state.currentStageIndex >= stages.length)
            {
              console.log("END");
              return;
            }
          state.currentStageItems.push(...stages[state.currentStageIndex].items);
          state.currentStage = stages[state.currentStageIndex];
          //state.currentStageItems = stages[++state.currentStageIndex].items
          //console.log(state.currentStageItems);
          
          //console.log(state);
          console.log("NEW STAGE!"+ state.currentStage.index);
        }
    },
    startOver: function (state, action) {
      this.goToStage(state, 0);
    },
    back: function (state, action) {
      this.goToStage(state, state.currentStageIndex - 1);
    },
    goToStage: function (state, location) {
      if (state.currentStageIndex > 0)
      {
        state.currentStageIndex = location;
        state.seen = [];
        state.currentStageItems.__dirty = true;
        while (state.currentStageItems.length) { state.currentStageItems.pop(); }
      
        state.currentStageItems.push(...stages[state.currentStageIndex].items);
        state.currentStage = stages[state.currentStageIndex];
      }
    }
  },
});