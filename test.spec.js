import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, vi } from 'vitest';

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
    const wrapper = mount(TestComponent);
    await wrapper.find('button').trigger('click');

    expect(wrapper.text()).toContain('set');
});

describe('', () => {
    beforeEach(() => {
        stubDate('2022-01-11T00:00:00Z');
    });

    afterEach(() => {
        vi.unmock('Date');
    });

    it('should show text when time mocked directly', async () => {
        const wrapper = mount(TestComponent);
        await wrapper.find('button').trigger('click');
        expect(wrapper.text()).toContain('set');
    });
})

describe('', () => {
    beforeEach(() => {
        fakeTimers('2022-01-11T00:00:00Z');
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should show text when time mocked with fake timers', async () => {
        const wrapper = mount(TestComponent);
        await wrapper.find('button').trigger('click');
        expect(wrapper.text()).toContain('set');
    });
});
