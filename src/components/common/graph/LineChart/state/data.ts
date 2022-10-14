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
          actions: "addLabel",
        },
        removeLabel: {
          actions: "removeLabel",
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
