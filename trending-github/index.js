"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var cheerio = __importStar(require("cheerio"));
var trendingGitHub = function (period, language) {
    if (period === void 0) { period = 'daily'; }
    if (language === void 0) { language = ''; }
    return (new Promise(function (resolve, reject) { return axios_1.default
        .get("https://github.com/trending/" + encodeURIComponent(language) + "?since=" + period)
        .then(function (response) {
        var $ = cheerio.load(response.data);
        var repos = [];
        $('article').each(function (index, repo) {
            var title = $(repo).find('h1.h3 a').text().replace(/\s/g, '');
            var starLink = "/" + title.replace(/ /g, '') + "/stargazers";
            var forkLink = "/" + title.replace(/ /g, '') + "/network";
            repos.push({
                author: title.split('/')[0],
                name: title.split('/')[1],
                href: "https://github.com/" + title.replace(/ /g, ''),
                description: $(repo).find('p').text().trim() || null,
                language: $(repo).find('[itemprop=programmingLanguage]').text().trim(),
                stars: parseInt($(repo).find("[href=\"" + starLink + "\"]").text().trim()
                    .replace(',', '') || '0', 0),
                forks: parseInt($(repo).find("[href=\"" + forkLink + "\"]").text().trim()
                    .replace(',', '') || '0', 0),
                starsToday: parseInt($(repo).find('span.float-sm-right:contains("stars today")').text().trim()
                    .replace('stars today', '')
                    .replace(',', '') || '0', 0),
            });
        });
        resolve(repos);
    })
        .catch(function (err) {
        reject(err);
    }); }));
};
exports.default = trendingGitHub;
// For CommonJS default export support
module.exports = trendingGitHub;
module.exports.default = trendingGitHub;
