<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  type SidebarProps,
} from '@/components/ui/sidebar'
import { LifeBuoy, NewspaperIcon, Send } from 'lucide-vue-next'
import NavMain from './NavMain.vue'
import NavSecondary from './NavSecondary.vue'
import NavUser from './NavUser.vue'

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: 'inset',
})

const data = {
  user: {
    name: 'hashmicro client',
    email: 'client@hashmicro.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEukemtlQVTeKqTwcsimbHm11Pe7cqSQUcRdGds3QMK4aa8dtiKfanfOr625PKSpZnQYY&usqp=CAU',
  },
  navMain: [
    {
      title: 'Blog',
      url: '#',
      icon: NewspaperIcon,
      isActive: true,
      items: [
        {
          title: 'List Blog',
          url: '/blog',
        },
        {
          title: 'Buat Blog',
          url: '/blog/create',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem class="bg-white rounded-lg px-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/07/Hashmicro_logo.png"
            alt="HashMicro"
            class="object-contain"
          />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavSecondary :items="data.navSecondary" class="mt-auto" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
  </Sidebar>
</template>
