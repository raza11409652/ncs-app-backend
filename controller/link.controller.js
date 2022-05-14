const LinkService = require("../service/link.service");
const { encode } = require("../utils/encoder");
const { getPagination, getPagingData } = require("../utils/pagination");
const { generateQrCode } = require("../utils/qrcode");
const { Types } = require("mongoose");
const baseURL = process.env.BASE_URL;
const linkService = new LinkService();
class LinkController {
  async newLinkShort(req, res) {
    try {
      const body = req.body;
      const longUrl = body["long_url"];
      const timestamp = new Date().getTime();
      const encoded = encode(timestamp, 9);
      const shortUrl = baseURL + encoded;
      const qr = await generateQrCode(shortUrl);
      // console.log(qr);
      const option = { shortUrl, longUrl, qrCode: qr, encoded, timestamp };
      const data = await linkService.newLink(option);
      return res.json(data);
    } catch (e) {
      return res
        .status(400)
        .jsonp({ error: true, message: e?.message || "DB error" });
    }
  }

  async getLinks(req, res) {
    try {
      const query = req?.["query"];
      const page = query?.["page"] || 1;
      const size = query?.["size"] || 10;
      const searchQuery = query["search_query"] || null;
      //   const orderBy =query?.["sort"]
      let filter = {};
      if (searchQuery)
        filter = {
          ...filter,
          $or: [
            { longUrl: { $regex: searchQuery, $options: "i" } },
            { shortUrl: { $regex: searchQuery, $options: "i" } },
          ],
        };
      const { limit, skip } = getPagination(page, size);
      const { count, records } = await linkService.getLinks(
        { ...filter },
        limit,
        skip
      );
      const response = getPagingData(count, page, limit, records);
      return res.jsonp({ ...response });
    } catch (e) {
      return res
        .status(400)
        .jsonp({ error: true, message: e?.message || "DB error" });
    }
  }

  async updateLink(req, res) {
    try {
      let id = req.params.id;
      if (Types.ObjectId.isValid(id) === false)
        throw new Error("Invalid link id is passed");
      id = new Types.ObjectId(id);
      const long_url = req.body["long_url"];
      const data = await linkService.getLinkByFilter({ _id: id });
      if (!data) throw new Error("Not found");
      if (String(data.longUrl) === String(long_url))
        throw new Error("URL is not changed");
      const timestamp = new Date().getTime();
      const encoded = encode(timestamp, 9);
      const shortUrl = baseURL + encoded;
      const qr = await generateQrCode(shortUrl);
      // console.log(qr);
      const option = {
        shortUrl,
        longUrl: long_url,
        qrCode: qr,
        encoded,
        timestamp,
      };
      const updated = await linkService.updateLink(option, data._id);
      return res.jsonp(updated);
    } catch (e) {
      return res
        .status(400)
        .jsonp({ error: true, message: e?.message || "DB error" });
    }
  }

  /**
   * get link details
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async getLinkDetails(req, res) {
    try {
      const query = req?.["query"];
      const page = query?.["page"] || 1;
      const size = query?.["size"] || 10;
      let id = req.params.id;
      if (Types.ObjectId.isValid(id) === false)
        throw new Error("Invalid link id is passed");
      id = new Types.ObjectId(id);
      const data = await linkService.getLinkByFilter({ _id: id });
      if (!data) throw new Error("Not found");
      const { limit, skip } = getPagination(page, size);
      const { count, records } = await linkService.getVisits(
        { url: data._id },
        limit,
        skip
      );
      const response = getPagingData(count, page, limit, records);
      return res.jsonp({ data, visit: response });
    } catch (e) {
      return res
        .status(400)
        .jsonp({ error: true, message: e?.message || "DB error" });
    }
  }
}
module.exports = LinkController;
