const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLVisit = new Schema(
  {
    queryPayload: { type: Object, default: null },
    headerPayload: { type: Object, default: null },
    url: { type: mongoose.Types.ObjectId, ref: "urls", required: true },
    ipAddress: { type: String, default: null },
    source: { type: String, default: null },
    geoLocation: { type: Object, default: null },
    device: { type: String, default: null },
    os: { type: Object, default: null },
    browser: { type: Object, default: null },
    source: { type: String, default: null },
    isMobile: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "url_visits" }
);

module.exports = mongoose.model("url_visits", URLVisit);
