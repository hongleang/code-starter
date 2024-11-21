import { defineRule } from 'vee-validate'
import { all } from '@vee-validate/rules'
import { setLocale } from 'yup'

Object.entries(all).forEach(([name, rule]) => {})

setLocale({
  mixed: {
    required: ({ path }) => `The ${path} field is required`,
    default: 'Invalid value',
  },
  string: {
    email: 'Please enter a valid email address',
    min: ({ min }) => `Must be at least ${min} characters`,
    max: ({ max }) => `Must be at most ${max} characters`,
  },
  number: {
    min: ({ min }) => `Must be greater than or equal to ${min}`,
    max: ({ max }) => `Must be less than or equal to ${max}`,
  },
  date: {
    min: ({ min }) => `Date must be after ${min}`,
    max: ({ max }) => `Date must be before ${max}`,
  },
})
