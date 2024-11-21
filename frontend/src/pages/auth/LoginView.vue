<script setup>
import GuestLayout from '@/layouts/GuestLayout.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

defineProps({
  canResetPassword: {
    type: Boolean,
  },
  status: {
    type: String,
  },
})

const schema = toTypedSchema(
  yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
    remember: yup.boolean().default(false),
  }),
)

const { errors, isSubmitting, defineField, handleSubmit, setFieldError } = useForm({
  validationSchema: schema,
  initialValues: {
    email: import.meta.env.VITE_DEFAULT_EMAIL ?? '',
    password: import.meta.env.VITE_DEFAULT_PASSWORD ?? '',
    remember: false,
  },
})

const [email, emailProps] = defineField('email', { validateOnModelUpdate: false })
const [password, passwordProps] = defineField('password', { validateOnModelUpdate: false })
const [remember, rememberProps] = defineField('remember', { validateOnModelUpdate: false })

const submit = handleSubmit(async (values) => {
  try {
    await authStore.login(values)
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

      <VFormField :error="errors.remember" name="remember">
        <VCheckbox name="remember" v-model:checked="remember" v-bind="rememberProps" />
        <label class="ms-2 text-muted">Remember me</label>
      </VFormField>

      <div class="mt-4 hstack">
        <RouterLink v-if="true" :to="{ name: 'forgot-password' }" class="text-muted small">
          Forgot your password?
        </RouterLink>

        <VButton class="ms-auto" type="submit" variant="primary" :loading="isSubmitting">
          Log in
        </VButton>
      </div>

      <div class="mt-4 hstack gap-2 justify-content-center">
        <span class="text-muted">Don't have an account?</span>
        <RouterLink :to="{ name: 'register' }"> Sign up </RouterLink>
      </div>
    </form>
  </GuestLayout>
</template>
