<template>
  <div class="signup-page">
    <div class="signup-container">
      <!-- Left side - Sign up form -->
      <div class="signup-form-section">
        <!-- Logo -->
        <div class="signup-logo">
          <div class="logo-container">
            <div class="logo-icon">
              <svg class="logo-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3l1.09 2.09L15 6.09l-1.09 1.09L12 9.27l-1.09-2.09L9 6.09l1.09-1.09L12 3z"/>
              </svg>
            </div>
            <span class="logo-text">NAVISTONE</span>
          </div>
        </div>

        <!-- Sign up form -->
        <div class="signup-form-wrapper">
          <h1 class="signup-title">
            Create your account
          </h1>

          <form @submit.prevent="handleSignUp" class="signup-form">
            <!-- Email field -->
            <div class="form-field">
              <label for="email" class="form-label">
                Email Address
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="form-input"
                placeholder="taylor@acmecorp.com"
              />
            </div>

            <!-- First Name field -->
            <div class="form-field">
              <label for="firstName" class="form-label">
                First Name
              </label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                class="form-input"
                placeholder="Taylor"
              />
            </div>

            <!-- Last Name field -->
            <div class="form-field">
              <label for="lastName" class="form-label">
                Last Name
              </label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                class="form-input"
                placeholder="Johnson"
              />
            </div>

            <!-- Sign up button -->
            <button
              type="submit"
              class="signup-button"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Loading...' : 'Sign up' }}
            </button>
          </form>

          <!-- Login link -->
          <p class="signup-footer">
            <span class="footer-text">Already have an account?</span>
            <NuxtLink to="/sign_in" class="footer-link">Log in</NuxtLink>
          </p>

          <!-- Terms and Privacy -->
          <p class="terms-text">
            By signing up, you agree to our 
            <a href="#" class="terms-link">Terms of Service</a> 
            and 
            <a href="#" class="terms-link">Privacy Policy</a>
          </p>
        </div>
      </div>

      <!-- Right side - Promo image -->
      <div class="signup-promo-section">
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
  email: '',
  firstName: '',
  lastName: ''
})

const isLoading = ref(false)

const handleSignUp = async () => {
  isLoading.value = true
  
  try {
    // TODO: Implement actual registration logic
    console.log('Sign up attempt with:', form)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to dashboard on success
    await navigateTo('/')
  } catch (error) {
    console.error('Sign up error:', error)
    // TODO: Handle error states
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.signup-page {
  height: 100vh;
  background-color: #1e2939;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem;
  box-sizing: border-box;
  overflow: hidden;
}

.signup-container {
  background-color: white;
  border-radius: 0.5rem;
  width: min(80rem, 90vw);
  height: min(54rem, 80vh);
  display: flex;
  overflow: hidden;
}

.signup-form-section {
  width: 50%;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.signup-logo {
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

.signup-form-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  max-width: 24rem;
  margin-left: 2.5rem;
}

.signup-title {
  font-size: 30px;
  font-weight: 700;
  color: #404040;
  margin-bottom: 2rem;
  line-height: 36px;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 1.5rem;
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

.signup-button {
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

.signup-button:hover {
  background-color: #e55a00;
}

.signup-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.signup-footer {
  text-align: center;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
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

.terms-text {
  text-align: center;
  font-size: 0.875rem;
  color: #737373;
  line-height: 1.25rem;
  width: 100%;
  max-width: 15rem;
  margin: 0 auto;
}

.terms-link {
  color: #737373;
  font-weight: 500;
  text-decoration: underline;
}

.signup-promo-section {
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