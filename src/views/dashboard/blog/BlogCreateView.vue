<script lang="ts">
export const description = 'Create a new blog post'
</script>

<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { FileUpload, FileUploadGrid } from '@/components/ui/file-upload'
import { Input } from '@/components/ui/input'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/input/tags-input'
import { Editor } from 'novel-vue'
import { ref, useTemplateRef } from 'vue'
import { defaultContent } from '@/lib/default-content'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import { Trash2Icon } from 'lucide-vue-next'

const tags = ref([])
const imageRef = useTemplateRef('imageRef')
const bannerImage = ref<null | File>(null)
const bannerImagePreview = ref<string | null>(null)
const router = useRouter()

function saveBlog() {
  toast.success('Blog saved successfully')
  router.push('/blog')
}

function onBannerImageChange(files: File[]) {
  if (files.length > 0) {
    bannerImage.value = files[0]
    bannerImagePreview.value = URL.createObjectURL(files[0])
  }
}

function clearBannerImage() {
  bannerImage.value = null
  bannerImagePreview.value = null
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between gap-2">
      <h1 class="font-bold text-2xl my-4">Create Blog</h1>
      <Button class="w-[200px]" @click="saveBlog"> Save </Button>
    </div>
    <form @submit.prevent="" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="title"> Title </label>
          <Input class="text-xl font-bold" id="title" placeholder="Enter blog title" />
        </div>

        <div>
          <label for="tags"> Tags </label>
          <TagsInput v-model="tags">
            <TagsInputItem v-for="item in tags" :key="item" :value="item">
              <TagsInputItemText />
              <TagsInputItemDelete />
            </TagsInputItem>

            <TagsInputInput placeholder="Press enter to continue..." />
          </TagsInput>
        </div>
      </div>
      <div>
        <div v-if="bannerImagePreview" class="mb-4">
          <div class="relative rounded-lg overflow-hidden">
            <img
              :src="bannerImagePreview"
              alt="Banner Preview"
              class="w-full h-auto object-cover"
            />
            <div class="absolute top-2 right-2 flex gap-2">
              <Button variant="destructive" size="icon" @click="clearBannerImage">
                <Trash2Icon />
              </Button>
            </div>
          </div>
        </div>
        <FileUpload
          ref="imageRef"
          v-else
          title="Upload Blog Banner"
          :multiple="false"
          accept="image/*"
          class="rounded-lg border-2 border-dashed border-neutral-200 dark:border-neutral-800"
          @on-change="onBannerImageChange"
        >
          <FileUploadGrid />
        </FileUpload>
      </div>
      <div>
        <label class="my-4">Content</label>
        <Editor
          :defaultValue="defaultContent"
          className="relative min-h-[500px] w-full mx-auto border-stone-200 bg-white p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
        />
      </div>
    </form>
  </div>
</template>
