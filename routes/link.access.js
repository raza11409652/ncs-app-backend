const LinkService = require("../service/link.service");
const { parseHeaderUserAgent } = require("../utils/ua.parser");

const linkAccessRoutes = require("express").Router();
const linkService = new LinkService();
linkAccessRoutes.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await linkService.getLinkByFilter({ encoded: id });
    if (!data) throw new Error("URL not found");
    /**
     * Insights can be captured
     */
    const x = parseHeaderUserAgent(req.headers);
    const visit = {
      ...x,
      url: data._id,
      queryPayload: req.query,
      headerPayload: req.headers,
      ipAddress: req.ip,
    };
    linkService
      .newVisit(visit)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
    res.redirect(data["longUrl"]);
  } catch (e) {
    console.log(e);
    res.send(404);
  }
});

module.exports = linkAccessRoutes;
