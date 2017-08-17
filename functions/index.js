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
    const title = item.message;
    const image = item.prodImage.mediumImage;
    const meta =
      "<meta property='og:title' content='" + title + "'/>" +
      "<meta property='og:image' content='" + image + "'/>" //  +
      // "<meta property='og:site_name' content='Shut up and buy it'/>" +
      // "<meta property='og:description' content='Shut up and buy it'/>"
    // res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.status(200).send( `<!DOCTYPE html><html><head><meta name=viewport content="width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no">${meta}<title>Shut up and buy it</title><link href=/static/css/app.de977a96a78b31c5fab18ff11b9c686d.css rel=stylesheet></head><body><div id=app></div><script type=text/javascript src=/static/js/manifest.1a014120581796799512.js></script><script type=text/javascript src=/static/js/vendor.eb0db8723b4e12fd4711.js></script><script type=text/javascript src=/static/js/app.50e3bac54fd2c4edd9f5.js></script></body></html>` );
  });
});
