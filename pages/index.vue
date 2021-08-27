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
    <div class="my-2">
      <b-btn variant="outline-success" @click="fetchImageUrl(1)">Approve</b-btn>
      <b-btn variant="outline-danger" @click="fetchImageUrl(2)"
        >Request Changes</b-btn
      >
      <b-btn variant="outline-info" @click="fetchImageUrl(3)">Comment</b-btn>
    </div>
    <nuxt-link to="/images">Show All Images</nuxt-link>
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
