const router = require("express").Router();


router.get("/", (req, res) => {
    res.render("administration/platform", { layout: false })
})


module.exports = router;
