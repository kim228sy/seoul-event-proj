const request = require("superagent");
const logger = require("../lib/logger");
const dotenv = require("dotenv");

const { Post } = require("../models/index");

dotenv.config();

const eventDataConfig = {
  url: process.env.API_URL,
  key: process.env.API_KEY,
};

const event = {
  async getData(params) {
    // 데이터 가져오기 로직
    let response = null;
    let result = {};

    // console.log("🚀 ~ file: event.js:16 ~ getData ~ params:", params)
    try {
      response = await request.get(eventDataConfig.url).query({
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

      // const eventData = JSON.parse(response.text).response?.body?.items?.item;
      const eventData = JSON.parse(response.text)?.culturalEventInfo?.row;

      // console.log("🚀 ~ file: event.js:47 ~ getData ~ eventData:", eventData)

      eventData.forEach(async (e) => {
        if (result[e.TITLE] !== undefined) {
          result[e.TITLE].push(e);
        } else {
          result[e.TITLE] = [e];
        }
        try {
          const inserted = await Post.create({
            codeName: e.CODENAME,
            guName: e.GUNAME,
            title: e.TITLE,
            date: e.DATE,
            place: e.PLACE,
            useFee: e.USE_FEE,
            startDate: e.STRTDATE,
            endDate: e.END_DATE,
          });
          logger.debug(`(event.getData)-${result}`);
          logger.debug(`Data inserted: ${JSON.stringify(inserted)}`);
        } catch (err) {
          logger.error(`(event.getData) - ${err.toString()}`);
          logger.error(`Error inserting data: ${err.toString()}`);
        }
      });
    } catch (err) {
      logger.error(`(event.getData) - ${err.toString()}`);
    }

    return { result };
  },
};

module.exports = event;