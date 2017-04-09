const fs = require('fs');
const crypto = require('crypto');

var options = {
  line1 : '{\n',
  line2 : '    "dashboard": 00000,\n',
  line3 : '    "embed": "v2",\n',
  line4 : '    "filters": [{"name": "Filter1", "value": "value1"}, {"name": "Filter2", "value": "1234"}]\n',
  line5 : '}'
};

var line1 = "{\n";
var line2 = '    "dashboard": 00000,\n';
var line3 = '    "embed": "v2",\n';
var line4 = '    "filters": [{"name": "Filter1", "value": "value1"}, {"name": "Filter2", "value": "1234"}]\n';
var line5 = '}';

var apikey = "a2fe2e4e-2fd3-4578-8d72-e3a0d3c5";

var postHTML =
"<form class='' action='/generatelink' method='post'>\
  <div class=''>\
    <label for=''>Dashboard Options :</label><br>\
    <textarea id='encoder' rows='10' cols='120' type='text' name='dashboardoptions'>" + line1 + line2 + line3 + line4 + line5 + "</textarea>\
  </div><br>\
  <div class=''>\
    <label for=''>Periscope API Key:</label><br>\
    <input type='text' style='width: 300px;' name='apikey' value='" + apikey + "' placeholder='  type api key...'>\
  </div><br>\
  <div class=''>\
    <input type='submit' value='Generate Link'>\
  </div>\
</form>";

exports.homepage = function(req, res) {
  var body = "";
  res.setHeader("Content-Type", "text/html");
  res.end(postHTML);
}

exports.linkgenerator = function(req, res) {

  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    console.log("outofscope: ", body);
    var unencoded = body.substring(17); // line1 + line2 + line3 + line4 + line5;
    var encoded = body.substring(17) //encodeURIComponent(unencoded).replace(/'/g,"%27").replace(/"/g,"%22");
    const secret = apikey;
    const path = "/api/embedded_dashboard?data=" + encoded;
    var hash = crypto.createHmac('sha256', secret)
                       .update(path)
                       .digest('hex');

    res.setHeader("Content-Type", "text/html"); //application/jason
    const baselink = "https://www.periscope.io/api/embedded_dashboard?data=";
    const basesignature = "&signature=";
    var signature = hash;
    res.end("<div class=''>\
        <label for=''>Periscope Link:</label><br>\
        <textarea rows='10' cols='120' id='apikey' type='text' name='apikey'>" + baselink + encoded + basesignature + signature + "</textarea>\
      </div>\
      <form action='/'>\
        <input type='submit' value='<< Back' />\
      </form>");
  });
}

exports.notFound = function(req, res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");
  res.end("<h2>404 Not found!</h2>");
}

function encode() {
	var obj = document.getElementById('encoder');
	var unencoded = obj.value;
	options = encodeURIComponent(unencoded).replace(/'/g,"%27").replace(/"/g,"%22");
}
