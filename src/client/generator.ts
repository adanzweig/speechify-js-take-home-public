import { DataType, Data } from "@common";

export default class DataGenerator {
  getData(type: DataType): Data {
    switch (type) {
      case DataType.HTML:
        return {
          type: DataType.HTML,
          source: "https://speechify.com/welcome",
          data: `<html>
            <body>
                <div id="speechify-heading">
                <h1>Welcome to Speechify</h1>
                <div id="speechify-paragraphs">
                    <p>Speechify helps you listen to any readable content on the web.</p>
                    <p>The product works on web articles, PDFs and Google Docs.</p>
                </div>
            </body>
        </html>`,
        };
      case DataType.TXT:
        return {
          type: DataType.TXT,
          source: "feeds.stock-ticker",
          data:
            "AMZN\t3232.58\tUSD\nFB\t272.14\tUSD\nAAPL\t142.06\tUSD\nNFLX\t523.28\tUSD",
        };
      case DataType.JSON:
        return {
          type: DataType.JSON,
          source: "https://slack.com/webhooks/chat",
          data: JSON.stringify({
            from: "@anson",
            channel: "#chrome-extension",
            message:
              "Can you please check the latest PR? I just updated the API",
            timeSent: new Date().getTime(),
          }),
        };
      default:
        throw new Error("Invalid data type");
    }
  }
}
