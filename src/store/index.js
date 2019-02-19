import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import getScale from "../utils/getScale.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    weeks: [],
    total: 0,
    author: {},
    scale: {},
    cscale: {},
    area: {
      width: 700,
      height: 270,
      margin: 40
    },
    carea: {
      width: 350,
      height: 135,
      margin: 40
    },
    selectedWeeks: []
  },
  mutations: {
    SET_DATA(state, data) {
      state.weeks = data[0].weeks;
      state.total = data[0].total;
      state.author = data[0].author;
      state.scale = getScale(state.weeks, state, "area");
      state.selectedWeeks = state.weeks;
      state.cscale = getScale(state.weeks, state, "carea");
    },
    SET_SELECTED_WEEKS(state, data) {
      state.selectedWeeks = data;
    },
    SET_SCALE(state, data) {
      state.cscale = getScale(data, state, "carea");
    }
  },
  actions: {
    FETCH_DATA(
      { dispatch, commit, state },
      { owner = "luke-hanwook", repo = "spring-aac" }
    ) {
      return axios({
        url: `https://api.github.com/repos/${owner}/${repo}/stats/contributors`,
        method: "get"
      })
        .then(result => {
          console.log(result.status);
          if (result.status === 202) {
            dispatch("FETCH_DATA", { owner, repo });
          } else {
            const { data } = result;
            commit("SET_DATA", data);
          }
        })
        .catch(e => {
          if (e.response && e.response.status === 404) {
            alert("404");
          }
        });
    }
  }
});

export default store;
