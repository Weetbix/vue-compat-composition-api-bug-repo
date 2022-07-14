

import {ref, onMounted, defineComponent} from 'vue';
import {it, expect} from 'vitest';
import {mount} from '@vue/test-utils';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const TestAsync = defineComponent({
    template: '<div><div>{{ mountText }}</div><div>{{ asyncText }}</div></div>',

    props: {
        done: Function,
    },
    setup({ done }) {
        const mountText = ref();
        const asyncText = ref();

        onMounted(() => {
            mountText.value = 'mounted';
        });

        sleep(0).then(() => {
            asyncText.value = 'async';
            done?.();
        });

        return {
            mountText,
            asyncText,
        };
    },
});

it('should show onMount text', () => new Promise(done => {
    const wrapper = mount(TestAsync);
    wrapper.vm.$nextTick(() => {
        expect(wrapper.html()).toMatch('mounted')
        done();
    });
}));

it('should show async text', async () => {
    let renderedAsyncResolve;
    const renderedAsync = new Promise(resolve => renderedAsyncResolve = resolve);

    const wrapper = mount(TestAsync, {
        propsData: { done: renderedAsyncResolve }
    });

    await renderedAsync;
    expect(wrapper.html()).toMatch('async');
});

it('should show async text with nextTick', () => new Promise(async (done) => {
    let renderedAsyncResolve;
    const renderedAsync = new Promise(resolve => renderedAsyncResolve = resolve);

    const wrapper = mount(TestAsync, {
        propsData: { done: renderedAsyncResolve }
    });

    await renderedAsync;
    wrapper.vm.$nextTick(() => {
        expect(wrapper.html()).toMatch('async');
        done();
    });
}));