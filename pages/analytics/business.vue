<template>
  <div class="analytics-page">
    <!-- Time Period Selector -->
    <div class="time-selector">
      <UButton 
        v-for="period in timePeriods" 
        :key="period.value"
        :variant="selectedPeriod === period.value ? 'solid' : 'outline'"
        color="neutral"
        size="sm"
        @click="selectedPeriod = period.value"
      >
        {{ period.label }}
      </UButton>
    </div>

    <!-- Metrics Grid -->
    <div class="metrics-grid">
      <!-- Row 1 -->
      <div class="metric-item">
        <div class="metric-label">Revenue</div>
        <div class="metric-value">$2,847,392</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Profit</div>
        <div class="metric-value">$1,124,583</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">New Customers</div>
        <div class="metric-value">1,847</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Customer LTV</div>
        <div class="metric-value">$1,284</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Active Users</div>
        <div class="metric-value">42,891</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Growth Rate</div>
        <div class="metric-value">+12.4%</div>
      </div>
      
      <!-- Row 2 -->
      <div class="metric-item">
        <div class="metric-label">Avg. Order Value</div>
        <div class="metric-value">$184.32</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Customer Retention</div>
        <div class="metric-value">68.7%</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Churn Rate</div>
        <div class="metric-value">4.2%</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">CAC</div>
        <div class="metric-value">$42.18</div>
      </div>
    </div>

    <!-- Tables Section -->
    <div class="tables-grid">
      <!-- Revenue by Channel -->
      <div class="table-card">
        <h3 class="table-title">Revenue by Channel</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in revenueByChannel" :key="item.channel">
              <td class="table-label">{{ item.channel }}</td>
              <td class="table-value">${{ item.revenue.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Top Products -->
      <div class="table-card">
        <h3 class="table-title">Top Products</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in topProducts" :key="item.product">
              <td class="table-label">{{ item.product }}</td>
              <td class="table-value">${{ item.sales.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Customer Segments -->
      <div class="table-card">
        <h3 class="table-title">Customer Segments</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in customerSegments" :key="item.segment">
              <td class="table-label">{{ item.segment }}</td>
              <td class="table-value">{{ item.count.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Regional Performance -->
      <div class="table-card">
        <h3 class="table-title">Regional Performance</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in regionalPerformance" :key="item.region">
              <td class="table-label">{{ item.region }}</td>
              <td class="table-value">${{ item.revenue.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Payment Methods -->
      <div class="table-card">
        <h3 class="table-title">Payment Methods</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in paymentMethods" :key="item.method">
              <td class="table-label">{{ item.method }}</td>
              <td class="table-value">{{ item.percentage }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'sidebar'
})

const selectedPeriod = ref('7d')

const timePeriods = [
  { label: '7d', value: '7d' },
  { label: '14d', value: '14d' },
  { label: '28d', value: '28d' }
]

const revenueByChannel = ref([
  { channel: 'E-commerce', revenue: 1284750 },
  { channel: 'Retail Stores', revenue: 894320 },
  { channel: 'Wholesale', revenue: 456890 },
  { channel: 'Marketplace', revenue: 234520 },
  { channel: 'Direct Sales', revenue: 187430 }
])

const topProducts = ref([
  { product: 'Premium Jacket', sales: 245780 },
  { product: 'Designer Boots', sales: 189540 },
  { product: 'Casual Dress', sales: 156320 },
  { product: 'Sports Sneakers', sales: 134890 },
  { product: 'Winter Coat', sales: 98760 }
])

const customerSegments = ref([
  { segment: 'VIP Customers', count: 2847 },
  { segment: 'Regular Customers', count: 8924 },
  { segment: 'New Customers', count: 5632 },
  { segment: 'At-Risk Customers', count: 1453 },
  { segment: 'Inactive Customers', count: 892 }
])

const regionalPerformance = ref([
  { region: 'North America', revenue: 1245890 },
  { region: 'Europe', revenue: 894320 },
  { region: 'Asia Pacific', revenue: 567430 },
  { region: 'South America', revenue: 234560 },
  { region: 'Middle East', revenue: 156780 }
])

const paymentMethods = ref([
  { method: 'Credit Card', percentage: 45.2 },
  { method: 'PayPal', percentage: 28.6 },
  { method: 'Apple Pay', percentage: 15.4 },
  { method: 'Bank Transfer', percentage: 7.8 },
  { method: 'Cash on Delivery', percentage: 3.0 }
])
</script>

<style scoped>
.analytics-page {
  padding: 24px 32px;
  background: #FAFBFC;
  min-height: 100vh;
}

/* Time Selector */
.time-selector {
  margin-bottom: 32px;
  display: flex;
  gap: 0;
}

.time-selector button:first-child {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.time-selector button:last-child {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.time-selector button:not(:first-child):not(:last-child) {
  border-radius: 0 !important;
}

/* Metrics Grid - 12 column layout */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.metric-item {
  grid-column: span 2;
}

.metric-label {
  font-size: 12px;
  font-weight: 400;
  color: #6B7280;
  margin-bottom: 8px;
  line-height: 1;
}

.metric-value {
  font-size: 32px;
  font-weight: 600;
  color: #111827;
  line-height: 1;
  letter-spacing: -0.02em;
}

/* Tables Grid - 12 column layout */
.tables-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

.table-card {
  grid-column: span 4;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #F3F4F6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.table-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table td {
  padding: 4px 0;
}

.table-label {
  font-size: 14px;
  color: #6B7280;
  font-weight: 400;
}

.table-value {
  font-size: 14px;
  color: #111827;
  font-weight: 500;
  text-align: right;
}

/* Responsive */
@media (max-width: 1200px) {
  .table-card {
    grid-column: span 6;
  }
}

@media (max-width: 768px) {
  .analytics-page {
    padding: 16px;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(6, 1fr);
  }
  
  .metric-item {
    grid-column: span 3;
  }
  
  .table-card {
    grid-column: span 12;
    padding: 16px;
  }
  
  .metric-value {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .metrics-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .metric-item {
    grid-column: span 4;
  }
}
</style>