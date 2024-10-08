// import data from '../data/themes.json' assert { type: 'json' };

const { readFile } = require("fs").promises;


const dataDir = require('path').join(__dirname, '../data');


const apiIndexAction = (req, res) => {

    const person = {
        name: 'John Doe',
        age: 25,
        email: 'jdoe@m.com'
    };

    const personProxy = new Proxy(person, {
        get(target, prop) {
            return prop in target ? target[prop] : 'Property does not exist';
        }
    });

    res.json({ message: 'API v1', name: personProxy.name, age: personProxy.age, email: personProxy.email, job: personProxy.job });
}

const getThemesAction = async (req, res) => {

    const themes = await readFile(dataDir + '/themes.json', 'utf8').then(data => JSON.parse(data));
    res.json(themes);
};

const putThemesAction = async (req, res) => {
    const themes = await readFile(dataDir + '/themes.json', 'utf8').then(data => JSON.parse(data));

    const themeChanges = req.body;

    if (!themeChanges) {
        res.status(400).json({ message: 'No changes provided' });
        return;
    }

    const updatedThemes = {
        'color-themes': { ...themes['color-themes'], ...(themeChanges['color-themes'] || {}) },
        'font-themes': { ...themes['font-themes'], ...(themeChanges['font-themes'] || {}) },
        'base-text': { ...themes['base-text'], ...(themeChanges['base-text'] || {}) }
    };

    res.json(updatedThemes);
}

module.exports = {
    apiIndexAction,
    getThemesAction,
    putThemesAction
};