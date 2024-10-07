// import data from '../data/themes.json' assert { type: 'json' };

const { readFile } = require("fs");

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

const getColorThemesAction = async (req, res) => {

    const colorThemes = readFile('../data/themes.json', 'utf8');

    res.json({
        'color-themes': {
            'theme-1': {
                name: 'Theme 1',
                colors: {
                    primary: '#ff0000',
                    secondary: '#00ff00',
                    neutral: '#0000ff',
                    accent: '#ffff00'
                }
            },
            'theme-2': {
                name: 'Theme 2',
                colors: {
                    primary: '#ff00ff',
                    secondary: '#00ffff',
                    neutral: '#000000',
                    accent: '#ffffff'
                }
            }
        }
    });
};

module.exports = {
    apiIndexAction,
    getColorThemesAction
};