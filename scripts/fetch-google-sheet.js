const fs = require("fs");
const archieml = require("archieml");
const request = require("request");

const CWD = process.cwd();
const CONFIG_PATH = `${CWD}/config.json`;
const CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
const { sheet } = CONFIG.google;

const makeRequest = (opt, cb) => {
  const url = `https://docs.google.com/spreadsheets/d/${opt.id}/export?id=${opt.id}&gid=${opt.gid}&format=csv`;
  request(url, (error, response, body) => {
    if (error) console.log(error);
    else if (response) {
      const file = `${CWD}/${opt.filepath || 'src/data/sheet.csv'}`;
      fs.writeFile(file, body, err => {
        if (err) console.error(err);
        cb();
      });
    }
  });
};

function init() {
  let i = 0;
  const next = () => {
    const d = sheet[i];
    if (d.id)
      makeRequest(d, () => {
        i += 1;
        if (i < sheet.length) next();
        else process.exit();
      });
  };

  next();
}

init();
