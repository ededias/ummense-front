<template>
  <div
    v-if="visible"
    :class="alertClasses"
    class="relative px-4 py-3 rounded-lg border transition-all duration-300 ease-in-out"
    role="alert"
  >
    <!-- Icon -->
    <div class="flex items-start">
      <div class="flex-shrink-0 mr-3">
        <svg
          v-if="type === 'success'"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else-if="type === 'error'"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else-if="type === 'warning'"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <!-- Content -->
      <div class="flex-1">
        <h3 v-if="title" class="font-medium text-sm mb-1">
          {{ title }}
        </h3>
        <div class="text-sm">
          <slot>
            {{ message }}
          </slot>
        </div>
        
        <!-- Action buttons -->
        <div v-if="showConfirmButton || showCancelButton" class="mt-3 flex gap-2">
          <button
            v-if="showConfirmButton"
            @click="confirm"
            :class="confirmButtonClasses"
            class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            {{ confirmText }}
          </button>
          <button
            v-if="showCancelButton"
            @click="cancel"
            class="px-3 py-1.5 text-xs font-medium rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            :class="cancelButtonClasses"
          >
            {{ cancelText }}
          </button>
        </div>
      </div>

      <!-- Close button -->
      <button
        v-if="dismissible"
        @click="dismiss"
        class="flex-shrink-0 ml-4 p-1 rounded-md hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
        :class="closeButtonClasses"
      >
        <span class="sr-only">Dismiss</span>
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    },
    autoDismiss: {
      type: [Boolean, Number],
      default: false
    },
    showConfirmButton: {
      type: Boolean,
      default: false
    },
    showCancelButton: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    }
  },
  data() {
    return {
      visible: this.show
    }
  },
  computed: {
    alertClasses() {
      const baseClasses = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800'
      }
      return baseClasses[this.type] || baseClasses.info
    },
    closeButtonClasses() {
      const classes = {
        success: 'text-green-500 hover:text-green-700 focus:ring-green-500',
        error: 'text-red-500 hover:text-red-700 focus:ring-red-500',
        warning: 'text-yellow-500 hover:text-yellow-700 focus:ring-yellow-500',
        info: 'text-blue-500 hover:text-blue-700 focus:ring-blue-500'
      }
      return classes[this.type] || classes.info
    },
    confirmButtonClasses() {
      const classes = {
        success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
        error: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
        warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500',
        info: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
      }
      return classes[this.type] || classes.info
    },
    cancelButtonClasses() {
      const classes = {
        success: 'border-green-300 text-green-700 hover:bg-green-50',
        error: 'border-red-300 text-red-700 hover:bg-red-50',
        warning: 'border-yellow-300 text-yellow-700 hover:bg-yellow-50',
        info: 'border-blue-300 text-blue-700 hover:bg-blue-50'
      }
      return classes[this.type] || classes.info
    }
  },
  watch: {
    show(newVal) {
      this.visible = newVal
    }
  },
  mounted() {
    if (this.autoDismiss) {
      const delay = typeof this.autoDismiss === 'number' ? this.autoDismiss : 5000
      setTimeout(() => {
        this.dismiss()
      }, delay)
    }
  },
  methods: {
    dismiss() {
      this.visible = false
      this.$emit('dismiss')
    },
    confirm() {
      this.$emit('confirm')
      if (!this.showCancelButton) {
        this.dismiss()
      }
    },
    cancel() {
      this.$emit('cancel')
      this.dismiss()
    }
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>