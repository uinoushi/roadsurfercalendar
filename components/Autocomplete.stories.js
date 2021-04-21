import { storiesOf } from '@storybook/vue'
import Autocomplete from '@/components/Autocomplete.vue'

storiesOf('Autocomplete', module)
  .add('Autocomplete', () => ({
    components: {Autocomplete},
    data() {
      return {
        items: ['Berlin', 'Frankfurt', 'Hamburg', 'Munich'],
        placeholder: 'Ex. Berlin'
      }
    },
    template: `<Autocomplete :placeholder="placeholder" :items='items' />`
  }))

