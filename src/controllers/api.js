const { logger } = require("../logger.js");
const { getPageThemes, upsertPageTheme } = require("../model/page-themes.js");

const apiIndexAction = (req, res) => {
    const curDate = new Date();
    const time = curDate.toLocaleTimeString();
    const date = curDate.toLocaleDateString();

    const jsonOutput = {
        message: 'Davemour API V1',
        version: 'v1.1',
        date,
        time
    };

    logger.info('API index accessed');
    res.json(jsonOutput);
}

const getThemesAction = async (req, res) => {

    const pageThemes = await getPageThemes();

    logger.info('Themes data accessed');

    res.json(pageThemes);
};

const putThemeByIdAction = async (req, res) => {
    const themeId = req.params.id;

    if (!themeId) {
        logger.error('Themes data update failed: No theme ID provided');
        res.status(400).json({ message: 'No theme ID provided' });
        return;
    }

    const themeData = req.body;

    console.log(themeData);

    if (!themeData) {
        logger.error('Themes data update failed: No changes provided');
        res.status(400).json({ message: 'No changes provided' });
        return;
    }

    const result = await upsertPageTheme(themeId, themeData);

    if (!result.success) {
        logger.error('Themes data update failed: Database error');
        res.status(500).json({ message: 'Database error' });
        return;
    }

    res.json(result);
}

module.exports = {
    apiIndexAction,
    getThemesAction,
    putThemeByIdAction
};