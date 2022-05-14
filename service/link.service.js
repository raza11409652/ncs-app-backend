const URLSchema = require("../models/url");
const URLVisit = require("../models/url.visit");
class LinkService {
  // constructor(){}

  async newLink(option) {
    try {
      const x = new URLSchema(option);
      return await x.save();
    } catch (e) {
      throw new Error(e);
    }
  }
  /**
   *
   * @param {*} filter
   */

  async getLinkByFilter(filter) {
    try {
      const data = await URLSchema.findOne(filter);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getLinks(filter, limit, skip) {
    try {
      const count = await URLSchema.count(filter);
      const records = await URLSchema.find(filter)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit))
        .skip(parseInt(skip));
      return { count, records };
    } catch (e) {
      throw new Error(e);
    }
  }
  /**
   * New visit save
   * @param {*} option
   * @returns
   */
  async newVisit(option) {
    try {
      const x = new URLVisit(option);
      return await x.save();
    } catch (e) {}
  }

  async getVisits(filter, limit, skip) {
    try {
      const count = await URLVisit.count(filter);
      const records = await URLVisit.find(filter)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit))
        .skip(parseInt(skip));
      return { count, records };
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateLink(option, id) {
    return await URLSchema.findByIdAndUpdate(id, option, { new: true });
  }
}

module.exports = LinkService;
