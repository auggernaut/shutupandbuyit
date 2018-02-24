const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// ogRewrite
// fetches suabi database record, sets index.html meta tags.
//
exports.ogRewrite = functions.https.onRequest((req, res) => {
  const suabiId = req.url.split("/")[2];
  console.log(req.url);
  admin.database().ref('suabiLinks/' + suabiId + '/visits').transaction(function(visits) {
    return visits + 1;
  });
  admin.database().ref('suabiLinks/' + suabiId).once('value', (snapshot) => {
    var item = snapshot.val();
    const message = item.message.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
    const image = item.prodImage.largeImage;
    const prodUrl = item.prodUrl;
    const delimiter = (prodUrl.indexOf('?') > -1) ? '&' : '?'
    const doc =
      "<!DOCTYPE html><html><head><meta name=viewport content='width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no'>" +
      "<meta property='og:title' content='Shut up and buy it'/>" +
      "<meta property='og:image' content='" + image + "'/>"  +
      // "<meta property='og:site_name' content='Shut up and buy it'/>" +
      "<meta property='og:description' content='" + message + "'/>" +
      "<meta name='twitter:card' content='summary_large_image'>" +
      "<meta name='twitter:site' content='https://suab.it'>" +
      "<meta name='twitter:creator' content='@ShutUpNBuyIt'>" +
      "<meta name='twitter:title' content='Shut up and buy it'>" +
      "<meta name='twitter:description' content='" + message + "'>" +
      "<meta name='twitter:text:description' content='" + message + "'>" +
      "<meta name='twitter:image' content='" + image + "'>" +
      "<link href='/static/css/app.e3bb14f2b7019fa3a88190b2ff103c47.css' rel='stylesheet'>" +
      "<link href='https://fonts.googleapis.com/css?family=Passion+One' rel='stylesheet'>" +
      "<title>Shut up and buy it</title>" +
      "<script type='text/javascript'> var timer = setTimeout(function() {window.location.href = '" + prodUrl + delimiter + "'}, 2000);</script>" +
      "</head><body><div id='app'><div id='Suabi'>" +
      "<h1 class='flashText'>Shut up<br/>and buy it.</h1>" +
      "</div></div></body></html>"
    // res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.status(200).send( doc );
  });
});
