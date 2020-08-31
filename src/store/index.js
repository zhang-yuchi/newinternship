import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import mutations from "./mutations"
import actions from './actions'
export default new Vuex.Store({
  state: {
    isReportStage1Open: true,
    isReportStage2Open: true,
    isReportStage3Open: true,
    isIdentifyFormStage1Open: true,
    isIdentifyFormStage2Open: true,
    isIdentifyFormStage3Open: true,
    screenHeight:620,
    bannerHeight:100,
    stuNo:[],
    index:0,
  },
  mutations,
  actions,
  modules: {}
})