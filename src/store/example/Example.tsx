import ExampleState from './Example.json';
import { createMachine } from 'xstate';

// ref https://stately.ai/registry/editor/e7f45c31-8646-4ec2-a983-10320aa135bd

export const ExampleMachine = createMachine({
    ...ExampleState,
    context: {
        failCount: 0,
    },
});
