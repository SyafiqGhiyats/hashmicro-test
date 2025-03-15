<script lang="ts" setup>
import { Card, CardContent } from '@/components/ui/card'
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-3xl">
      <div class="flex flex-col gap-6">
        <Card class="overflow-hidden">
          <CardContent class="grid p-0 md:grid-cols-2">
            <router-view></router-view>
            <div class="relative hidden bg-destructive md:block">
              <img
                src="https://www.hashmicro.com/assets/logo/logo-hashmicro-white.webp"
                alt="Image"
                class="absolute inset-0 h-full w-full object-contain p-4"
              />
            </div>
          </CardContent>
        </Card>
        <div
          class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary"
        >
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and
          <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  </div>
</template>
