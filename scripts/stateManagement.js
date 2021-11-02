/* global AFRAME */
/* global Queue */
/* global stages */
/* global playBtnContainer */


 AFRAME.registerState({
  initialState: {
    enemyPosition: {x: 0, y: 1, z: 2},
    gameStages: stages,
    currentStageIndex:0,
    currentStageItems:stages[0].items,
    currentStage:stages[0],
    seen:[]
  },
  
  handlers: {
    interact: function(state, item)
    {
      console.log("in interact");
      console.log(state);
      //console.log(item.item.attributes["index"]);
      var idx= item.item.attributes["index"];
      console.log(state.seen[idx.value]);
      if (!state.seen.hasOwnProperty(idx.value))
        state.gameStages[state.currentStageIndex].interactions++;
      
      state.seen[idx.value] = "seen";
    },
    advanceStage: function(state, event)
    {
      console.log("in advance");
      
      if (state.gameStages[state.currentStageIndex].interactions >= state.currentStageItems.length)
        {
          state.seen = [];
          //state.currentStageItems = [];
          //state.currentStageItems = stages[++state.currentStageIndex].items;
          state.currentStageItems.__dirty = true;
          console.log(state.currentStageItems);
          while (state.currentStageItems.length) { state.currentStageItems.pop(); }
          console.log(state);
          state.currentStageIndex++;
          if (state.currentStageIndex >= stages.length)
            {
              console.log("END");
              return;
            }
          state.currentStageItems.push(...stages[state.currentStageIndex].items);
          state.currentStage = stages[state.currentStageIndex];
          //state.currentStageItems = stages[++state.currentStageIndex].items
          console.log(state.currentStageItems);
          
          //console.log(state);
          console.log("NEW STAGE!"+ state.currentStageIndex);
        }
    },
    enemyMoved: function (state, action) {
      state.enemyPosition = action.newPosition;
    }
  },
});