export default {
  title: 'AppPopover',
  parameters:{
    layout:'centered',
  },
}

export const AppPopover = () => 
  `<AppPopover placement="bottom">
    <template v-slot:handler>
      <button type="button">Click me!</button>
    </template>
    <template v-slot:header>
      <h5 class="popover-title">Sample Title</h5>
    </template>
    <template v-slot:body>
      <p class="popover-body-title">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
      </p>
    </template>
  </AppPopover>`
