import { reactive } from "vue";

const state = reactive({
  isAuthenticated: false,
  refresh_token: "",
  access_token: "",
});

const methods = {
  setRefreshToken(token) {
    state.refresh_token = token;
  },
  setAccessToken(token) {
    state.access_token = token;
  },
  setAuthenticated() {
    state.isAuthenticated = true;
  },
  setNotAuthenticated() {
    state.isAuthenticated = false;
  },
};

const getters = {
  getAccessToken() {
    return state.access_token;
  },
};

export default {
  state,
  methods,
  getters,
};
