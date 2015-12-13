var GameState = {
    stage : undefined,
    stages : {},

    addStage : function(key, stage) {
        GameState.stages[key] = stage;
        return stage;
    },

    getStage : function(key) {
        return GameState.stages[key]; 
    },

    switchStage : function(key) {
        if(GameState.stage != undefined) {
            GameState.stage.stop();
        }
        GameState.stage = GameState.getStage(key);
        GameState.stage.resume();
    }
    
}
