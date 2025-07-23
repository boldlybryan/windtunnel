export const useOnboarding = () => {
  const onboardingData = useState('onboarding', () => ({
    step: 1,
    businessDetails: {
      industry: '',
      businessModel: '',
      teamSize: ''
    },
    marketing: {
      adSpend: '',
      primaryGoal: '',
      monthlyUniques: ''
    },
    tools: []
  }))

  const isCompleted = useState('onboarding-completed', () => false)

  const updateBusinessDetails = (data) => {
    onboardingData.value.businessDetails = { ...onboardingData.value.businessDetails, ...data }
  }

  const updateMarketing = (data) => {
    onboardingData.value.marketing = { ...onboardingData.value.marketing, ...data }
  }

  const updateTools = (tools) => {
    onboardingData.value.tools = tools
  }

  const setStep = (step) => {
    onboardingData.value.step = step
  }

  const nextStep = () => {
    if (onboardingData.value.step < 3) {
      onboardingData.value.step++
    }
  }

  const prevStep = () => {
    if (onboardingData.value.step > 1) {
      onboardingData.value.step--
    }
  }

  const completeOnboarding = () => {
    isCompleted.value = true
    // Clear onboarding data after completion
    onboardingData.value = {
      step: 1,
      businessDetails: {
        industry: '',
        businessModel: '',
        teamSize: ''
      },
      marketing: {
        adSpend: '',
        primaryGoal: '',
        monthlyUniques: ''
      },
      tools: []
    }
  }

  const canProceedToStep = (step) => {
    switch (step) {
      case 2:
        return onboardingData.value.businessDetails.industry && 
               onboardingData.value.businessDetails.businessModel && 
               onboardingData.value.businessDetails.teamSize
      case 3:
        return onboardingData.value.marketing.adSpend && 
               onboardingData.value.marketing.primaryGoal && 
               onboardingData.value.marketing.monthlyUniques
      default:
        return true
    }
  }

  const getStepTitle = (step) => {
    switch (step) {
      case 1:
        return 'Business Details'
      case 2:
        return 'Marketing Plans'
      case 3:
        return 'Tools & Tech'
      default:
        return 'Business Details'
    }
  }

  return {
    onboardingData: readonly(onboardingData),
    isCompleted: readonly(isCompleted),
    updateBusinessDetails,
    updateMarketing,
    updateTools,
    setStep,
    nextStep,
    prevStep,
    completeOnboarding,
    canProceedToStep,
    getStepTitle
  }
}