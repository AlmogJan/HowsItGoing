"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilService = void 0;
exports.utilService = {
    makeId
};
function makeId(length = 16) {
    var txt = '';
    var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
