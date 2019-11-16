<template>
  <v-container>
    <div id="chart">
      <apexchart ref="realtimeChart" type=line :options="chartOptions" :series="series" />
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'

export default Vue.extend({
  name: 'Chart',
  components: {
    apexchart: VueApexCharts
  },
  data: () => ({
    series: [{
      data: []
    }],
    chartOptions: {
      chart: {
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        width: '100px'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },

      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime'
        // range: 1000
      },
      yaxis: {
        max: 100,
        min: 20,
        decimalsInFloat: 0
      },
      legend: {
        show: false
      }
    }
  })
})
</script>

<style lang="css" scoped>
#chart {
  width: 100%;
  min-height: 500px;
}
</style>
