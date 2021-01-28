import { Data, StreamChunk } from "@common";
import {
  SpeechifyClient,
  ClientState,
  SpeechifyClientEvent,
  ClientEventType,
} from "@common/client";

export default class SpeechifyClientImpl implements SpeechifyClient {
  constructor(host: string) {}

  async addToQueue(data: Data): Promise<boolean> {
    window.alert("addToQueue client method not implemented");
    throw new Error("method not implemented");
  }

  play(): void {
    window.alert("play client method not implemented");
    throw new Error("method not implemented");
  }

  pause(): void {
    window.alert("pause client method not implemented");
    throw new Error("method not implemented");
  }

  getState(): ClientState {
    return ClientState.NOT_PLAYING;
  }

  subscribe(listener: (event: SpeechifyClientEvent) => void): () => void {
    window.alert("subscribe client method not implemented");
    return () => {};
  }
}
