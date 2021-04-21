import _ from 'lodash'
import moment from 'moment'

const API_URL = 'https://605c94c36d85de00170da8b4.mockapi.io';

export const state = () => ({
  stationNames: [],
  pickupsAndReturns: [],
  isLoading: false,
})

export const mutations = {
  updateStationNames: (state, stations) => {
    state.stationNames = stations
  },
  updatePickupsAndReturns: (state, pickupsAndReturns) => {
    state.pickupsAndReturns = pickupsAndReturns;
  },
  updateLoading: (state, isLoading) => {
    state.isLoading = isLoading;
  },
}

export const actions = {
  async getStations({ state, commit }, query = '') {
    commit('updateLoading', true);

    try {
      const stations = await this.$axios.$get(`${API_URL}/stations?name=${query}`);

      const stationNames = await stations.map(station => station.name);
      if (!isArrayEqual(state.stationNames, stationNames)) {
        commit('updateStationNames', stationNames);
      }

      const pickupsAndReturns = await populatePickupsAndReturns(stations);
      if (!isArrayEqual(state.pickupsAndReturns, pickupsAndReturns)) {
        commit('updatePickupsAndReturns', pickupsAndReturns);
      }

      commit('updateLoading', false);
    } catch (err) {}
  },
}

const isArrayEqual = (x, y) => _(x).xorWith(y, _.isEqual).isEmpty();

const calculateDays = (start, end) => moment(end).diff(moment(start), 'day');

const formatDate = (date) => moment(date).format('DD. MM. YYYY, LT');

const populatePickupsAndReturns = async (stations) => {
  let events = [];
  await stations.forEach(station => {
      station.bookings.forEach(booking => {
        let event = {
          id: booking.id,
          station: station.name,
          days: calculateDays(booking.startDate, booking.endDate),
          startDate: formatDate(booking.startDate),
          endDate: formatDate(booking.endDate),
          customerName: booking.customerName,
        }

        events.push(
          { ...event, title: 'Pickup', color: '#6bbbae', date: booking.startDate },
          { ...event, title: 'Return', color: '#7a93a6', date: booking.endDate }
        );
    });
  });

  return events;
};
