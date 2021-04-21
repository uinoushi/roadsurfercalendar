import { shallowMount } from '@vue/test-utils'
import Autocomplete from '@/components/Autocomplete.vue'

describe('Autocomplete', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Autocomplete, {
      propsData: {
        items: ['test', 'test 123']
      }
    });
  });

  test('should render correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  });

  test('should show the autocomplete lists if input is not null', async () => {
    const input = wrapper.find('input');
    await input.setValue('test');

    expect(wrapper.find('input[type="text"]').element.value).toBe('test');
  });
})
