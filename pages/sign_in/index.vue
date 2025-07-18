<template>
  <div class="signin-page">
    <div class="signin-container">
      <!-- Left side - Sign in form -->
      <div class="signin-form-section">
        <!-- Logo -->
        <div class="signin-logo">
          <div class="logo-container">
            <div class="logo-icon">
              <svg class="logo-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3l1.09 2.09L15 6.09l-1.09 1.09L12 9.27l-1.09-2.09L9 6.09l1.09-1.09L12 3z"/>
              </svg>
            </div>
            <span class="logo-text">NAVISTONE</span>
          </div>
        </div>

        <!-- Sign in form -->
        <div class="signin-form-wrapper">
          <h1 class="signin-title">
            Log into your account
          </h1>

          <form @submit.prevent="handleSignIn" class="signin-form">
            <!-- Email field -->
            <div class="form-field">
              <label for="email" class="form-label">
                Email Address
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                placeholder="taylor@acmecorp.com"
              />
            </div>

            <!-- Login button -->
            <button
              type="submit"
              class="signin-button"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Loading...' : 'Login' }}
            </button>
          </form>

          <!-- Sign up link -->
          <p class="signin-footer">
            <span class="footer-text">Don't have an account?</span>
            <NuxtLink to="/sign_up" class="footer-link">Sign up</NuxtLink>
          </p>
        </div>
      </div>

      <!-- Right side - Promo image -->
      <div class="signin-promo-section">
        <div class="promo-gradient">
          <div class="promo-content">
            <div class="promo-text-wrapper">
              <p class="promo-text">
                Some fun Navistone promo graphics will go in here!!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const form = reactive({
  email: ''
})

const isLoading = ref(false)

const handleSignIn = async () => {
  isLoading.value = true
  
  try {
    // TODO: Implement actual authentication logic
    console.log('Sign in attempt with:', form.email)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to dashboard on success
    await navigateTo('/')
  } catch (error) {
    console.error('Sign in error:', error)
    // TODO: Handle error states
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.signin-page {
  height: 100vh;
  background-color: #1e2939;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem;
  box-sizing: border-box;
  overflow: hidden;
}

.signin-container {
  background-color: white;
  border-radius: 0.5rem;
  width: min(80rem, 90vw);
  height: min(54rem, 80vh);
  display: flex;
  overflow: hidden;
}

.signin-form-section {
  width: 50%;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.signin-logo {
  position: absolute;
  top: 2.5rem;
  left: 2.5rem;
}

.logo-container {
  display: flex;
  align-items: center;
  height: 2rem;
}

.logo-icon {
  width: 2rem;
  height: 2rem;
  background-color: #ff6900;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
}

.logo-svg {
  width: 1rem;
  height: 1rem;
  color: white;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2E3454;
}

.signin-form-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  max-width: 24rem;
  margin-left: 2.5rem;
}

.signin-title {
  font-size: 30px;
  font-weight: 700;
  color: #404040;
  margin-bottom: 2rem;
  line-height: 36px;
}

.signin-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #404040;
}

.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: white;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #ff6900;
  box-shadow: 0 0 0 2px rgba(255, 105, 0, 0.2);
}

.signin-button {
  width: 100%;
  background-color: #ff6900;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  box-sizing: border-box;
}

.signin-button:hover {
  background-color: #e55a00;
}

.signin-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.signin-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1rem;
  width: 100%;
}

.footer-text {
  color: #404040;
}

.footer-link {
  color: #ff6900;
  font-weight: 500;
  text-decoration: underline;
  margin-left: 0.25rem;
}

.signin-promo-section {
  width: 50%;
  position: relative;
  overflow: hidden;
  border-radius: 0 0.5rem 0.5rem 0;
}

.promo-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom right, #ff6900, #8b5cf6, #3b82f6);
}

.promo-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.promo-text-wrapper {
  text-align: center;
  color: white;
  max-width: 356px;
}

.promo-text {
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 40px;
  opacity: 0.75;
}
</style>