const { body, validationResult } = require("express-validator");

exports.newLinkValidator=[
    body("long_url").isURL().withMessage("Please enter valid URL"),
    async(req,res,next)=>{
        let errors = validationResult(req).array();
        if (errors.length > 0)
          return res.status(400).jsonp({
            error: true,
            message: errors[0].msg,
            errors,
          });
        next();

    }
]