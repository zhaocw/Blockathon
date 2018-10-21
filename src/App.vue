<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>
<script type="text/javascript">
  export default {
    name: 'app',
  }
</script>
