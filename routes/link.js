const LinkController = require("../controller/link.controller");
const { newLinkValidator } = require("../validator/link");
const linkRoutes = require("express").Router();
const linkController = new LinkController();

linkRoutes.post("/", newLinkValidator, linkController.newLinkShort);
linkRoutes.get("/", linkController.getLinks);
linkRoutes.get("/:id", linkController.getLinkDetails);
linkRoutes.put("/:id", newLinkValidator, linkController.updateLink);
module.exports = linkRoutes;
