import * as React from "react";
import { DataType } from "@common";
import { SpeechifyClient } from "@common/client";
import { PlayButton, AddToQueueButton } from "./components";

type Props = {
  client: SpeechifyClient;
  generator: any;
};

export default function App(props: Props) {
  return (
    <>
      <h1>Speechify CarPlay</h1>
      <PlayButton client={props.client} />
      <div className="add-to-queue-buttons">
        <AddToQueueButton
          client={props.client}
          generator={props.generator}
          type={DataType.HTML}
        />
        <AddToQueueButton
          client={props.client}
          generator={props.generator}
          type={DataType.TXT}
        />
        <AddToQueueButton
          client={props.client}
          generator={props.generator}
          type={DataType.JSON}
        />
      </div>
    </>
  );
}
