<script setup>
import GuestLayout from '@/layouts/GuestLayout.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import http from '@/utils/http'

const schema = toTypedSchema(
  yup.object({
    email: yup.string().required().email(),
  }),
)

const { errors, isSubmitting, defineField, handleSubmit, setFieldError } = useForm({
  validationSchema: schema,
  initialValues: {
    email: 'hong@email.com',
  },
})

const [email, emailProps] = defineField('email', { validateOnModelUpdate: false })

const submit = handleSubmit(async (values) => {
  try {
    await http.post('/forgot-password', values)
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors
      for (const [key, value] of Object.entries(errors)) {
        setFieldError(key, value)
      }
    }
  }
})
</script>

<template>
  <GuestLayout>
    <div class="mb-4 text-muted">
      Forgot your password? No problem. Just let us know your email address and we will email you a
      password reset link that will allow you to choose a new one.
    </div>

    <form @submit.prevent="submit">
      <VFormField :error="errors.email" name="email" label="Email">
        <VTextInput :class="{ 'is-invalid': errors.email }" v-model="email" v-bind="emailProps" />
      </VFormField>

      <div class="mt-4 hstack justify-content-between">
        <RouterLink :to="{ name: 'login' }" class="text-muted small">
          Back to login
        </RouterLink>
        
        <VButton class="ms-auto" type="submit" variant="primary" :loading="isSubmitting">
          Email Password Reset Link
        </VButton>
      </div>
    </form>
  </GuestLayout>
</template>
