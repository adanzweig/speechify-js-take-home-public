import { DataType, Data, StreamChunk } from "@common";
import { SpeechifyServer } from "@common/server";
const jsonfile = require('jsonfile')
const jsonToTxt = require("json-to-txt");


export default class MySpeechify implements SpeechifyServer {
  constructor() {}
  
  addToQueue(data: Data): boolean {
    const file = './tmp/test.json'
    jsonfile.readFile(file)
    .then((obj) => {
      let json = obj;
      let sentence = "";
      let sentences;
      switch(data.type){
        case 'HTML':
          sentence = data.data.replace(/(<([^>]+)>)/gi, "");
          sentences = sentence.split("\n").map(function(item) {
            return item.trim();
          });
          break;
        case 'TXT':
          sentence = data.data.replace(/\t/gi," ");
          sentences = sentence.split("\n").map(function(item) {
            return item.trim();
          });
          break;
        case 'JSON':
          sentence = "";
          const json = JSON.parse(data.data);
          for(var key in json){
              var value = json[key];
             
              if(key == "timeSent"){
                value = this.getFormattedTime(value);
              }
              sentence += key+" "+value+".";
          }
          sentences = sentence.split('.').map(function(item) {
            return item.trim();
          });
          break;
      }
      var filtered = sentences.filter(item=>item);
      json = json.concat(filtered);
      jsonfile.writeFile(file, json, function (err) {
        if (err) console.error(err)
      })
    })
    .catch(error => console.error(error))
    return true;
  }

  getNextChunk(): StreamChunk | undefined {
    const file = './tmp/test.json'
    const obj = jsonfile.readFileSync(file);
     
      let sentence = obj.shift();
      if(sentence != undefined){  
        jsonfile.writeFile(file, obj, function (err) {
          if (err) console.error(err)
        })
      }

    return sentence;
  }
  getFormattedTime(unix){
    var date = new Date(unix);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = month+" "+day+" "+year+" "+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }
  
}
