
## Javascript Full-Stack Engineer @ Speechify 
# Take-Home Project 
<div style="text-align:center"><img src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fd3v0px0pttie1i.cloudfront.net%2Fuploads%2Fuser%2Flogo%2F1067928%2Fopengraph_f50024ae.png%3Fsource%3Dopengraph"/></div>

## Introduction
**At Speechify, we help people listen to all the world’s information on any device.**

This means we have two clear engineering objectives:
1. Extract information from diverse data in the world at high fidelity
2. Present the information to the User in the way that is most understandable given their chosen interface


## The Project
Your task is to build a miniature version of Speechify in Typescript. Your version will enable the User to:
1. **Add data to a Listening Queue** in a variety of formats
2. **Listen to their Listening Queue** in a Web Browser

### This Repository
This repository contains the following support modules to help you focus more on problem at hand, and less on WebPack configuration.
1. A simple Node server built with Express (`src/server`)
1. A simple web application built with React (`src/client`)
1. Type definitions for the core modules (`src/common`)

### Getting Started
Run `yarn install` and then `yarn dev` in a terminal. This will start your server and open your web application in your default browser.

### Data Formats
Your server will accept data in the following format:

```typescript
enum DataType { HTML, TXT, JSON }

type Data = {
    // Predefined format type
    type: DataType,

    // Some identifier of the source
    source: string,

    // The actual content
    data: string,
}
```


Note that with the `type` and `source` properties together,  we should be able to determine how to extract the information contained in the `data` property at high fidelity. This requires an assumption that data derived from a given `source` will have consistent structure, but this is generally a reasonable assumption.

Below are some examples showing how we can use this model to express a wide variety of data. Note that these are just examples for you to get an idea of how the `Data` looks like. In production `Data` can be of any size, and your system needs to handle it in the best way.
```typescript
const text: Data = {
    type: DataType.TXT,
    source: 'feeds.stock-ticker',
    data: 'AMZN\t3232.58\tUSD\nFB\t272.14\tUSD\nAAPL\t142.06\tUSD\nNFLX\t523.28\tUSD'
}

const article: Data = {
    type: DataType.HTML,
    source: 'https://speechify.com/welcome',
    data: '<html>
        <body>
            <div id="speechify-heading">
            <h1>Welcome to Speechify</h1>
            <div id="speechify-paragraphs">
                <p>Speechify helps you listen to any readable content on the web.</p>
                <p>The product works on web articles, PDFs and Google Docs.</p>
            </div>
        </body>
    </html>'
}

const slackMessage: Data = {
    type: DataType.JSON,
    source: 'webhooks.slack.messages',
    data: '{
        "from": “@anson”, 
        "channel": "#chrome-extension”, 
        "message": “Can you please check the latest PR? I just updated the API",
        "timeSent": “1611749161”
    }',
}
```

### Server Specification

Your server must implement the following API (see `src/server/speechify.ts`):

```typescript
export interface Speechify {
  // Description: Parse `data` and store result for later streaming via getNextChunk()
  // Returns: `true` if successfully parsed, otherwise `false`
  addToQueue(data: Data): boolean;

  // Returns: the next unit of content to be presented to the User, `undefined` if there is none
  getNextChunk(): StreamChunk | undefined;
}
```

**NOTE: You must define `StreamChunk` in `src/common/index.ts`**


### Client Specification

Your client must implement the following API (see `src/client/speechify.ts`):

```typescript
export enum ClientEventType { STATE, }

export enum ClientState { PLAYING, NOT_PLAYING, }

type ClientStateEvent = {
  type: ClientEventType.STATE;
  state: ClientState;
};


export interface SpeechifyClient {

  // Sends RPC to Speechify Server
  addToQueue(data: Data): Promise<boolean>;

  // Initiates or resumes **audio playback** of content streamed from Listening Queue
  play(): void;

  // Pauses audio playback
  pause(): void;

  // Returns the current state of the client 
  getState(): ClientState;

  // Registers a callback for state change events on the Speechify Client
  // Returns a callback that cancels the subscription
  subscribe(listener: (event: ClientStateEvent) => void): () => void;
}
```

## Implementation Notes
- For playing Audio in a Web Browser, we recommend that you use the [SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis). 

## Evaluation
Your submission will be evaluated according to:
1. The quality of the implementation - is the code clear, concise, and correct in implementing the desired experience?
2. The quality of the Listening experience - is it the best listening experience for each item of Data on this simple interface?
