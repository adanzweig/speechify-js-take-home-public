import { DataType, Data, StreamChunk } from "@common";
import { SpeechifyServer } from "@common/server";

export default class MySpeechify implements SpeechifyServer {
  constructor() {}

  addToQueue(data: Data): boolean {
    console.error("addToQueue not implemented");
    return true;
  }

  getNextChunk(): StreamChunk | undefined {
    console.error("getNextChunk not implemented");
    return undefined;
  }
}
