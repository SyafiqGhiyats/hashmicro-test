<script lang="ts">
export const description = 'List blog page'
</script>
<script setup lang="ts">
import { ref } from 'vue'
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
import { EllipsisVertical, Eye, Pencil, Trash2 } from 'lucide-vue-next'

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
      tags: ['Manufacturing', 'Software', 'Bill of Materials'],
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
      tags: ['Accounting', 'Tax', 'Invoice'],
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

// Methods
const handleStatusChange = (postId: string, status: string) => {
  // Implementation of status change logic
  const post = blogData.value.posts.find((p) => p.id === postId)
  if (post) {
    post.status = status
  }
}

const setPostToDelete = (postId: string) => {
  // Implementation of delete post logic
  if (confirm('Are you sure you want to delete this post?')) {
    blogData.value.posts = blogData.value.posts.filter((p) => p.id !== postId)
  }
}
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card
        v-for="post in blogData.posts"
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
                <Link :to="`/blog/view/${post.slug}`">
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
                @click="handleStatusChange(post.id, 'PUBLISHED')"
                :disabled="post.status === 'PUBLISHED'"
              >
                Mark as Published
              </DropdownMenuItem>
              <DropdownMenuItem
                @click="handleStatusChange(post.id, 'DRAFT')"
                :disabled="post.status === 'DRAFT'"
              >
                Mark as Draft
              </DropdownMenuItem>
              <DropdownMenuItem
                @click="handleStatusChange(post.id, 'ARCHIVED')"
                :disabled="post.status === 'ARCHIVED'"
              >
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="setPostToDelete(post.id)"
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
  </div>
</template>
