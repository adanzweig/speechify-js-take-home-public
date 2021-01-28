import { Data } from "@common";

export enum ClientEventType {
  STATE,
}

export enum ClientState {
  PLAYING,
  NOT_PLAYING,
}

type ClientStateEvent = {
  type: ClientEventType.STATE;
  state: ClientState;
};

export type SpeechifyClientEvent = ClientStateEvent;

export interface SpeechifyClient {
  addToQueue(data: Data): Promise<boolean>;
  play(): void;
  pause(): void;
  getState(): ClientState;
  subscribe(listener: (event: SpeechifyClientEvent) => void): () => void;
}
