<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
</script>

<template>
  <AuthenticatedLayout>
    <template #headerBtn>
      <button class="btn btn-primary">Add User</button>
    </template>

    <div class="container bg-white p-4">
      <h1>Hello</h1>
      <div class="p-6 text-gray-900">You're logged in!</div>
    </div>
  </AuthenticatedLayout>
</template>
