const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");
const eventUtil = require("../lib/eventUtil");
const eventService = require("../service/eventService");

router.get("/", async (req, res) => {
  try {
    const params = {
      CODENAME: req.body.CODENAME,
      GUNAME: req.body.GUNAME,
      TITLE: req.body.TITLE,
      DATE: req.body.DATE,
      PLACE: req.body.PLACE,
      ORG_NAME: req.body.ORG_NAME,
      USE_TRGT: req.body.USE_TRGT,
      USE_FEE: req.body.USE_FEE,
      PLAYER: req.body.PLAYER,
      PROGRAM: req.body.PROGRAM,
      ETC_DESC: req.body.ETC_DESC,
      ORG_LINK: req.body.ORG_LINK,
      MAIN_IMG: req.body.MAIN_IMG,
      RGSTDATE: req.body.RGSTDATE,
      TICKET: req.body.TICKET,
      STRTDATE: req.body.STRTDATE,
      END_DATE: req.body.END_DATE,
      THECODE: req.body.THECODE,
    };
    logger.info(`(event.reg.params) ${JSON.stringify(params)}`);

    //입력값 null 체크
    // if (!params.TITLE) {
    //   const err = new Error("Not allowed null (TITLE)");
    //   logger.error(err.toString());
    //   res.status(500).JSON({ err: toString() });
    // }

    //비즈니스 로직 호출
    const result = await eventUtil.getData(params); // eventService 사용
    logger.info(`(event.reg.result) ${JSON.stringify(result)}`);

    //최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
