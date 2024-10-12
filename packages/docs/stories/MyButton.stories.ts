import MyButton from '../../ui/src/components/MyButton.vue';

export default {
  title: 'Components/MyButton',
  component: MyButton,
  argTypes: {
    label: { control: 'text' },
    type: { control: { type: 'select', options: ['primary', 'success', 'warning', 'danger'] } },
  },
};

const Template = (args) => ({
  components: { MyButton },
  setup() {
    return { args };
  },
  template: '<MyButton v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  type: 'primary',
};

export const Success = Template.bind({});
Success.args = {
  label: 'Success Button',
  type: 'success',
};