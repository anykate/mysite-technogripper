<template>
  <div class="about">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { inject, ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'Protected',
  props: {
    msg: String
  },
  setup() {
    const store = inject('store')
    const msg = ref('')

    onMounted(() => {
      accessProtectedPage()
    })

    const accessProtectedPage = async function () {
      await axios
        .get(
          "http://www.django4u.com:8000/api/protected_view/",
          {
            headers: {
              Authorization: `Bearer ${store.getters.getAccessToken()}`
            },
          }
        )
        .then((response) => {
          msg.value = response.data['message']
        })
        .catch((error) => {
          msg.value = "This is a protected view"
        });
    }

    return {
      store,
      msg,
      accessProtectedPage,
    }
  }
}
</script>
