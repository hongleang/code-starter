<script setup>
import GuestLayout from '@/layouts/GuestLayout.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const schema = toTypedSchema(
  yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required("The password field is required."),
    password_confirmation: yup.string().required(),
  }),
)

const { errors, isSubmitting, defineField, handleSubmit, setFieldError } = useForm({
  validationSchema: schema,
  initialValues: {
    name: 'Hongleang',
    email: 'hongleang@email.com',
    password: 'SecretPassword',
    password_confirmation: 'SecretPassword',
  },
})

const [name, nameProps] = defineField('name', { validateOnModelUpdate: false })
const [email, emailProps] = defineField('email', { validateOnModelUpdate: false })
const [password, passwordProps] = defineField('password', { validateOnModelUpdate: false })
const [passwordConfirmation, passwordConfirmationProps] = defineField('password_confirmation', {
  validateOnModelUpdate: false,
})

const submit = handleSubmit(async (values) => {
  try {
    await authStore.register(values)
    router.push({ name: 'dashboard' })
  } catch (error) {
    if (error && error.status === 422) {
      const errors = error.data.errors
      for (const [key, value] of Object.entries(errors)) {
        setFieldError(key, value)
      }
    }
  }
})
</script>

<template>
  <GuestLayout>
    <form @submit.prevent="submit">
      <VFormField :error="errors.name" name="name" label="Name">
        <VTextInput :class="{ 'is-invalid': errors.name }" v-model="name" v-bind="nameProps" />
      </VFormField>

      <VFormField :error="errors.email" name="email" label="Email">
        <VTextInput :class="{ 'is-invalid': errors.email }" v-model="email" v-bind="emailProps" />
      </VFormField>

      <VFormField :error="errors.password" name="password" label="Password">
        <VTextInput
          :class="{ 'is-invalid': errors.password }"
          type="password"
          v-model="password"
          v-bind="passwordProps"
        />
      </VFormField>

      <VFormField :error="errors.password_confirmation" name="password_confirmation" label="Confirm Password">
        <VTextInput
          :class="{ 'is-invalid': errors.password_confirmation }"
          type="password"
          v-model="passwordConfirmation"
          v-bind="passwordConfirmationProps"
        />
      </VFormField>

      <div class="mt-4 hstack">
        <RouterLink :to="{ name: 'login' }" class="text-muted small"> Already registered? </RouterLink>

        <VButton class="ms-auto" type="submit" variant="primary" :loading="isSubmitting">
          Register
        </VButton>
      </div>
    </form>
  </GuestLayout>
</template>
