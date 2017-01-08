<template>
  <div class="switch-container" :class="status">
    <button class="btn-on" @click="changeStatus('on')">Turn-on</button>
    <button class="btn-off" @click="changeStatus('off')">Turn-off</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        status: 'on'
      }
    },
    methods: {
      changeStatus (s) {
        if (this.status === s) {
          return
        } else {
          this.status = s
          this.$parent.$emit('switch-status-change', this.status)
        }
      }
    }
  }
</script>

<style scoped>
  .btn, .btn-on,
  .btn-off {
    width: 100px;
    height: 30px;
    line-height: 28px;
    outline: none;
  }
  .on .btn-on,
  .off .btn-off {
    background-color: #fff;
    border: #ccc;
    cursor: auto;
  }
</style>
