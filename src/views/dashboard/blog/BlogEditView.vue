<script lang="ts">
export const description = 'Edit blog post'
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
import { ref, onMounted } from 'vue'
import { toast } from 'vue-sonner'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Trash2Icon } from 'lucide-vue-next'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { defaultContent } from '@/lib/default-content'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

const title = ref('')
const tags = ref<string[]>([])
const bannerImage = ref<null | File>(null)
const bannerImagePreview = ref<string | null>(null)
const editorContent = ref()
const loading = ref(true)
const isDeleteDialogOpen = ref(false)

onMounted(async () => {
  setTimeout(() => {
    console.log(slug)

    title.value = 'Apa itu HRIS Cloud dalam Manajemen SDM Perusahaan?'
    tags.value = ['HR', 'Cloud', 'HRIS']
    bannerImagePreview.value =
      'https://www.hashmicro.com/id/blog/wp-content/uploads/2025/03/HRIS-Cloud-HashMicro-696x385.webp'
    editorContent.value = defaultContent
    loading.value = false
  }, 500)
})

function updateBlog() {
  toast.success('Blog updated successfully')
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

function goBack() {
  router.push('/blog')
}

function openDeleteDialog() {
  isDeleteDialogOpen.value = true
}

function deleteBlog() {
  toast.success('Blog deleted successfully')
  router.push('/blog')
  isDeleteDialogOpen.value = false
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between gap-2 mb-4">
      <div class="flex items-center gap-4">
        <Button variant="ghost" size="sm" @click="goBack">
          <ArrowLeft class="h-4 w-4 mr-2" /> Back
        </Button>
        <h1 class="font-bold text-2xl">Edit Blog</h1>
      </div>
      <div class="flex gap-2">
        <Button variant="destructive" @click="openDeleteDialog">Delete</Button>
        <Button @click="updateBlog">Update</Button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <form v-else @submit.prevent="updateBlog" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="title">Title</label>
          <Input
            class="text-xl font-bold"
            id="title"
            v-model="title"
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label for="tags">Tags</label>
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
          :defaultValue="editorContent"
          className="relative min-h-[500px] w-full mx-auto border-stone-200 bg-white p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
        />
      </div>
    </form>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog :open="isDeleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the blog post and remove all
            of its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" @click="isDeleteDialogOpen = false">Cancel</Button>
          <Button variant="destructive" @click="deleteBlog">Delete</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
