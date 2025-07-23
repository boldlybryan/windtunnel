export default defineNuxtRouteMiddleware((to, from) => {
  const { onboardingData, isCompleted, canProceedToStep } = useOnboarding()
  
  // If onboarding is completed, redirect to dashboard
  if (isCompleted.value && to.path.startsWith('/onboarding')) {
    return navigateTo('/')
  }
  
  // If not on onboarding path, allow navigation
  if (!to.path.startsWith('/onboarding')) {
    return
  }
  
  const currentStep = onboardingData.value.step
  
  // Route to step mapping
  const stepRoutes = {
    1: '/onboarding',
    2: '/onboarding/marketing',
    3: '/onboarding/tools',
    'complete': '/onboarding/complete'
  }
  
  // Allow access to current step
  if (to.path === stepRoutes[currentStep]) {
    return
  }
  
  // Allow access to completion page if all steps are done
  if (to.path === '/onboarding/complete' && currentStep === 3) {
    return
  }
  
  // Handle step navigation validation
  if (to.path === '/onboarding/marketing' && !canProceedToStep(2)) {
    return navigateTo('/onboarding')
  }
  
  if (to.path === '/onboarding/tools' && !canProceedToStep(3)) {
    return navigateTo('/onboarding/marketing')
  }
  
  // Default redirect to current step
  return navigateTo(stepRoutes[currentStep])
})