const express = require("express");

const router = express.Router();
const logger = require("../lib/logger");
const postService = require("../service/postService");

const eventUtil = require("../lib/eventUtil");

// 검색
router.post("/", async (req, res) => {
  try {
    const params = {
      id: req.query.id,
      title: req.body.TITLE,
      codeName: req.body.CODENAME,
      guName: req.body.GUNAME,
      title: req.body.TITLE,
      date: req.body.DATE,
      place: req.body.PLACE,
      useFee: req.body.USE_FEE,
      startDate: req.body.STRTDATE,
      endDate: req.body.END_DATE,
    };
    logger.info(`(post.reg.params) ${JSON.stringify(params)}`);

    // // 입력값 null 체크
    // if (!params.title) {
    //   const err = new Error("Not allowed null (title)");
    //   logger.error(err.toString());

    //   res.status(500).json({ err: err.toString() });
    // }

    // 비즈니스 로직 호출
    const result = await postService.reg(params);
    logger.info(`(post.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get("/", async (req, res) => {
  try {
    const params = {
      TITLE: req.query.TITLE,
    };
    logger.info(`(post.list.params) ${JSON.stringify(params)}`);

    const result = await postService.list(params);
    logger.info(`(post.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get("/:id", async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(post.info.params) ${JSON.stringify(params)}`);

    const result = await postService.info(params);
    logger.info(`(post.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put("/:id", async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      TITLE: req.body.TITLE,
    };
    logger.info(`(post.update.params) ${JSON.stringify(params)}`);

    const result = await postService.edit(params);
    logger.info(`(post.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete("/:id", async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(post.delete.params) ${JSON.stringify(params)}`);

    const result = await postService.delete(params);
    logger.info(`(post.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
