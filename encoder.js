function encode() {
  const secret = apikey;
  const path = "/api/embedded_dashboard?data=";
  var hash = crypto.createHmac('sha256', secret)
                   .update(path)
                   .digest('hex');

  res.setHeader("Content-Type", "text/html"); //application/jason
  const baselink = "https://www.periscope.io/api/embedded_dashboard?data=";
  const basesignature = "&signature=";
  var signature = hash;
	var obj = document.getElementById('encoder');
	var unencoded = obj.value;
	obj.value = baselink + encodeURIComponent(unencoded).replace(/'/g,"%27").replace(/"/g,"%22") + basesignature + signature;
}
