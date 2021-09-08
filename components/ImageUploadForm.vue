<template>
  <div>
    <b-form-file
      v-model="file"
      accept="image/*"
      placeholder="ARE YOU READY? I'M LADY"
      drop-placeholder="Drop Image here..."
      class="my-4 text-left"
      @input="createFileUrl"
    />
    <div v-if="file && fileUrl">
      <b-img
        rounded
        center
        fluid
        :src="fileUrl"
        class="shadow my-4"
        alt="upload preview"
        width="1000"
      />
      <b-alert show variant="danger" class="my-4">
        <p class="my-2">
          画像はImgurに匿名Uploadされます。<wbr />一度Uploadすると本当の意味での削除は容易ではありません。
        </p>
        <div class="my-2">
          <b-form-checkbox v-model="accept">
            I accept and use.
          </b-form-checkbox>
        </div>
      </b-alert>
      <b-btn variant="success" :disabled="!accept" @click="uploadFile"
        >Submit</b-btn
      >
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      file: null,
      fileUrl: '',
      accept: false,
    }
  },
  methods: {
    createFileUrl() {
      if (!this.file) {
        return
      }

      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.fileUrl = fileReader.result
      })

      fileReader.readAsDataURL(this.file)
    },
    async uploadFile() {
      this.createFileUrl()

      await this.$axios.post('/api/images', {
        image: this.fileUrl,
      })
      // TODO: アップロード後の画像表示

      this.file = null
      this.fileUrl = null
      this.returnTop()
    },
    returnTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
  },
})
</script>