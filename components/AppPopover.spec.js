import { mount, shallowMount } from '@vue/test-utils'
import Vue from "vue"
import { VTooltip, VPopover, VClosePopover } from "v-tooltip"
import AppPopover from '@/components/AppPopover.vue'

Vue.directive("tooltip", VTooltip)
Vue.directive("close-popover", VClosePopover)
Vue.component("v-popover", VPopover)

describe('AppPopover', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppPopover, {
      slots: {
        handler: "<div>Booking Name</div>",
        header: "<div>Popover title</div>",
        body: "<p>Lorem ipsum</p>"
      },
      propsData: {
        offset: '20',
        placement: 'bottom'
      }
    });
  });

  test('should render correctly', () => {
    const wrapper = mount(AppPopover)
    expect(wrapper.vm).toBeTruthy()
  });

  test('should show the correct props', () => {
    expect(wrapper.props().offset).toBe('20')
    expect(wrapper.props('placement')).toBe('bottom')
  });

  test('renders the correct markup', () => {
    expect(wrapper.html()).toContain('Booking Name');
  });

  test('should have a close button', () => {
    expect(wrapper.find('.popover-close').exists()).toBeTruthy();
  });

  test('Header slot renders a default header text', () => {
    const header = wrapper.find('.popover-header');
    expect(header.text().trim()).toContain("Popover title");
  });

  test('body slot renders a default text content', () => {
    const body = wrapper.find('.popover-body');
    expect(body.text().trim()).toContain("Lorem ipsum");
  });
})
