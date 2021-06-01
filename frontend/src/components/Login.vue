<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12" :offset="6">
          <div class="element">
            <el-input placeholder="Enter Username" v-model="username" clearable>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <div class="element">
            <el-input
              placeholder="Enter Password"
              v-model="password"
              show-password
            >
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <div class="element">
            <el-button type="primary" @click="loginUser" plain>Login</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <div class="element">
            <p v-if="store.state.access_token">
              <Protected msg="" />
            </p>
            <p v-else>
              <Protected msg="This is a protected view" />
            </p>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { ref, inject } from 'vue'
import axios from 'axios'
import Protected from '@/components/Protected.vue'

export default {
  name: 'Login',
  components: {
    Protected
  },
  setup() {
    const store = inject('store')
    const username = ref('')
    const password = ref('')

    const loginUser = async function () {
      if (username.value && password.value) {
        await axios
          .post(
            "http://localhost:8000/api/token/",
            {
              username: username.value,
              password: password.value,
            },
            {
              headers: {
                Authorization: "Bearer " + store.getters.getAccessToken(),
              },
            }
          )
          .then((response) => {
            store.methods.setRefreshToken(response.data["refresh"]);
            store.methods.setAccessToken(response.data["access"]);
            store.methods.setAuthenticated()
            username.value = ''
            password.value = ''
          })
          .catch((error) => {
            // console.log(error);
            store.methods.setRefreshToken('');
            store.methods.setAccessToken('');
            store.methods.setNotAuthenticated()
            username.value = ''
            password.value = ''
          });
      }
    }

    return {
      store, username, password, loginUser,
    }
  },
}
</script>

<style scoped>
.element {
  margin: 10px 0 10px 0;
}
</style>