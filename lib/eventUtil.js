const superagent = require("superagent");
const dotenv = require("dotenv");
const logger = require("../lib/logger");
dotenv.config();

const eventDataConfig = {
  url: process.env.API_URL,
  key: process.env.API_KEY,
};
const eventUtil = {
  async getData(params) {
    let response = null;
    let eventData = null; // 변수명 수정: eveventData -> eventData
    let result = {};
    console.log(params);
    // console.log("🚀 ~ file: eventUtil.js:16 ~ getData ~ params:", params);
    try {
      response = await superagent.get(eventDataConfig.url).query({
        serviceKey: eventDataConfig.key,
        CODENAME: params.CODENAME,
        GUNAME: params.GUNAME,
        TITLE: params.TITLE,
        DATE: params.DATE,
        PLACE: params.PLACE,
        ORG_NAME: params.ORG_NAME,
        USE_TRGT: params.USE_TRGT,
        USE_FEE: params.USE_FEE,
        PLAYER: params.PLAYER,
        PROGRAM: params.PROGRAM,
        ETC_DESC: params.ETC_DESC,
        ORG_LINK: params.ORG_LINK,
        MAIN_IMG: params.MAIN_IMG,
        RGSTDATE: params.RGSTDATE,
        TICKET: params.TICKET,
        STRTDATE: params.STRTDATE,
        END_DATE: params.END_DATE,
        THECODE: params.THECODE,
      });
      eventData = JSON.parse(response.text)?.culturalEventInfo?.row;
      // console.log(
      //   "🚀 ~ file: eventUtil.js:41 ~ getData ~ eventData:",
      //   eventData
      // );
      // console.log(eventData);
      eventData.forEach((v) => {
        // 변수명 수정: eveventData -> eventData
        if (result[v.TITLE] !== undefined) {
          result[v.TITLE].push(v);
        } else {
          result[v.TITLE] = [v];
        }
      });
      logger.debug(`(eventUtil.getData)-${result}`);
    } catch (err) {
      logger.error(`(eventUtil.getData)-${err.toString()}`);
    }
    return { result };
  },
};

module.exports = eventUtil;
