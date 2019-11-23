<template>
    <div id="chart" md="6">
      <apexchart
        ref="realtimeChart"
        type=line
        :options="chartOptions"
        :series="series"
      />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'

export default Vue.extend({
  name: 'Chart',
  components: {
    apexchart: VueApexCharts
  },
  props: ['series'],
  data: () => ({
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
          autoSelected: 'zoom'
        },
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        width: 100,
        height: 100
      },
      stroke: {
        width: [2, 2, 1, 2, 2, 1],
        dashArray: [0, 0, 5, 0, 0, 5]
      },
      xaxis: {
        type: 'datetime'
        // range: 1000
      },
      yaxis: [
        {
          seriesName: 'Temperature',
          opposite: true,
          max: 70,
          min: 0,
          decimalsInFloat: 0,
          legend: {
            show: true
          }
        },
        {
          seriesName: 'Input current',
          max: 5,
          min: 0,
          decimalsInFloat: 1,
          legend: {
            show: true
          }
        },
        {
          seriesName: 'Input power',
          opposite: true,
          max: 30,
          min: 0,
          decimalsInFloat: 0,
          legend: {
            show: true
          }
        },
        {
          seriesName: 'Voltage',
          max: 10,
          min: 0,
          decimalsInFloat: 0,
          legend: {
            show: true
          }
        },
        {
          seriesName: 'Output current',
          max: 2,
          min: 0,
          decimalsInFloat: 0,
          show: false,
          legend: {
            show: false
          }
        },
        {
          seriesName: 'Output power',
          opposite: true,
          show: false,
          max: 30,
          min: 0,
          decimalsInFloat: 0,
          legend: {
            show: false
          }
        }
      ]
    }
  }),
  mounted: function () {
    this.intervals()
  },
  methods: {
    intervals: function () {
      const self = this
      window.setInterval(function () {
        (self.$refs.realtimeChart as any).updateSeries(self.$props.series)
      }, 1000)
    }
  }
})
</script>

<style lang="css" scoped>
#chart, apexchart {
  width: 100%;
  min-height: 100px;
  max-height: 200px;
}
</style>
