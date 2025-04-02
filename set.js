const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0V1UzRpdU00QnoxQ1M3UlFDU2l5U29aeUpUdWwydVpZcFhDaTc5QUtFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVVsd3Y1VWlKenVKb3hSd0ZFUHhyc2NZUS95d2dzS3B3OFc1WHZsbHJEUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhRkF0eFltR2MrN2xxdmJPelY5cUtaVmFnQmk5QlhWd2dLdzJaUHFvYzNJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5bHc1SXdnR1ZucmhOTUs0WExrcW9DQ1I4dTVGZUw5WW45K20yWFpZK1RZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBNUFowSDBDTWZWNE96YngxME90cUsxUGdjd2EwbDI3ZlF4aFVWSi9GbEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InI5dXNXd1lYdWRKdDZUNTZNZmRWWVBxaFQxajhjQnF2WTNIdlQwcjd0VXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEN1dTV1bmc2dXk5YjZYOXRrZkYzYkNmS0V1WVhONkx2bjBMUHhMTnJFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZW9iTlhDVEFjY2xMd083TWsxajFUN3FKbHpLcmdjMXVHOHZvVU1OSFBnST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJITWo2V0FpamlQR3pGVFd4dGFZaHJraU5PUUFETWtYandudXN6bitIVGNOaXh0YjdoUGQwK0k4RENoMUVKWUwzL2hMaUFKLzUxbGdJMS9JeW53ZENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgsImFkdlNlY3JldEtleSI6IlcxYlhuZ3p5YjhIcGNla2YyNjZtRnlqSGhiR1ZhdzE4UFpOU2pZTjlBeXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkVINXFqNjN4UzBhRUhlTXhRbTV3LXciLCJwaG9uZUlkIjoiZDJiMzk0MDgtN2VkNS00YWJjLWI3MmYtOTIwODNlZjRmYjVmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBEc09PVmpIUW5JK1gyQkxjZXZXdXo4OFAzbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsb09Ld3hMbk03Vm1SRGZNamtoRUNNNDlBY289In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWEFSQ0VDUTEiLCJtZSI6eyJpZCI6IjIzNDgxMzk0MDE3Mjk6MzZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lMYytMY0RFT2lSdGI4R0dCZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ijhsb3p1QkZ0UlQ4MG1VMFBZaEM1aVNUQVhGQVJTQ0RVMDBiKzE2Ui8wMjQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImpEdlZ3MTVDWFBjZVkzVGpxQVhJRC9wbEErVjd1TjVkb0NnQUtxSWREWERSb1F4UlNCVXNtMTEzMWV3UjFMLzlhalZKcnlZM2lQK29xYWhxYldQM0N3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJjMGpMa3hubDd2VWVUZFVHU3V3dG1ycjZtVmpobVYvejFKVGR0WXNLY1pSM3daZGg1a1dWNVlteHdOOExnMHN0L0tOa0hQQWhWWUdiYzBpRURyTEhCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxMzk0MDE3Mjk6MzZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZkphTTdnUmJVVS9OSmxORDJJUXVZa2t3RnhRRVVnZzFOTkcvdGVrZjlOdSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MzYwMzk1N30=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Nathaniel",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2348139401729",
    AUTO_LIKE: process.env.STATUS_LIKE || "off",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/ra6nlv.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
