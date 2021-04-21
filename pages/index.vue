<template>
  <div class="main">
    <Calendar :events="pickupsAndReturns" />
    <AppLoader />
  </div>
</template>

<script>
import AppLoader from "~/components/AppLoader.vue";
import { mapState } from 'vuex'

export default {
  components: {
    AppLoader,
  },
  computed: {
    ...mapState(["pickupsAndReturns"])
  },
}
</script>
