import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import mutations from "./mutations"
import actions from './actions'
export default new Vuex.Store({
  state: {
    isReportStage1Open: false,
    isReportStage2Open: false,
    isReportStage3Open: false,
    isIdentifyFormStage1Open: false,
    isIdentifyFormStage2Open: false,
    isIdentifyFormStage3Open: false,
  },
  mutations,
  actions,
  modules: {}
})