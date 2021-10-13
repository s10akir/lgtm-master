import { mount } from '@vue/test-utils'
import ImageUploadForm from '@/components/ImageUploadForm.vue'

describe('ImageUploadForm', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(ImageUploadForm)
    expect(wrapper.vm).toBeTruthy()
  })
})
