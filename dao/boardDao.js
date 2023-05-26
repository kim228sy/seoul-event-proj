const { Op } = require("sequelize");
const { Board, User } = require("../models/index");
const axios = require("axios");

const apiUrl =
  "http://openapi.seoul.go.kr:8088/5665425a446b74753637787271576c/JSON/culturalEventInfo/1/5/";

const dao = {
  // 로그인을 위한 사용자 조회
  selectUser(params) {
    const { title } = params;
    return new Promise((resolve, reject) => {
      Board.findOne({
        attributes: ["id", "codename", "guname"],
        where: { title: params.title },
      })
        .then((selectedOne) => {
          resolve(selectedOne);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 등록
  insert(params) {
    console.log(params);
    return new Promise((resolve, reject) => {
      Board.create(params)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 리스트 조회
  selectList(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(apiUrl)
        .then((response) => {
          const apiData = response.data.culturalEventInfo.row; // API에서 받아온 데이터

          // API에서 받아온 데이터를 가공하여 params에 저장
          const processedData = apiData.map((data) => ({
            codename: data.CODENAME,
            guname: data.GUNAME,
          }));

          // where 검색 조건
          const setQuery = {};
          if (params.codename) {
            setQuery.where = {
              ...setQuery.where,
              codename: { [Op.like]: `%${params.codename}%` }, // like검색
            };
          }
          if (params.guname) {
            setQuery.where = {
              ...(setQuery.where = {
                guname: { [Op.like]: `%${params.guname}%` },
              }),
            };
          }

          // order by 정렬 조건
          setQuery.order = [["id", "DESC"]];

          return Board.findAndCountAll({
            ...setQuery,
          });
        })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      Board.update(params, {
        where: { id: params.id },
      })
        .then(([updated]) => {
          resolve({ updatedCount: updated });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      Board.destroy({
        where: { id: params.id },
      })
        .then((deleted) => {
          resolve({ deletedCount: deleted });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 데이터베이스에 데이터 저장 로직
  saveData(codename, guname) {},
};

module.exports = dao;
