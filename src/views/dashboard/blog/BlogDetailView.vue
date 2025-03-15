<script lang="ts">
export const description = 'Blog post details'
</script>

<script setup lang="ts">
import { Editor as EditorClass } from '@tiptap/core'
import { ref, onMounted, useTemplateRef } from 'vue'
import { format } from 'date-fns'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Pencil } from 'lucide-vue-next'
import { defaultContent } from '@/lib/default-content'
import type { Blog } from '@/types/blog'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string
const post = ref<Blog | null>(null)
const loading = ref(true)
const editorRef = useTemplateRef<{ editor: EditorClass }>('editorRef')

// Mock data fetch - would be replaced with actual API call
onMounted(async () => {
  // Simulate API call delay

  setTimeout(() => {
    editorRef.value?.editor.setEditable(false)
    // Find post by slug from mock data
    post.value = {
      id: '5',
      slug: 'hris-cloud',
      title: 'Apa itu HRIS Cloud dalam Manajemen SDM Perusahaan?',
      status: 'PUBLISHED',
      author: {
        name: 'William Wijaya',
      },
      featuredImage:
        'https://www.hashmicro.com/id/blog/wp-content/uploads/2025/03/HRIS-Cloud-HashMicro-696x385.webp',
      description:
        'Optimalisasi pengelolaan sumber daya manusia (SDM) menjadi prioritas bagi perusahaan untuk meningkatkan efisiensi. Salah satu inovasi signifikan dalam pengelolaan sumber daya manusia (SDM) adalah HRIS cloud.',
      content: defaultContent,
      tags: ['HR', 'Cloud', 'HRIS'],
      createdAt: '2025-03-01T16:30:00Z',
      count: {
        comments: 12,
        likes: 29,
      },
    }
    loading.value = false
  }, 500)
})

const goBack = () => {
  router.push('/blog')
}

const goToEdit = () => {
  router.push(`/blog/edit/${slug}`)
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <Button variant="ghost" @click="goBack" class="gap-2">
        <ArrowLeft class="h-4 w-4" /> Back to Blog List
      </Button>
      <Button @click="goToEdit" v-if="post" class="gap-2">
        <Pencil class="h-4 w-4" /> Edit Post
      </Button>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="post" class="space-y-6">
      <div class="flex items-center gap-3">
        <Badge
          :variant="
            post.status === 'PUBLISHED'
              ? 'default'
              : post.status === 'DRAFT'
                ? 'outline'
                : 'secondary'
          "
        >
          {{ post.status }}
        </Badge>
        <span class="text-muted-foreground">{{
          format(new Date(post.createdAt), 'MMMM d, yyyy')
        }}</span>
      </div>

      <h1 class="text-3xl font-bold">{{ post.title }}</h1>

      <div class="flex items-center text-muted-foreground">
        <span>By {{ post.author.name }}</span>
        <span class="mx-2">•</span>
        <span>{{ post.count.comments }} comments</span>
        <span class="mx-2">•</span>
        <span>{{ post.count.likes }} likes</span>
      </div>

      <div class="flex gap-2 flex-wrap">
        <Badge v-for="tag in post.tags" :key="tag" variant="outline">
          {{ tag }}
        </Badge>
      </div>

      <div class="rounded-lg overflow-hidden">
        <img :src="post.featuredImage" :alt="post.title" class="w-full h-auto object-cover" />
      </div>

      <Editor ref="editorRef" :defaultValue="post.content" />
    </div>

    <div v-else class="py-12 text-center">
      <h2 class="text-xl font-bold">Post not found</h2>
      <p class="text-muted-foreground mt-2">
        The blog post you're looking for doesn't exist or has been removed.
      </p>
      <Button @click="goBack" class="mt-6">Return to Blog List</Button>
    </div>
  </div>
</template>
