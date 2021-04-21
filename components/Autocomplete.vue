<template>
  <div class="autocomplete">
    <input
      class="form-control"
      type="text"
      :placeholder="placeholder"
      v-model="search"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <ul
      class="autocomplete-items"
      v-show="isOpen"
    >
      <li
        v-if="isLoading"
        class="loading"
      >
        Loading items...
      </li>
      <li v-else-if="!items.length" class="autocomplete-item empty">
        No items
      </li>
      <li
        v-else
        class="autocomplete-item"
        v-for="(result, i) in results"
        :key="i"
        :class="{ 'is-active': i === arrowCounter }"
        @click="setResult(result)"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'

const REQUEST_IN_MS = 1000;

export default {
  name: 'Autocomplete',
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    placeholder: {
      type: String,
      required: false,
      default: () => 'Please enter text'
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    items: function (value, oldValue) {
      if (this.isAsync) {
        this.results = value;
        this.isOpen = true;
        this.isLoading = false;
      }
    }
  },
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
      isLoading: false,
      arrowCounter: -1,
    };
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    filterResults() {
      this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    },
    onChange: _.debounce(function() {
      this.$emit('input', this.search);

      if (this.isAsync) {
        this.isLoading = true;
      } else {
        this.filterResults();
        this.isOpen = true;
      }
    }, REQUEST_IN_MS),
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.$emit('input', this.search);
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.arrowCounter = -1;
        this.isOpen = false;
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      if (this.arrowCounter === -1) return;

      this.search = this.results[this.arrowCounter];
      this.arrowCounter = -1;
      this.isOpen = false;
      this.$emit('input', this.search);
    },
  }
};
</script>

<style lang="scss" scoped>
  .form-control {
    border: 1px solid $color-grey-concrete;
    width: 100%;
    padding: $length-gap-mini $length-gap-small;
    background-color: $white;
    background-clip: padding-box;
    font-size: $font-size-medium;
    line-height: 1.5;
    color: $color-green-super;
    font-weight: $font-weight-medium;
    appearance: none;
    border-radius: $border-radius-normal;
    transition: border-color .15s ease-in-out;

    &:focus {
      border-color: $brandsecondary;
      outline: 0;
    }
  }

  .autocomplete {
    position: relative;

    .autocomplete-items {
      padding: 0;
      margin: 0;
      border: 1px solid $color-grey-concrete;
      min-height: 1em;
      max-height: 8em;
      overflow: auto;
      position: absolute;
      background-color: $white;
      width: 100%;
      border-radius: $border-radius-normal;
      box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
    }

    .autocomplete-item {
      list-style: none;
      text-align: left;
      padding: $length-gap-mini $length-gap-small;
      cursor: pointer;

      &:not(.empty):hover,
      &.is-active {
        background-color: $brandprimary;
        color: $white;
      }

      &.empty {
        text-align: center;
        cursor: auto;
      }
    }
  }
</style>