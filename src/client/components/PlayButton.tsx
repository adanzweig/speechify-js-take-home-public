import React, { useEffect, useState } from "react";
import {
  SpeechifyClient,
  SpeechifyClientEvent,
  ClientEventType,
  ClientState,
} from "@common/client";

type Props = {
  client: SpeechifyClient;
};

export const PlayButton = (props: Props) => {
  const { client } = props;
  const [state, setState] = useState(client.getState());

  useEffect(() => {
    return client.subscribe((event: SpeechifyClientEvent) => {
      switch (event.type) {
        case ClientEventType.STATE:
          setState(event.state);
          break;
        default:
          break;
      }
    });
  }, []);

  if (state === ClientState.PLAYING) {
    return (
      <button className="main-control pause" onClick={() => client.pause()}>
        PAUSE
      </button>
    );
  } else {
    return (
      <button className="main-control play" onClick={() => client.play()}>
        PLAY
      </button>
    );
  }
};
