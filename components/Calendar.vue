<template>
    <div class="calendar">
      <FullCalendar :options="calendarOptions" ref="fullCalendar">
          <template v-slot:eventContent='arg'>
            <AppPopover>
              <template v-slot:handler>
                <p class="handler-title">{{ `${arg.event.title} ${arg.timeText}` }}</p>
                <p class="handler-info">{{ arg.event.extendedProps.customerName }}</p>
              </template>

              <template v-slot:header>
                <img class="popover-header-icon" v-bind:class="{'rotate' : arg.event.title === 'Return'}" src="~/static/logo-icon.svg" />
                <h5 class="popover-title">{{ arg.event.title }}</h5>
              </template>

              <template v-slot:body>
                <p class="popover-body-title">Customer: <span class="bold">{{ arg.event.extendedProps.customerName }}</span></p>
                <p class="popover-body-title">Start Date: <span class="bold">{{ arg.event.extendedProps.startDate }}</span></p>
                <p class="popover-body-title">End Date: <span class="bold">{{ arg.event.extendedProps.endDate }}</span></p>
                <p class="popover-body-title">Duration: <span class="bold">{{ arg.event.extendedProps.days }} Days</span></p>
                <p class="popover-body-title">Pickup/Return Station: <span class="bold">{{ arg.event.extendedProps.station }}</span></p>
              </template>
            </AppPopover>
          </template>
      </FullCalendar>
    </div>
</template>

<script>
import AppPopover from "~/components/AppPopover.vue";
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar,
    AppPopover,
  },
  props: {
    events: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: process.browser && window.innerWidth < 765 ? 'listWeek' : 'timeGridWeek',
        events: this.events,
        editable: true,
        selectable: true,
        height: '98%',
        nextDayThreshold: '09:00:00',
        noEventsContent: 'No Pickups/Returns planned',
      },
    }
  },
  watch: {
    events: function() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      this.calendarOptions.events = this.events;
      calendarApi.today();
    }
  },
}
</script>

<style lang="scss">
  .calendar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: map-get($z-index, default);

    .fc-button {
      background-color: $color-green-primary;
      border-color: $color-green-primary;
      outline: 0;

      &:focus {
        box-shadow: none;
      }
    }

    .fc-toolbar-title {
      font-size: $font-size-medium;
      line-height: 1.4;
    }

    .fc-toolbar-chunk {
      display: flex;
    }
  }

  @media (max-width: $breakpoint-tablet-portrait) {
    .calendar .fc {
      .fc-header-toolbar {
        flex-direction: column;
        align-items: inherit;
        font-size: $font-size-medium;

        .fc-toolbar-chunk:first-child {
          order: 1;
          margin-top: $length-gap-small;
        }

        .fc-today-button {
          margin-left: auto;
        }
      }
    }
  }

  @media (min-width: $breakpoint-tablet-portrait) {
    .calendar {
      .fc-toolbar-title {
        font-size: $font-size-title;
      }
    }
  }
</style>