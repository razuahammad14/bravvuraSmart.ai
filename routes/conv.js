var config = require('../config');
var express = require('express');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');

var router = express.Router();
var jsonParser = bodyParser.json();

var conversation=watson.conversation(config.watson.conversation);

router.post('/',jsonParser,function(req,res,next){
  conversation.message({
    'input':req.body.input,
    'context':req.body.context,
    'workspace_id':config.watson.conversation.workspace_id
  },
  function(err,response){
    if(err){
      console.log("error: ",err);
    }else{


      console.log('Detected Input: '+response.input.text);
      if(response.intents.length>0){
        var intent = response.intents[0];
        console.log('Detected Intent: '+intent.intent);
        console.log("Confidence: "+intent.confidence);
      }

      if(response.entities.length>0){
          var entity = response.entities[0];
          console.log("Detected Entites: "+entity.entity);
          console.log('Value: '+entity.value);

      };

      /*
      We can send information to our apps from there.
      We can also do datbase manulapute or we can call any api to
      collect any information from other vendor like magento etc 
      */

      res.json(response);


    }
  });
});








module.exports = router;
