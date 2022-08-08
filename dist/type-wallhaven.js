(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
      factory((global["type-wallhaven"] = {})));
})(this, function (exports) {
  "use strict";

  const $axios = require("./src/utils/axios");
  const ALL_CATEGORIES = ["general", "anime", "people"];
  const ALL_PURITY = ["sfw", "sketchy", "nsfw"];
  const searchMeta = {
    order: [
      { value: "desc", label: "降序" },
      { value: "asc", label: "升序" },
    ],
    purity: [
      { value: "sfw", label: "普通级" },
      { value: "sketchy", label: "开放级" },
      { value: "nsfw", label: "限制级", rule: { key: "apiKey", value: true } },
    ],
    sorting: [
      // 排序
      { value: "relevance", label: "相关性" },
      { value: "random", label: "随机" },
      { value: "date_added", label: "上传日期" },
      { value: "views", label: "浏览量" },
      { value: "favorites", label: "收藏数量" },
      { value: "toplist", label: "排行榜" },
      { value: "hot", label: "热度" },
    ],
    topRange: [
      // 排行榜日期
      { value: "1d", label: "当日" },
      { value: "3d", label: "三日内" },
      { value: "1w", label: "上周" },
      { value: "1M", label: "当月" },
      { value: "3M", label: "三月内" },
      { value: "6M", label: "六月内" },
      { value: "1y", label: "去年" },
    ],
    resolutionsArray: [
      // 分辨率
      {
        item: ["2560x1080", "1280x720", "1280x800", "1280x960", "1280x1024"],
      },
      {
        item: ["3440x1440", "1600x900", "1600x1000", "1600x1200", "1600x1280"],
      },
      {
        item: ["3840x1600", "1920x1080", "1920x1200", "1920x1440", "1920x1536"],
      },
      {
        item: ["2560x1440", "2560x1600", "2560x1920", "2560x2048"],
      },
      {
        item: ["3840x2160", "3840x2400", "3840x2880", "3840x3072"],
      },
    ],
    ratiosArray: [
      // 比例
      {
        item: ["16x9", "21x9", "9x16", "1x1"],
      },
      {
        item: ["16x10", "32x9", "10x16", "3x2"],
      },
      {
        item: ["", "48x9", "9x18", "4x3"],
      },
      {
        item: ["", "", "", "5x4"],
      },
    ],
    colorsArray: [
      // ，颜色
      {
        item: ["660000", "990000", "cc0000", "cc3333", "ea4c88", "993399"],
      },
      {
        item: ["663399", "333399", "0066cc", "0099cc", "66cccc", "77cc33"],
      },
      {
        item: ["669900", "336600", "666600", "999900", "cccc33", "ffff00"],
      },
      {
        item: ["ffcc33", "ff9900", "ff6600", "cc6633", "996633", "663300"],
      },
      {
        item: ["000000", "999999", "cccccc", "ffffff", "424153", "none"],
      },
    ],
  };

  const formatCategory = (customParams) => {
    return ALL_CATEGORIES.map((cat) => {
      return String(Number(customParams.categories.indexOf(cat) > -1));
    }).join("");
  };
  const formatPurity = (customParams) => {
    return ALL_PURITY.map((cat) => {
      return String(Number(customParams.purity.indexOf(cat) > -1));
    }).join("");
  };
  const getData = (params = {}) => {
    return new Promise((resolve) => {
      let str = [];
      Object.keys(params).map((r) => {
        str.push(r + "=" + params[r]);
      });
      $axios
        .get("search?" + str.join("&"))
        .then((r) => {
          resolve(r);
        })
        .catch((err) => {
          resolve(err);
        });
    });
  };

  exports.formatCategory = formatCategory;
  exports.formatPurity = formatPurity;
  exports.getData = getData;
  exports.searchMeta = searchMeta;

  Object.defineProperty(exports, "__esModule", { value: true });
});
