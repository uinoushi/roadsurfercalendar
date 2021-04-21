import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import index from '@/pages/index.vue'
import AppLoader from '@/components/AppLoader.vue'
import Calendar from '@/components/Calendar.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('index', () => {
  let actions
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        pickupsAndReturns: []
      },
      mapState: {
        pickupsAndReturns: (state) => state.pickupsAndReturns,
      },
    })
  });

  test('should render correctly', () => {
    const wrapper = shallowMount(index, {
      components: {
        AppLoader,
        Calendar
      },
      store, localVue 
    });

    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.getComponent(AppLoader).exists()).toBe(true);
    expect(wrapper.getComponent(Calendar).exists()).toBe(true);
  });
})
