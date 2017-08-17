const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.ogRewrite = functions.https.onRequest((req, res) => {
  const suabiId = req.url.split("/")[2];
  console.log(req.url);
  admin.database().ref('suabiLinks/' + suabiId).once('value', (snapshot) => {
    var item = snapshot.val();
    console.log(item);
    const title = item.message;
    const image = item.prodImage.mediumImage;
    const meta =
      "<meta property='og:title' content='" + title + "'/>" +
      "<meta property='og:image' content='" + image + "'/>"
      //  +
      // "<meta property='og:site_name' content='Shut up and buy it'/>" +
      // "<meta property='og:description' content='Shut up and buy it'/>"
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.status(200).send( `<!DOCTYPE html><html><head>${meta}<title>Shut up and buy it</title><link href=/static/css/app.47b3d2ced944ba1be638dbb4fdd176ed.css rel=stylesheet></head><body><div id=app></div><script type=text/javascript src=/static/js/manifest.2201bf4db46176f5162e.js></script><script type=text/javascript src=/static/js/vendor.eb0db8723b4e12fd4711.js></script><script type=text/javascript src=/static/js/app.8a0dd62d8bc38277b550.js></script></body></html>` );
  });
});
