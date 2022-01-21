// import { State } from "@hookstate/core";

// should be global variable
const MyStateWatchPluginId = Symbol("MyStateWatchPlugin");

export function MyStateWatchPlugin() {
  return {
    id: MyStateWatchPluginId,
    init: () => {
      return {
        onSet: (data: any) => {
          console.log("to a new value", data.value);
        },
      };
    },
  };
}
