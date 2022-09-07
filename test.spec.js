

import {onMounted, defineComponent, configureCompat} from 'vue';
import {render} from '@testing-library/vue/src/index';

import { defineStore } from 'pinia';
import { createTestingPinia } from '@pinia/testing';

export const useTestStore = defineStore('testStore', {
    state: () => {
        return { text: null }
    },
    actions: {
        setText() {
            this.text = 'test-text';
        },
    },
});

const TestComponent = defineComponent({
    template: '<div>{{ testStore.text }}</div>',
    setup() {
        const testStore = useTestStore();

        onMounted(() => {
            testStore.setText()
        });

        return {
            testStore,
        };
    },
});

// Ensure we are using the compat build
if(process.env.COMPAT_MODE) {
    it('should be compat mode', () => {
        expect(configureCompat).toBeDefined();
    })
}

it('should show onMount text', async () => {
    const {findByText} = render(TestComponent, {
        global: {
            plugins: [createTestingPinia({ stubActions: false })],
        },
    });
    await findByText('test-text', {exact: false});
});
