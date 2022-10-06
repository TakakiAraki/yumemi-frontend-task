import ExampleState from "./Example.json";
import { createMachine } from "xstate";

// ref https://stately.ai/registry/editor/e7f45c31-8646-4ec2-a983-10320aa135bd

interface ExampleContext {
  failCount: number;
}

export const ExampleEntryFailedAction = (context: ExampleContext) => {
  context.failCount += 1;
};

export const ExampleMachine = createMachine<ExampleContext>(
  {
    ...ExampleState,
    context: {
      failCount: 0,
    },
  },
  {
    actions: {
      "entry-failed": ExampleEntryFailedAction,
    },
  },
);
