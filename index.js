// # SimpleServer
// A simple chat bot server
var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var router = express();
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var server = http.createServer(app);// Khoi tao server
app.listen(process.env.PORT || 3000);
app.get('/', (req, res) => { //, req (request) là đối tượng mà nó nhận được từ client 
  res.send("Server chạy ngon lành.");
});
app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === 'quandeptrai') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});
// Đoạn code xử lý khi có người nhắn tin cho bot
app.post('/webhook', function(req, res) {
  var entries = req.body.entry;
  for (var entry of entries) {
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        // Nếu người dùng gửi tin nhắn đến
        if (message.message.text) {
          var text = message.message.text;
          if(text == 'hi' || text == "hello" || text=="Hi" || text=="Hello" || text=="Xin Chào")
          {
            sendMessage(senderId, "Chào lực sĩ tôi thích bạn (y)");
          }
          else if(text == "Tôi có thể hỏi bạn 1 câu")
          {
            sendMessage(senderId, "Tôi có thể giúp gì cho bạn? ");
          }
          else if(text == "Không làm mà đòi có ăn thì sao")
          {
            sendMessage(senderId, "Thì ăn đùi gà ăn mứt nhé nói thế cho nó dễ :D :D :D :D ");
          }
          else if(text == "Ok" || text == "Cảm ơn")
          {
            sendMessage(senderId, "Không có chi !! Hẹn gặp lại <3.....");
          }
          else{sendMessage(senderId, "Xin lỗi, câu hỏi của bạn chưa có trong hệ thống, chúng tôi sẽ cập nhật sớm nhất. <3");}
        }
      }
    }
  }
  res.status(200).send("OK");
});
// Gửi thông tin tới REST API để Bot tự trả lời
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: "EAAD9tZCjjG30BABqW7t6xvWB1pYTw4W5MV97LHNz8K0GcZASF9Rcg2QmqoWzFdKjWLSFdlHZCS02y9R3B1vZBqQ7hykavby2vyYdWUpLvTZAkmmZBDKnAolTGO3Jv0QZCLmlo4ZA8OX9fdFfDDir3BMnBSZBGltdfEXqqqvZBRTrKTrZCm6w3aqiN1T",
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        text: message
      },
    }
  });
}
