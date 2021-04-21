import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Calendar from '@/components/Calendar.vue'
import AppPopover from '@/components/AppPopover.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Calendar', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      getStations: jest.fn(),
    },
    store = new Vuex.Store({
      actions
    })
  });

  test('should render correctly', () => {
    const wrapper = shallowMount(Calendar, {
      components: {
        AppPopover
      },
      store, localVue 
    });

    expect(wrapper.vm).toMatchSnapshot();
  });
})
