

import {ref, onMounted, defineComponent, configureCompat} from 'vue';
import {it, expect} from 'vitest';
import {render} from '@testing-library/vue';

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

// Ensure we are using the compat build
if(process.env.COMPAT_MODE) {
    it('should be compat mode', () => {
        expect(configureCompat).toBeDefined();
    })
}

it('should show onMount text', async () => {
    const {findByText} = render(TestAsync);
    await findByText('mounted');
});