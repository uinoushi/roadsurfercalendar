<template>
  <div class="preLoader" v-if="isLoading">
    <span>Loading...</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isLoading']),
  },
}
</script>

<style lang="scss" scoped>
  .preLoader {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: map-get($z-index, spinner);
    background-color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
