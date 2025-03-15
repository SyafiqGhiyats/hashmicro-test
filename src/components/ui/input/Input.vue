<!-- Uses base code from shadcn-vue Input component and extends it's functionality-->
<template>
  <border-hover :class="containerClass">
    <div
      class="flex w-full items-center rounded-md bg-gray-50 dark:bg-zinc-800 shadow-md dark:shadow-[0px_0px_1px_1px_var(--accent)] focus-within:ring-[2px] focus-within:ring-neutral-400 dark:focus-within:ring-neutral-600 transition duration-400 group-hover/input:shadow-none"
    >
      <slot name="prefix" />
      <input
        v-bind="$attrs"
        v-model="modelValue"
        :class="
          cn(
            `flex h-10 w-full border-none bg-transparent text-black dark:text-white rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent
            file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600
            focus-visible:outline-none
            disabled:cursor-not-allowed disabled:opacity-50`,
            props.class,
          )
        "
      />
    </div>
  </border-hover>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'
import { BorderHover } from '../border-hover'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  containerClass?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>
