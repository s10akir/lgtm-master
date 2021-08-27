<template>
  <b-container class="text-center">
    <h1>LGTM Images</h1>
    <div class="text-left">
      <h2>
        <nuxt-link to="/"> &lt; Top </nuxt-link>
      </h2>
    </div>
    <div>
      <b-row class="text-right">
        <b-col v-for="image in images" :key="image.id">
          <b-badge
            :variant="categoryVariant(image.category.id)"
            class="shadow"
            >{{ image.category.name }}</b-badge
          >
          <b-img rounded center fluid :src="image.url" class="shadow" />
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      images: [],
    }
  },
  mounted() {
    this.fetchImageUrls()
  },
  methods: {
    async fetchImageUrls() {
      const url = 'api/images'

      const res = await this.$axios.get(url)
      this.images = res.data
    },
    categoryVariant(categoryId: number): string {
      switch (categoryId) {
        case 1:
          return 'success'
        case 2:
          return 'danger'
        case 3:
          return 'info'
        default:
          return ''
      }
    },
  },
})
</script>