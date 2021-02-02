import { Data, StreamChunk } from "@common";

export interface SpeechifyServer {
  addToQueue(data: Data): boolean;
  getNextChunk(): StreamChunk | undefined;
}
