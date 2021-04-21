import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AppLoader from '@/components/AppLoader.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AppLoader', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        isLoading: true
      },
      mapState: {
        isLoading: (state) => state.isLoading,
      },
    })
  });

  test('should render correctly', () => {
    const wrapper = shallowMount(AppLoader, {
      store, localVue 
    });

    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.text()).toMatch(/Loading.../);
  });
})
