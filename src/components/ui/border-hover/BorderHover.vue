<!-- Uses base code from shadcn-vue Input component and extends it's functionality-->
<template>
  <div
    ref="containerRef"
    :class="cn('group/input rounded-lg p-[2px] transition duration-300', props.class)"
    :style="{
      background: containerBg,
    }"
    @mouseenter="() => (visible = true)"
    @mouseleave="() => (visible = false)"
    @mousemove="handleMouseMove"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { ref, computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const mouse = ref<{ x: number; y: number }>({ x: 0, y: 0 })
const radius = 100
const visible = ref(false)

const containerBg = computed(() => {
  return `
        radial-gradient(
          ${visible.value ? radius + 'px' : '0px'} circle at ${mouse.value.x}px ${mouse.value.y}px,
          hsl(var(--destructive)),
          transparent 80%
        )
      `
})

function handleMouseMove({ clientX, clientY }: MouseEvent) {
  if (!containerRef.value) return

  const { left, top } = containerRef.value.getBoundingClientRect()
  mouse.value = { x: clientX - left, y: clientY - top }
}
</script>
