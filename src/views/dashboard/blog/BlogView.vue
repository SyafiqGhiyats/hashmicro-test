<script lang="ts">
export const description = 'List blog page'
</script>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import { RouterLink as Link } from 'vue-router'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EllipsisVertical, Eye, Pencil, Trash2, Search, X } from 'lucide-vue-next'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'

const blogData = ref({
  posts: [
    {
      id: '1',
      slug: 'build-to-order',
      title: 'Mengenal Build to Order (BTO): Definisi dan Peran bagi Bisnis',
      status: 'PUBLISHED',
      author: {
        name: 'Widi yulianto',
      },
      featuredImage:
        'https://www.hashmicro.com/id/blog/wp-content/uploads/2025/03/Mengenal-Build-to-Order-BTO-Definisi-dan-Peran-bagi-Bisnis-696x385.png.webp',
      description:
        'Apakah Anda sering memproduksi dalam jumlah besar, tetapi stok menumpuk karena sulit terjual? Produksi massal yang tidak tepat bisa menyebabkan pemborosan biaya, gudang penuh,...',
      content:
        'Apakah Anda sering memproduksi dalam jumlah besar, tetapi stok menumpuk karena sulit terjual? Produksi massal yang tidak tepat bisa menyebabkan pemborosan biaya, gudang penuh,...',
      tags: ['Business', 'Order'],
      createdAt: '2025-02-15T08:30:00Z',
      count: {
        comments: 24,
        likes: 56,
      },
    },
    {
      id: '2',
      slug: 'software-bill-of-materials',
      title: '7 Software Bill of Materials (SBoM) Terbaik untuk Manufaktur',
      status: 'PUBLISHED',
      author: {
        name: 'Nabila Zulfa Damayanti',
      },
      featuredImage:
        'https://www.hashmicro.com/id/blog/wp-content/uploads/2025/03/software-bill-of-materials-696x385.webp',
      description:
        'Software Bill of Materials (SBoM) adalah daftar terperinci yang mencatat semua komponen perangkat lunak yang digunakan dalam suatu aplikasi atau sistem.',
      content:
        'Software Bill of Materials (SBoM) adalah daftar terperinci yang mencatat semua komponen perangkat lunak yang digunakan dalam suatu aplikasi atau sistem.',
      tags: ['Manufacturing', 'Software', 'Bill of Materials', 'SBoM', 'Technology'],
      createdAt: '2025-02-28T14:15:00Z',
      count: {
        comments: 18,
        likes: 42,
      },
    },
    {
      id: '3',
      slug: 'jenis-faktur-pajak',
      title: 'Jenis Faktur Pajak: Definisi, Fungsi, dan Contohnya',
      status: 'DRAFT',
      author: {
        name: 'Dewi Sartika',
      },
      featuredImage:
        'https://www.hashmicro.com/id/blog/wp-content/uploads/2025/03/jenis-faktur-pajak-HashMicro-1-696x385.webp',
      description:
        'Apakah Anda sering kali bingung mengenai faktur pajak dan jenis-jenisnya? Faktur pajak lebih dari sekedar dokumen; ia berfungsi sebagai bukti legal dalam setiap transaksi yang dikenakan Pajak Pertambahan Nilai (PPN).',
      content:
        'Apakah Anda sering kali bingung mengenai faktur pajak dan jenis-jenisnya? Faktur pajak lebih dari sekedar dokumen; ia berfungsi sebagai bukti legal dalam setiap transaksi yang dikenakan Pajak Pertambahan Nilai (PPN).',
      tags: ['Accounting', 'Tax', 'Invoice', 'Document'],
      createdAt: '2025-03-05T11:20:00Z',
      count: {
        comments: 0,
        likes: 3,
      },
    },
    {
      id: '4',
      slug: 'biaya-peluang-pengertian-manfaat-dan-cara-menghitungnya',
      title: 'Biaya Peluang Adalah: Contoh & Rumus Cara Menghitungnya',
      status: 'ARCHIVED',
      author: {
        name: 'Anatha Ginting',
      },
      featuredImage:
        'https://www.hashmicro.com/id/blog/wp-content/uploads/2024/04/biaya-peluang-696x385.webp',
      description:
        'Tahukah Anda bahwa setiap keputusan bisnis selalu memiliki konsekuensi tersembunyi? Saat Anda memilih satu opsi, ada peluang lain yang harus Anda korbankan, dan inilah yang disebut biaya peluang.',
      content:
        'Tahukah Anda bahwa setiap keputusan bisnis selalu memiliki konsekuensi tersembunyi? Saat Anda memilih satu opsi, ada peluang lain yang harus Anda korbankan, dan inilah yang disebut biaya peluang.',
      tags: ['Business', 'Opportunity Cost', 'Economics'],
      createdAt: '2024-12-10T09:45:00Z',
      count: {
        comments: 32,
        likes: 87,
      },
    },
    {
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
      content:
        'Optimalisasi pengelolaan sumber daya manusia (SDM) menjadi prioritas bagi perusahaan untuk meningkatkan efisiensi. Salah satu inovasi signifikan dalam pengelolaan sumber daya manusia (SDM) adalah HRIS cloud.',
      tags: ['HR', 'Cloud', 'HRIS'],
      createdAt: '2025-03-01T16:30:00Z',
      count: {
        comments: 12,
        likes: 29,
      },
    },
  ],
})

const searchQuery = ref('')
const statusFilter = ref('')
const statusOptions = ['All', 'PUBLISHED', 'DRAFT', 'ARCHIVED']

const filteredPosts = computed(() => {
  let posts = blogData.value.posts

  if (statusFilter.value && statusFilter.value !== 'All') {
    posts = posts.filter((post) => post.status === statusFilter.value)
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
  }

  return posts
})

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
}

const isOpenAlert = ref(false)
const selectedPost = ref({
  postId: '',
  status: '',
})

const openAlert = (postId: string, status: string) => {
  isOpenAlert.value = true
  selectedPost.value = { postId, status }
}

const handleStatusChange = () => {
  const post = blogData.value.posts.find((p) => p.id === selectedPost.value.postId)
  if (post && selectedPost.value.status !== 'DELETED') {
    post.status = selectedPost.value.status
    toast.success('Post status updated successfully')
  }
  if (selectedPost.value.status === 'DELETED') {
    blogData.value.posts = blogData.value.posts.filter((p) => p.id !== selectedPost.value.postId)
    toast.success('Post deleted successfully')
  }
  isOpenAlert.value = false
}
</script>

<template>
  <div>
    <!-- Search and filter UI -->
    <h1 class="font-bold text-3xl mb-4">Blog list</h1>
    <div class="mb-6">
      <div class="flex items-center flex-col sm:!flex-row gap-4 mb-4">
        <Input
          v-model="searchQuery"
          placeholder="Search blogs..."
          container-class="max-w-[500px] w-full"
        >
          <template #prefix>
            <Search class="h-5 w-5 text-muted-foreground ml-3" />
          </template>
        </Input>
        <div class="flex justify-between sm:items-center gap-4 w-full">
          <div class="flex gap-2 sm:mt-1">
            <DropdownMenu>
              <DropdownMenuTrigger :asChild="true">
                <Button variant="outline" class="min-w-[120px]">
                  {{ statusFilter || 'All Status' }}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  v-for="status in statusOptions"
                  :key="status"
                  @click="statusFilter = status"
                >
                  {{ status }}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon" @click="resetFilters" title="Clear filters">
              <X class="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <router-link to="/blog/create"> Create Blog </router-link>
          </Button>
        </div>
      </div>

      <!-- Results summary -->
      <div class="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'result' : 'results' }}
          <span v-if="searchQuery || statusFilter">
            {{ searchQuery ? `for "${searchQuery}"` : '' }}
            {{ searchQuery && statusFilter ? 'and' : '' }}
            {{ statusFilter && statusFilter !== 'All' ? `with status "${statusFilter}"` : '' }}
          </span>
        </div>
        <div
          v-if="searchQuery || statusFilter"
          role="button"
          class="text-primary cursor-pointer"
          @click="resetFilters"
        >
          Clear filters
        </div>
      </div>
    </div>

    <!-- No results message -->
    <div v-if="filteredPosts.length === 0" class="text-center py-12">
      <h3 class="text-lg font-semibold">No blog posts found</h3>
      <p class="text-muted-foreground mt-2">
        Try adjusting your search or filter to find what you're looking for
      </p>
      <Button variant="outline" @click="resetFilters" class="mt-4">Clear filters</Button>
    </div>

    <!-- Blog posts grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card
        v-for="post in filteredPosts"
        :key="post.id"
        class="h-full flex flex-col relative group"
      >
        <!-- Action menu -->
        <div
          class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <DropdownMenu>
            <DropdownMenuTrigger :asChild="true">
              <Button variant="ghost" size="icon" class="h-8 w-8 bg-background/80 backdrop-blur-sm">
                <EllipsisVertical class="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem :asChild="true">
                <Link :to="`/blog/detail/${post.slug}`">
                  <Eye class="mr-2 h-4 w-4" />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem :asChild="true">
                <Link :to="`/blog/edit/${post.slug}`">
                  <Pencil class="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="openAlert(post.id, 'PUBLISHED')"
                :disabled="post.status === 'PUBLISHED'"
              >
                Mark as Published
              </DropdownMenuItem>
              <DropdownMenuItem
                @click="openAlert(post.id, 'DRAFT')"
                :disabled="post.status === 'DRAFT'"
              >
                Mark as Draft
              </DropdownMenuItem>
              <DropdownMenuItem
                @click="openAlert(post.id, 'ARCHIVED')"
                :disabled="post.status === 'ARCHIVED'"
              >
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="openAlert(post.id, 'DELETED')"
                class="text-destructive focus:text-destructive"
              >
                <Trash2 class="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link :to="`/blog/${post.slug}`" class="flex flex-col h-full">
          <div class="aspect-video w-full overflow-hidden rounded-t-md">
            <img
              :src="post.featuredImage"
              :alt="post.title"
              class="h-full w-full object-cover transition-all hover:scale-105"
            />
          </div>
          <CardHeader class="pb-2">
            <div class="flex justify-between items-start">
              <CardTitle class="text-lg line-clamp-2 mr-6">
                {{ post.title }}
              </CardTitle>
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
            </div>
            <p class="text-sm text-muted-foreground">By {{ post.author.name }}</p>
          </CardHeader>
          <CardContent class="flex-grow pb-2">
            <p class="text-sm text-muted-foreground line-clamp-3">
              {{ post.description || post.content.substring(0, 150) }}...
            </p>
            <div class="flex gap-2 mt-3 flex-wrap">
              <Badge
                v-for="(tag, index) in post.tags.slice(0, 3)"
                :key="index"
                variant="outline"
                class="text-xs"
              >
                {{ tag }}
              </Badge>
              <Badge v-if="post.tags.length > 3" variant="outline" class="text-xs">
                +{{ post.tags.length - 3 }} more
              </Badge>
            </div>
          </CardContent>
          <CardFooter class="pt-2 flex justify-between border-t text-xs text-muted-foreground">
            <span>
              {{ format(new Date(post.createdAt), 'MMM d, yyyy') }}
            </span>
            <div class="flex gap-3">
              <span>{{ post.count.comments }} comments</span>
              <span>{{ post.count.likes }} likes</span>
            </div>
          </CardFooter>
        </Link>
      </Card>
    </div>
    <AlertDialog :open="isOpenAlert">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
            {{
              selectedPost.status === 'DELETED'
                ? 'This will permanently delete your account and remove your data from our servers.'
                : 'Are you sure you want to change the status of this post?'
            }}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" @click="isOpenAlert = false">Cancel</Button>
          <Button
            :variant="selectedPost.status === 'DELETED' ? 'destructive' : 'default'"
            @click="handleStatusChange"
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
