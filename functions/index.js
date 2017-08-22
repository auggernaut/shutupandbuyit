const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// ogRewrite
// fetches suabi database record, sets index.html meta tags.
//
exports.ogRewrite = functions.https.onRequest((req, res) => {
  const suabiId = req.url.split("/")[2];
  console.log(req.url);
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
      "<meta name='twitter:site' content='@SuBuyIt'>" +
      "<meta name='twitter:creator' content='@augustinbralley'>" +
      "<meta name='twitter:title' content='Shut up and buy it'>" +
      "<meta name='twitter:description' content='" + message + "'>" +
      "<meta name='twitter:text:description' content='" + message + "'>" +
      "<meta name='twitter:image' content='" + image + "'>" +
      "<link href='/static/css/app.8304b055064f87c7204f294e6baa09d2.css' rel=stylesheet>" +
      "<title>Shut up and buy it</title>" +
      "</head><body><div id='app'><div id='ViewLink'>" +
      "<img src='" + image + "' id='prodImage'/><h1 id='message'>" + message + "</h1>" +
      "<a href='" + prodUrl + delimiter + "tag=shutupandbuyi-20'><button class='button'>Shut up and buy it</button></a>" +
      "</div><div class='fb-comments' data-href='https://shutupandbuy.it/p/" + suabiId + "' data-numposts='20' data-width='375' style='width:375px;margin: 0 auto;display:block'></div>" +
      "<div id='fb-root'></div>\n<script>(function(d, s, id) {\n  var js, fjs = d.getElementsByTagName(s)[0];\n  if (d.getElementById(id)) return;\n  js = d.createElement(s); js.id = id;\n  js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=712648035572474';\n  fjs.parentNode.insertBefore(js, fjs);\n}(document, 'script', 'facebook-jssdk'));</script>" +
      "</div></body></html>"
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.status(200).send( doc );
  });
});
