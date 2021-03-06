

import {ref, onMounted, defineComponent} from 'vue';
import {it} from 'vitest';
import {render} from '@testing-library/vue';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const TestAsync = defineComponent({
    template: '<div><div>{{ mountText }}</div><div>{{ asyncText }}</div></div>',

    setup() {
        const mountText = ref();
        const asyncText = ref();

        onMounted(() => {
            mountText.value = 'mounted';
        });

        sleep(0).then(() => {
            asyncText.value = 'async';
        });

        return {
            mountText,
            asyncText,
        };
    },
});

it('should show onMount text', async () => {
    const {findByText} = render(TestAsync);
    await findByText('mounted');
});

it('should show async text', async () => {
    const {findByText} = render(TestAsync);
    await findByText('async');
});
