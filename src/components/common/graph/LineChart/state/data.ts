export default {
  id: "graph",
  initial: "idle",
  states: {
    idle: {
      entry: "updateLabelOrder",
      on: {
        edit: {
          actions: "toEdit",
          target: "editting",
        },
        addLabel: {
          actions: "updateLabel",
        },
        removeLabel: {
          actions: "updateLabel",
        },
        updateOrder: {
          actions: "updateLabelOrder",
        },
      },
    },
    editting: {
      on: {
        cancel: {
          actions: "toCancel",
          target: "idle",
        },
        save: [
          {
            actions: "toIdle",
            cond: "isValid",
            target: "idle",
          },
          {},
        ],
      },
    },
  },
};
