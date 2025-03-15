<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  TagsInputRoot,
  type TagsInputRootEmits,
  type TagsInputRootProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { BorderHover } from '../border-hover'

import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  TagsInputRootProps & { class?: HTMLAttributes['class']; containerClass?: HTMLAttributes['class'] }
>()
const emits = defineEmits<TagsInputRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <border-hover :class="containerClass">
    <TagsInputRoot
      v-bind="forwarded"
      :class="
        cn(
          'flex flex-wrap gap-2 items-center rounded-md bg-gray-50 group-hover/input:shadow-none focus-within:outline-none focus-within:ring-[2px]  focus-within:ring-neutral-400 shadow-md px-3 py-2 text-sm',
          props.class,
        )
      "
    >
      <slot />
    </TagsInputRoot>
  </border-hover>
</template>
