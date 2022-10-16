export default {
  id: "graph",
  initial: "idle",
  states: {
    idle: {
      entry: ["updateLabelOrder"],
      on: {
        edit: {
          actions: "toEdit",
          target: "editting",
        },
        addLabel: {
          actions: ["addLabel", "onChange"],
        },
        removeLabel: {
          actions: ["removeLabel", "onChange"],
        },
        updateOrder: {
          actions: ["updateLabelOrder", "onChange"],
        },
        save: {
          actions: ["onSave"],
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
