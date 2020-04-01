import axios from "axios";
import qs from "qs";
import { TAGGIT_BASE_API_URL } from "../common/config";

const state = {
  repos: [],
  reposToDisplay: []
};

const getters = {
  repos(state) {
    return state.repos;
  },
  reposToDisplay(state) {
    return state.reposToDisplay;
  }
};

const mutations = {
  getRepoData(state, data) {
    state.repos = data;
    state.reposToDisplay = data
  },
  getActiveTagRepoData(state, data) {
    state.reposToDisplay = data
  }
};

const actions = {
  fetchRepos({ commit }, params) {
    commit('fetchingData');
    axios.get(TAGGIT_BASE_API_URL + '/user/' + params.userId + '/repos', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(({ data }) => {
          commit('getRepoData', data);
          commit('fetchFinished')
        })
        .catch(error => {
          commit('fetchFinished');
          throw new Error(error);
        });
  },
  fetchReposUsingTags({ commit }, params) {
    commit('fetchingData');
    console.log(`params are ${JSON.stringify(params)}`);
    axios.get(TAGGIT_BASE_API_URL + '/user/' + params.userId + '/repo/search', {
      params: {
        tag: params.tags
      },
      paramsSerializer: function(params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(({ data }) => {
      commit('getActiveTagRepoData', data);
      commit('fetchFinished')
    })
        .catch(error => {
          commit('fetchFinished');
          throw new Error(error);
        });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
