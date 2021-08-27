<template>
  <div class="container text-center">
    <h1>THE lGTM M@STER</h1>
    <b-img
      rounded
      center
      fluid
      :src="imageUrl"
      class="shadow my-4"
      width="1000"
      alt="lgtm image"
    />
    <div>
      <b-btn @click="fetchImageUrl(1)" variant="outline-success">Approve</b-btn>
      <b-btn @click="fetchImageUrl(2)" variant="outline-danger">Request Changes</b-btn>
      <b-btn @click="fetchImageUrl(3)" variant="outline-info">Comment</b-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      imageUrl: '',
    }
  },
  mounted() {
    this.fetchImageUrl()
  },
  methods: {
    async fetchImageUrl(categoryId?: number) {
      let url = 'api/images/random'
      if (categoryId) {
        url += `?categoryId=${categoryId}`
      }

      const res = await this.$axios.get(url)
      this.imageUrl = res.data.url
    },
  },
})
</script>
