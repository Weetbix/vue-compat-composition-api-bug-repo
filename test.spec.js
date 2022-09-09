import { defineComponent } from 'vue';
import {fireEvent, render} from '@testing-library/vue';

const TestComponent = defineComponent({
    name: 'test',
    template: '<div>{{ text }}<button @click="onclick">clickme</button></div>',
    data() {
        return {
            text: '',
        };
    },
    methods: {
        async onclick() {
            this.text = 'set';
        },
    },
});

const stubDate = (isoDateString) => {
    class MockDate extends Date {
        static now() {
            return new Date(isoDateString).valueOf();
        }
    }
    vi.stubGlobal('Date', MockDate);
};

const fakeTimers = (date) => {
    vi.useFakeTimers();
    vi.setSystemTime(date);
};

it('should show text on click', async () => {
    const {findByRole, findByText} = render(TestComponent);
    await fireEvent.click(await findByRole('button', {name: 'clickme'}));
    await findByText('set');
});

it('should show text when time mocked directly', async () => {
    stubDate('2022-01-11T00:00:00Z');
    const {findByRole, findByText} = render(TestComponent);
    await fireEvent.click(await findByRole('button', {name: 'clickme'}));
    await findByText('set');
});

it('should show text when time mocked with fake timers', async () => {
    fakeTimers('2022-01-11T00:00:00Z');
    const {findByRole, findByText} = render(TestComponent);
    await fireEvent.click(await findByRole('button', {name: 'clickme'}));
    await findByText('set');
});
