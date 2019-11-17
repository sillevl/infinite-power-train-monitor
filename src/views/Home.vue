<template>
  <v-container>
    <v-row>
      <Panel title="Voltage" :value="voltage" unit="V" />
      <Panel title="Input current" :value="input_current" unit="A" />
      <Panel title="Input power" :value="input_power" unit="W" />
      <Panel title="Temperature" :value="temperature" unit="°C" />
      <Panel title="Output current" :value="output_current" unit="A" />
      <Panel title="Output power" :value="output_power" unit="W" />
    </v-row>
    <v-row>
      <Chart :series="series"/>
    </v-row>
  </v-container>
</template>

<script>
import Chart from '@/components/Chart'
import Panel from '@/components/Panel'

function oldData (value) {
  const threshold = new Date(Date.now() - 5 * 60 * 1000)
  return value.x > threshold
}

export default {
  name: 'home',
  components: {
    Chart,
    Panel
  },

  data: () => ({
    temperature: 0,
    voltage: 0,
    input_current: 0,
    input_power: 0,
    output_current: 0,
    output_power: 0,

    series: [
      { name: 'Temperature', data: [] },
      { name: 'Input current', data: [] },
      { name: 'Input power', data: [] },
      { name: 'Voltage', data: [] },
      { name: 'Output current', data: [] },
      { name: 'Output power', data: [] }
    ]
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

      this.$data.series[0].data.push({ x: new Date(), y: data.temperature })
      this.filter()
    },
    'infinite-train/power-in': function (message) {
      let json = (new TextDecoder('utf-8').decode(message))
      let data = JSON.parse(json)
      this.$data.voltage = (data['load-voltage']).toFixed(1)
      this.$data.input_current = (data.current / 1000).toFixed(1)
      this.$data.input_power = (data.power / 1000).toFixed(1)

      this.$data.series[1].data.push({ x: new Date(), y: data.current / 1000 })
      this.$data.series[2].data.push({ x: new Date(), y: data.power / 1000 })
      this.$data.series[3].data.push({ x: new Date(), y: data['load-voltage'] })
    },
    'infinite-train/power-out': function (message) {
      let json = (new TextDecoder('utf-8').decode(message))
      let data = JSON.parse(json)
      this.$data.output_current = (data.current / 1000).toFixed(1)
      this.$data.output_power = (data.power / 1000).toFixed(1)

      this.$data.series[4].data.push({ x: new Date(), y: data.current / 1000 })
      this.$data.series[5].data.push({ x: new Date(), y: data.power / 1000 })
    }
  },

  methods: {
    filter: function () {
      this.$data.series[0].data = this.$data.series[0].data.filter(oldData)
      this.$data.series[1].data = this.$data.series[1].data.filter(oldData)
      this.$data.series[2].data = this.$data.series[2].data.filter(oldData)
      this.$data.series[3].data = this.$data.series[3].data.filter(oldData)
      this.$data.series[4].data = this.$data.series[4].data.filter(oldData)
      this.$data.series[5].data = this.$data.series[5].data.filter(oldData)
    }
  }
}
</script>
