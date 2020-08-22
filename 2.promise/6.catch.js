const Promise = require("./promise");

Promise.prototype.catch = function(onReject) {
    return this.then(null, onReject);
}