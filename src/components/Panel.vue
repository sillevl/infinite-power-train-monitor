<template>
    <v-col sm="6" md="4" lg="2">
      <v-card>
        <v-card-title>{{title}}</v-card-title>
        <v-card-text class="display-2 text-center">
          {{value}}<span class="display-1">{{unit}}</span>
        </v-card-text>
      </v-card>
    </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Panel',
  props: ['title', 'value', 'unit']
})
</script>
