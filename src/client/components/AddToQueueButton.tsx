import React, { useState } from "react";
import { DataType } from "@common";
import * as ReactDOM from "react-dom";
import DataGenerator from "../generator";
import { SpeechifyClient } from "@common/client";

type Props = {
  type: DataType;
  generator: DataGenerator;
  client: SpeechifyClient;
};

export const AddToQueueButton = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    setLoading(true);
    const data = props.generator.getData(props.type);
    try {
      await props.client.addToQueue(data);
    } finally {
      // simulate loading
      setTimeout(() => setLoading(false), 500);
    }
  };
  return (
    <div onClick={onClick} className="add-to-queue-button">
      {loading ? "Submitting..." : `Add ${props.type} Data to Queue`}
    </div>
  );
};
