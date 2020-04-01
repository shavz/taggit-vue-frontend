import Vue from "vue";
import Vuex from "vuex";
import user from "./user.module"
import tag from "./tag.module"
import repos from "./repo.module"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    tag,
    repos,
  }
});
