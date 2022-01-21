// import { State } from "@hookstate/core";

// should be global variable
const MyStateWatchPluginId = Symbol("MyStateWatchPlugin");

export function MyStateWatchPlugin() {
  return {
    id: MyStateWatchPluginId,
    init: () => {
      //   console.log("plugin attached");
      return {
        // onSet: (data: any) => {
        //   //   console.log("to a new value", data.value);
        // },
        // onDestroy: (data) => {
        //   console.log("state detroyed", data.state);
        // },
        // onBatchStart: (data) => {
        //   console.log("batch started", data.state);
        //   console.log("at path", data.path);
        //   console.log("with context", data.context);
        // },
        // onBatchFinish: (data) => {
        //   console.log("batch finished", data.state);
        //   console.log("with context", data.context);
        // },
      };
    },
  };
}
