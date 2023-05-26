const { Op } = require("sequelize");
const { Post } = require("../models/index");

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Post.create(params)
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
    // where 검색 조건
    const setQuery = {};
    if (params.TITLE) {
      setQuery.where = {
        ...setQuery.where,
        TITLE: { [Op.like]: `%${params.TITLE}%` }, // like검색
      };
    }
    if (params.TITLE) {
      setQuery.where = {
        ...(setQuery.where = {
          TITLE: { [Op.like]: `%${params.TITLE}%` },
        }),
      };
    }

    // order by 정렬 조건
    setQuery.order = [["id", "DESC"]];

    return new Promise((resolve, reject) => {
      Post.findAndCountAll({
        ...setQuery,
      })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 상세정보 조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Post.findByPk(params.id)
        .then((selectedInfo) => {
          resolve(selectedInfo);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      Post.update(params, {
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
      Post.destroy({
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
};

module.exports = dao;
