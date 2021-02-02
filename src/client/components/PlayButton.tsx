import React, { useEffect, useState } from "react";
import {
  SpeechifyClient,
  SpeechifyClientEvent,
  ClientEventType,
  ClientState,
} from "@common/client";
import store from "../store";

type Props = {
  client: SpeechifyClient;
};

export const PlayButton = (props: Props) => {
  const { client } = props;
  const [state, setState] = useState(client.getState());
  
  useEffect(() => {
    return store.subscribe(() => {
      switch (store.getState().type) {
        case ClientEventType.STATE:
          setState(store.getState().state);
          break;
        default:
          break;
      }
    });
    
  }, [client.getState]);
  
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
