module.exports = {
    changeReportStage1(state,stage){
        state.isReportStage1Open = stage
    },
    changeReportStage2(state,stage){
        state.isReportStage2Open = stage
    },
    changeReportStage3(state,stage){
        state.isReportStage3Open = stage
    },
    changeIdentifyStage1(state,stage){
        state.isIdentifyFormStage1Open = stage
    },
    changeIdentifyStage2(state,stage){
        state.isIdentifyFormStage2Open = stage
    },
    changeIdentifyStage3(state,stage){
        state.isIdentifyFormStage3Open = stage
    },
    changeScreenHeight(state,height){
        state.screenHeight = height
    }

}