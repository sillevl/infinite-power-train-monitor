<template>
  <v-container>
    <v-row>
      <v-col sm="6" md="4" lg="2">
        <v-card>
          <v-card-title>Input current</v-card-title>
          <v-card-text class="display-2 text-center">
            {{input_current}}A
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" md="4" lg="2">
        <v-card>
          <v-card-title>Input power</v-card-title>
          <v-card-text class="display-2 text-center">
            {{input_power}}W
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" md="4" lg="2">
        <v-card>
          <v-card-title>Voltage</v-card-title>
          <v-card-text class="display-2 text-center">
            {{voltage}}V
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" md="4" lg="2">
        <v-card>
          <v-card-title>Temperature</v-card-title>
          <v-card-text class="display-2 text-center">
            {{temperature}}°C
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" md="4" lg="2">
        <v-card>
          <v-card-title>Output current</v-card-title>
          <v-card-text class="display-2 text-center">
            {{output_current}}A
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" md="4" lg="2">
        <v-card>
          <v-card-title>Output power</v-card-title>
          <v-card-text class="display-2 text-center">
            {{output_power}}W
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
  },

  data: () => ({
    temperature: 0,
    voltage: 0,
    input_current: 0,
    input_power: 0,
    output_current: 0,
    output_power: 0
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
    },
    'infinite-train/power-in': function (message) {
      let json = (new TextDecoder('utf-8').decode(message))
      let data = JSON.parse(json)
      this.$data.voltage = Math.round(data['load-voltage'] * 100) / 100
      this.$data.input_current = (data.current / 1000).toFixed(3)
      this.$data.input_power = (data.power / 1000).toFixed(3)
      // console.log(data)
    },
    'infinite-train/power-out': function (message) {
      let json = (new TextDecoder('utf-8').decode(message))
      let data = JSON.parse(json)
      this.$data.output_current = (data.current / 1000).toFixed(3)
      this.$data.output_power = (data.power / 1000).toFixed(3)
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
