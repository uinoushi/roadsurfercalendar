import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AppNav from '@/components/AppNav.vue'
import Autocomplete from '@/components/Autocomplete.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AppNav', () => {
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
    const wrapper = shallowMount(AppNav, {
      components: {
        Autocomplete
      },
      store, localVue 
    });

    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.find('.navbar').exists()).toBeTruthy();
    expect(wrapper.find('.navbar-brand').exists()).toBeTruthy();
    expect(wrapper.find('.navbar-search').exists()).toBeTruthy();
    expect(wrapper.getComponent(Autocomplete).exists()).toBe(true);
  });

  it('dispatches "getStations" when excecute pickStation', () => {
    const wrapper = shallowMount(AppNav, {
      components: {
        Autocomplete
      },
      store, localVue 
    })
    
    wrapper.vm.pickStation('test');
    expect(actions.getStations).toHaveBeenCalled();
  });
})
