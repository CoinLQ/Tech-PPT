<template>

  <div id="app">
    <img src="../../assets/logo.png">
    <div class="room">
      <h1>Room lamp is {{status}}</h1>
      <lamp :status="status"><h1 slot="header">演示</h1>
      <h2 slot="footer">Footer is here</h2></lamp>
      <switcher :status="status"></switcher>

    </div>
  </div>

</template>

<script>
import Switcher from './switcher'
import Lamp from './lamp'

export default {
  data () {
    return {status: 'on'}
  },
  created: function () {
    this.$on('switch-status-change', this.switch_status_change)
  },
  methods: {
    'switch_status_change': function (status) {
      console.log('switch-status-change', status)
      this.status = status
    }
  },
  components: {
    Switcher,
    Lamp
  }
}
</script>
