<template>
<div class="container">
  <header>
  <slot name="header">缺省header</slot>
  </header>
  <div class="lamp" :class="status === 'on' ? 'lamp-on' : 'lamp-off'">lamp</div>
  <slot name="footer"></slot>
</div>

</template>

<script>
  export default {
    props: ['status'],
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
.lamp {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  line-height: 100px;
  vertical-align: middle;
  margin: 0 0 10px 0;
  border: 1px solid #ccc;
}
.lamp-on {
  background: yellow;
  color: #000;
}
.lamp-off {
  background: #000;
  color: #fff;
}
</style>
