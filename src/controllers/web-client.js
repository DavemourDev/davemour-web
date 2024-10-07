const viewsPath = require('path').join(__dirname, '../../views');

const indexPageAction = (req, res) => {
    res.sendFile(viewsPath + '/index.html');
}

const prototypePageAction = (req, res) => {
    res.sendFile(viewsPath + '/prototype-1.html');
}

module.exports = {
    indexPageAction,
    prototypePageAction
};