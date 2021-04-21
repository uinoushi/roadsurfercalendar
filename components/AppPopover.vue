<template>
  <v-popover :offset="offset" :placement="placement">
    <slot name="handler"></slot>
    <template slot="popover">
      <div class="popover-content">
        <div class="popover-header">
          <slot name="header"></slot>
          <button type="button" class="popover-close" v-close-popover>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="popover-body">
          <slot name="body"></slot>
        </div>
      </div>
    </template>
  </v-popover>
</template>

<script>
export default {
  name: 'AppPopover',
  props: {
    offset: {
      type: String,
      required: false,
      default: () => '16',
    },
    placement: {
      type: String,
      required: false,
      default: () => 'auto',
    },
  },
}
</script>

<style lang="scss">
  .v-popover,
  .trigger {
    height: 100%;
  }

  .trigger {
    width: 100%;
    padding: 0 $length-gap-tiny;
    font-size: $font-size-small;

    .handler-title {
      margin-bottom: $length-gap-tiny;
    }
  }

  .tooltip {
    display: block;
    z-index: map-get($z-index, overlay);

    .tooltip-arrow {
      width: 0;
      height: 0;
      border-style: solid;
      border-color: $white;
      position: absolute;
      margin: $length-gap-tiny;
      z-index: map-get($z-index, default);
    }

    &[x-placement^="top"] {
      margin-bottom: $length-gap-tiny;

      .tooltip-arrow {
        border-width: $length-gap-tiny $length-gap-tiny 0;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        bottom: -$length-gap-tiny;
        left: 50%;
        margin-left: -$length-gap-tiny;
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^="bottom"] {
      margin-top: $length-gap-tiny;

      .tooltip-arrow {
        border-width: 0 $length-gap-tiny $length-gap-tiny;
        border-left-color: transparent;
        border-right-color: transparent;
        border-top-color: transparent;
        top: -$length-gap-tiny;
        left: 50%;
        margin-left: -$length-gap-tiny;
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^="right"] {
      margin-left: $length-gap-tiny;

      .tooltip-arrow {
        border-width: $length-gap-tiny $length-gap-tiny $length-gap-tiny 0;
        border-left-color: transparent;
        border-top-color: transparent;
        border-bottom-color: transparent;
        left: -$length-gap-tiny;
        top: 50%;
        margin-top: -$length-gap-tiny;
        margin-left: 0;
        margin-right: 0;
      }
    }

    &[x-placement^="left"] {
      margin-right: $length-gap-tiny;

      .tooltip-arrow {
        border-width: $length-gap-tiny 0 $length-gap-tiny $length-gap-tiny;
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        right: -$length-gap-tiny;
        top: 50%;
        margin-top: -$length-gap-tiny;
        margin-left: 0;
        margin-right: 0;
      }
    }

    &[aria-hidden='true'] {
      visibility: hidden;
      opacity: 0;
      transition: opacity .15s, visibility .15s;
      outline: 0;
    }

    &[aria-hidden='false'] {
      visibility: visible;
      opacity: 1;
      transition: opacity .15s;
    }

    .popover-inner {
      background: $white;
      color: $black;
      border-radius: $border-radius-normal;
      min-width: 320px;
      max-width: 320px;
      padding: 0;
      box-shadow: 0 5px 30px rgba(0, 0, 0, .1);
    }
  }

  .popover-content {
    .popover-header {
      display: flex;
      padding: $length-gap-small;
      align-items: flex-start;
      background-color: $brandprimary;
      color: $white;
      border-radius: $border-radius-normal $border-radius-normal 0 0;
      position: relative;

      .popover-header-icon {
        position: absolute;
        left: 50%;
        bottom: 0;
        margin-left: -$length-gap-medium;
        max-width: 48px;

        &.rotate {
          transform: rotateY(-180deg);
        }
      }

      .popover-title {
        font-family: $font-heading;
        font-size: $length-gap-large;
        font-weight: $font-weight-large;
        line-height: 1;
        margin: 0;
      }
    }

    .popover-close {
      margin-top: -$length-gap-small;
      margin-bottom: -$length-gap-small;
      margin-right: -$length-gap-small;
      margin-left: auto;
      padding: $length-gap-small;
      border: 0;
      font-size: $font-size-subtitle;
      font-weight: $font-weight-large;
      line-height: 1.2;
      opacity: 0.5;
      text-shadow: 0 1px 0 $white;
      background-color: transparent;
      cursor: pointer;
      outline: 0;

      &:hover {
        opacity: 1;
      }
    }

    .popover-body {
      padding: $length-gap-small;

      .popover-body-title {
        margin: 0 0 $length-gap-tiny;
      }

      .bold {
        color: $color-green-super;
      }
    }
  }
</style>