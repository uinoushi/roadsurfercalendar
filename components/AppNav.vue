<template>
  <div class="navbar">
    <img class="navbar-brand" src="~/static/logo-icon.svg" />

    <div class="navbar-search">
      <Autocomplete
        placeholder="Ex. station-name"
        :items="stationNames"
        @input="pickStation"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppNav',
  computed: {
    ...mapState(['stationNames']),
  },
  methods: {
    pickStation(query) {
      this.$store.dispatch('getStations', query);
    },
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    padding: $length-gap-mini $length-gap-small;
    display: flex;
    background-color: $brandprimary;
    align-items: center;
    position: relative;
    z-index: map-get($z-index, top-nav);

    .navbar-brand {
      height: 48px;
      margin-right: $length-gap-large;
    }

    .navbar-search {
      flex: 1 1 auto;
      max-width: 600px;
      margin-left: auto;
    }
  }

  @media (min-width: $breakpoint-tablet-portrait) {
    .navbar {
      padding: $length-gap-small $length-gap-large;
    }
  }
</style>
