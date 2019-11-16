<template>
  <v-container>
    <v-row>
      <v-col sm="6" md="4" lg="2">
        <v-card>
          <v-card-title>Input current</v-card-title>
          <v-card-text class="display-2 text-center">
            {{input_current}}<span class="display-1">A</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" md="4" lg="2">
        <v-card>
          <v-card-title>Input power</v-card-title>
          <v-card-text class="display-2 text-center">
            {{input_power}}<span class="display-1">W</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" md="4" lg="2">
        <v-card>
          <v-card-title>Voltage</v-card-title>
          <v-card-text class="display-2 text-center">
            {{voltage}}<span class="display-1">V</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" md="4" lg="2">
        <v-card>
          <v-card-title>Temperature</v-card-title>
          <v-card-text class="display-2 text-center">
            {{temperature}}<span class="display-1">°C</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" md="4" lg="2">
        <v-card>
          <v-card-title>Output current</v-card-title>
          <v-card-text class="display-2 text-center">
            {{output_current}}<span class="display-1">A</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" md="4" lg="2">
        <v-card>
          <v-card-title>Output power</v-card-title>
          <v-card-text class="display-2 text-center">
            {{output_power}}<span class="display-1">W</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <div id="chart">
        <apexchart ref="realtimeChart" type=line :options="chartOptions" :series="series" />
      </div>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'home',
  components: {
    apexchart: VueApexCharts
  },

  data: () => ({
    temperature: 0,
    voltage: 0,
    input_current: 0,
    input_power: 0,
    output_current: 0,
    output_power: 0,

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
  }),

  mounted () {
    this.$mqtt.subscribe('infinite-train/temperature')
    this.$mqtt.subscribe('infinite-train/power-in')
    this.$mqtt.subscribe('infinite-train/power-out')
  },

  mqtt: {
    'infinite-train/temperature': function (message) {
      let json = (new TextDecoder('utf-8').decode(message))
      let data = JSON.parse(json)
      this.$data.temperature = (data.temperature).toFixed(1)
      // console.log(data)

      this.$data.series[0].data.push({ x: new Date(), y: data.temperature })
      this.$refs.realtimeChart.updateSeries([{ data: this.$data.series[0].data }])
    },
    'infinite-train/power-in': function (message) {
      let json = (new TextDecoder('utf-8').decode(message))
      let data = JSON.parse(json)
      this.$data.voltage = (data['load-voltage']).toFixed(1)
      this.$data.input_current = (data.current / 1000).toFixed(1)
      this.$data.input_power = (data.power / 1000).toFixed(1)
      // console.log(data)
    },
    'infinite-train/power-out': function (message) {
      let json = (new TextDecoder('utf-8').decode(message))
      let data = JSON.parse(json)
      this.$data.output_current = (data.current / 1000).toFixed(1)
      this.$data.output_power = (data.power / 1000).toFixed(1)
      // console.log(data)
    }
  }
  // mqtt: {
  //   [topic]: function(message) {        // when a message arrives on our topic
  //     let json = (new TextDecoder("utf-8").decode(message))    // we need to convert (decode) the byte information to a text string
  //     let data = JSON.parse(json)       // parse the JSON format to an object
  //     this.$data.weather = data         //
  //   }
  // }
}
</script>

<style lang="css" scoped>
#chart {
  width: 100%;
  min-height: 500px;
}
</style>
