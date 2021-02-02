import { Data, StreamChunk } from "@common";
import {
  SpeechifyClient,
  ClientState,
  SpeechifyClientEvent,
  ClientEventType,
} from "@common/client";
import React, { useEffect, useState } from "react";
import Speech from 'speak-tts' // es6
import store from "./store";

export default class SpeechifyClientImpl implements SpeechifyClient{
  _host: string;
  _status = React.createRef(ClientState.NOT_PLAYING);
  _player = new Speech();
  _paused = false;
  
  constructor(host: string) {
    this._host = host;
  }

  async addToQueue(data: Data): Promise<boolean> {
    const response = await fetch(this._host+"/api/addToQueue",{
      method:'POST',
      body:JSON.stringify(data),
      headers:{'Content-Type': 'application/json'}}
    );
    const body = await response.json();
    return true;
  }

  play(): void {
    let st = store.dispatch({type:'play'});
    if(this._paused){
      this._player.resume();
      this._status.current = ClientState.PLAYING;
      this._paused = false;
      return;
    }

    fetch(this._host+"/api/getNextChunk",{
      headers:{'Content-Type': 'application/json'}}
    )
    .then(response => response.json())
    .then( json => {
      const chunk = json.chunk;
      this._status.current = ClientState.PLAYING
        if(chunk == "" || chunk == undefined){
          let st = store.dispatch({type:'pause'});
          this._status.current = ClientState.NOT_PLAYING;
        }
        this._player.speak({text:chunk,listeners:{
          onend: () => {
            console.log("End chunk")
          },
        }
          
        }).then(() => {
          let st = store.dispatch({type:'pause'});
            this.play();
            this._status.current = ClientState.NOT_PLAYING;
            
        }).catch(e => {
            console.error("An error occurred :", e)
        });
      }
    );
  
  }

  pause(): void {
    let st = store.dispatch({type:'pause'});
    this._player.pause();
    this._status.current = ClientState.NOT_PLAYING;
    this._paused = true;
  }

  getState(): ClientState {
    return ClientState.NOT_PLAYING;
  }

  subscribe(listener: (event: SpeechifyClientEvent) => void): () => void {
    return () => store.getState();
  }
}
