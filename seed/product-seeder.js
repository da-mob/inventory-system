var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/xx-shopping');

var products = [
  new Product({
    imagePath: 'https://images-eu.ssl-images-amazon.com/images/I/81PBkciE0ML._AC_SS350_.jpg',
    title: 'Dragonwar ELE-G9 Thor BlueTrack and Blue Sensor Gaming Mouse with Macro function',
    description: 'Features: * Ergonomic design for professional gamer * Gaming mouse with 7 control buttons * Assign your choice of key gaming action to programmable buttons to create your own customs profiles *512k in-store memory which macro function can use in difference computers *Mouse cable length 1.8 meters * LED Light * Suitable for almost every surface * Gold-plated USB Connector for a Reliable Transmission Integrity * Resolution: 800/ 1600/ 2400/ 3200 dpi * Interface: USB',
    price: 899,
    quantity: 100
  }),
  new Product({
    imagePath: 'https://images-eu.ssl-images-amazon.com/images/I/811YM2Go9GL._SL150_.jpg',
    title: 'Dell KB216 Wired Multimedia USB Keyboard',
    description: 'Wired keyboard for everyday home or office use. Dell wired keyboard provides a convenient keyboard solution for everyday home or office computing uses. The keyboards full layout with chiclet style keys allows for efficient, comfortable typing excellent for everyday usage on virtually any task at hand. Wired keyboard for everyday home or office use. Multimedia keys for quick actions and commands. Comfortable, desk-centric design.',
    price: 523,
    quantity: 200
  }),
  new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/513EG74nyFL._AC_UL160_SR160,160_.jpg',
    title: 'Samsung Monitor LED 18.5" Ips Screen S19F350HNW',
    description: 'Incredibly slim profile and stylish, contemporary design â€¢ Super slim panel: At an incredibly slim 10mm - as slender as a ballpoint pen - the one-piece panel is more than twice as thin as standard Samsung monitors â€¢ Simple circular stand: A simple circular stand elegantly complements the super slim display â€¢ Patterned rear panel: Horizontal patterning on the rear panel provides a stylish, contemporary finish Extra-wide viewing angle for the perfect view from anywhere â€¢ Extra-wide 178-degree viewing angle: An expanded 178-degree vertical and horizontal viewing angle ensures a clear picture from wherever you are watching â€¢ Whether sitting back to relax or gathered around with friends, the wider viewing angle means everyone enjoys the perfect view from any position. The product comes under manufacturer warranty if any kind of manufacturer defect customer may call on Samsung toll free 180030008282/18002668282 and get replacement from Samsung onsite..',
    price: 5422,
    quantity: 150  }),
  new Product({
    imagePath: 'https://images-eu.ssl-images-amazon.com/images/I/41bIKmpI6VL._AC_US160_FMwebp_QL70_.jpg',
    title: 'HP Wireless Ink Tank GT 5820 All-in-One Printer',
    description: 'Device languages: HP PCL 3 GUI. Output: Black and white or color. Print method: Drop-on-demand thermal inkjet printing. Print speed: Print speeds vary according to the complexity of the document..',
    price: 12650,
    quantity: 170
  }),
  new Product({
    imagePath: 'https://images-eu.ssl-images-amazon.com/images/I/31XeRMvS4eL._AC_US160_FMwebp_QL70_.jpg',
    title: "Seagate 1TB Backup Plus Slim USB 3.0 Portable 2.5 Inch External Hard Drive for PC and Mac with 2 Months Free Adobe Creative Cloud Photography Plan - Red",
    description: "1 TB PORTABLE SLIM HARD DRIVE USB 3.0 The Backup Plus Slim Portable Drive is the simple, one-click way to protect and share your entire digital life. It’s ready to take with you and go. All your photos, movies, and videos can be backed up using the downloadable Seagate Dashboard software, including the ones you’ve shared on Facebook, Flickr, and YouTube. Run a one-click backup or schedule an automatic backup plan to protect your files on your Backup Plus Slim Portable Drive at your convenience. High-speed USB 3.0 and 2.0 connectivity offers plug-and-play functionality on your PC without the need of an external power supply.",
    price: 3999,
     quantity: 300
  })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
