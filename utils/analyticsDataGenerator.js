export class AnalyticsDataGenerator {
  constructor() {
    this.visitors = this.generateVisitorProfiles()
    this.sessions = this.generateSessions()
    this.campaigns = this.generateCampaigns()
  }

  generateVisitorProfiles(count = 5000) {
    const profiles = []
    const firstNames = ['Alex', 'Sarah', 'Mike', 'Emma', 'David', 'Lisa', 'John', 'Maria', 'Chris', 'Anna']
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']
    const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA']
    const interests = ['fashion', 'home', 'kids', 'sports', 'electronics', 'books', 'beauty', 'health', 'travel', 'food']
    const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+']
    const devices = ['desktop', 'mobile', 'tablet']
    
    for (let i = 0; i < count; i++) {
      const cityIndex = Math.floor(Math.random() * cities.length)
      profiles.push({
        id: `visitor_${i + 1}`,
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        email: `user${i + 1}@example.com`,
        address: {
          street: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Pine', 'Park', 'First'][Math.floor(Math.random() * 5)]} St`,
          city: cities[cityIndex],
          state: states[cityIndex],
          zipCode: String(Math.floor(Math.random() * 90000) + 10000)
        },
        demographics: {
          age: ageGroups[Math.floor(Math.random() * ageGroups.length)],
          income: Math.floor(Math.random() * 150000) + 25000,
          device: devices[Math.floor(Math.random() * devices.length)]
        },
        interests: this.shuffleArray(interests).slice(0, Math.floor(Math.random() * 4) + 1),
        behaviorScore: Math.floor(Math.random() * 100) + 1,
        lifetimeValue: Math.floor(Math.random() * 2000) + 50,
        lastVisit: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        totalSessions: Math.floor(Math.random() * 50) + 1,
        totalOrders: Math.floor(Math.random() * 10),
        avgOrderValue: Math.floor(Math.random() * 200) + 25,
        preferredCategories: this.shuffleArray(['womens', 'mens', 'kids', 'home', 'clearance']).slice(0, 2)
      })
    }
    
    return profiles
  }

  generateSessions(count = 15000) {
    const sessions = []
    const sources = ['direct', 'paid_search', 'postcard', 'social_media', 'email', 'organic_search']
    const pages = ['/category/womens', '/category/mens', '/category/kids', '/category/home', '/pages/clearance', '/product/']
    const browsers = ['Safari iOS', 'Chrome Desktop', 'Firefox Desktop', 'Chrome Android', 'Safari Desktop']
    
    for (let i = 0; i < count; i++) {
      const visitor = this.visitors[Math.floor(Math.random() * this.visitors.length)]
      const sessionStart = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      const duration = Math.floor(Math.random() * 1800) + 30 // 30 seconds to 30 minutes
      
      sessions.push({
        id: `session_${i + 1}`,
        visitorId: visitor.id,
        timestamp: sessionStart,
        duration: duration,
        pages: Math.floor(Math.random() * 10) + 1,
        source: sources[Math.floor(Math.random() * sources.length)],
        browser: browsers[Math.floor(Math.random() * browsers.length)],
        device: visitor.demographics.device,
        landingPage: pages[Math.floor(Math.random() * pages.length)] + (Math.random() > 0.7 ? `item-${Math.floor(Math.random() * 100)}` : ''),
        bounced: Math.random() < 0.32,
        converted: Math.random() < 0.034,
        cartValue: Math.random() < 0.3 ? Math.floor(Math.random() * 500) + 25 : 0,
        location: {
          city: visitor.address.city,
          state: visitor.address.state
        }
      })
    }
    
    return sessions
  }

  generateCampaigns() {
    return [
      {
        id: 'camp_001',
        name: 'Holiday Comeback Campaign',
        type: 'postcard',
        status: 'active',
        audience: 'abandoned_cart',
        createdDate: new Date('2024-12-01'),
        targetCount: 2500,
        sentCount: 2347,
        responseRate: 0.12,
        conversionRate: 0.045,
        roas: 3.8,
        spend: 4200,
        revenue: 15960,
        design: {
          template: 'holiday_special',
          offer: '25% off your cart',
          cta: 'Complete Your Order'
        }
      },
      {
        id: 'camp_002', 
        name: 'New Year Winback',
        type: 'postcard',
        status: 'active',
        audience: 'lapsed_customers',
        createdDate: new Date('2024-12-15'),
        targetCount: 1800,
        sentCount: 1650,
        responseRate: 0.08,
        conversionRate: 0.032,
        roas: 2.9,
        spend: 2975,
        revenue: 8628,
        design: {
          template: 'new_year_fresh',
          offer: 'Free shipping + 20% off',
          cta: 'Shop New Arrivals'
        }
      },
      {
        id: 'camp_003',
        name: 'VIP Customer Appreciation',
        type: 'postcard',
        status: 'completed',
        audience: 'high_value',
        createdDate: new Date('2024-11-15'),
        targetCount: 500,
        sentCount: 485,
        responseRate: 0.18,
        conversionRate: 0.09,
        roas: 5.2,
        spend: 1200,
        revenue: 6240,
        design: {
          template: 'vip_exclusive',
          offer: 'Exclusive 30% off',
          cta: 'Shop VIP Collection'
        }
      }
    ]
  }

  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  getVisitorBehaviorInsights() {
    const highValueVisitors = this.visitors.filter(v => v.lifetimeValue > 500)
    const abandonedCartSessions = this.sessions.filter(s => s.cartValue > 0 && !s.converted)
    const returningVisitors = this.visitors.filter(v => v.totalSessions > 5)
    const mobileUsers = this.sessions.filter(s => s.device === 'mobile')
    
    return {
      totalVisitors: this.visitors.length,
      totalSessions: this.sessions.length,
      highValueVisitors: highValueVisitors.length,
      abandonedCartSessions: abandonedCartSessions.length,
      returningVisitors: returningVisitors.length,
      mobileTraffic: (mobileUsers.length / this.sessions.length * 100).toFixed(1),
      avgSessionDuration: Math.round(this.sessions.reduce((acc, s) => acc + s.duration, 0) / this.sessions.length),
      conversionRate: (this.sessions.filter(s => s.converted).length / this.sessions.length * 100).toFixed(2),
      bounceRate: (this.sessions.filter(s => s.bounced).length / this.sessions.length * 100).toFixed(1)
    }
  }

  getAudienceSegments() {
    const segments = {
      abandonedCart: {
        name: 'Abandoned Cart',
        description: 'Visitors who added items to cart but didn\'t complete purchase',
        size: this.sessions.filter(s => s.cartValue > 0 && !s.converted).length,
        avgCartValue: Math.round(this.sessions.filter(s => s.cartValue > 0 && !s.converted)
          .reduce((acc, s) => acc + s.cartValue, 0) / this.sessions.filter(s => s.cartValue > 0 && !s.converted).length),
        potential: 'high'
      },
      highValue: {
        name: 'High Value Customers',
        description: 'Customers with lifetime value > $500',
        size: this.visitors.filter(v => v.lifetimeValue > 500).length,
        avgLTV: Math.round(this.visitors.filter(v => v.lifetimeValue > 500)
          .reduce((acc, v) => acc + v.lifetimeValue, 0) / this.visitors.filter(v => v.lifetimeValue > 500).length),
        potential: 'very_high'
      },
      lapsed: {
        name: 'Lapsed Customers',
        description: 'Previous customers who haven\'t visited in 30+ days',
        size: this.visitors.filter(v => v.totalOrders > 0 && 
          (Date.now() - v.lastVisit.getTime()) / (1000 * 60 * 60 * 24) > 30).length,
        avgPreviousOrders: 2.4,
        potential: 'medium'
      },
      newVisitors: {
        name: 'New Visitors',
        description: 'First-time visitors in the last 7 days',
        size: this.visitors.filter(v => v.totalSessions === 1 && 
          (Date.now() - v.lastVisit.getTime()) / (1000 * 60 * 60 * 24) <= 7).length,
        conversionRate: 1.2,
        potential: 'medium'
      }
    }
    
    return segments
  }

  getCampaignPerformance() {
    return this.campaigns.map(campaign => ({
      ...campaign,
      insights: this.generateCampaignInsights(campaign)
    }))
  }

  generateCampaignInsights(campaign) {
    const insights = []
    
    if (campaign.responseRate > 0.1) {
      insights.push(`Strong ${(campaign.responseRate * 100).toFixed(1)}% response rate - audience is highly engaged`)
    }
    
    if (campaign.roas > 4) {
      insights.push(`Excellent ROAS of ${campaign.roas}x - highly profitable campaign`)
    } else if (campaign.roas < 2) {
      insights.push(`Low ROAS of ${campaign.roas}x - consider optimizing offer or audience`)
    }
    
    if (campaign.conversionRate > 0.05) {
      insights.push(`High conversion rate of ${(campaign.conversionRate * 100).toFixed(1)}% indicates strong product-market fit`)
    }
    
    return insights
  }
}

export const analyticsData = new AnalyticsDataGenerator()