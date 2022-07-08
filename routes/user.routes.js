const router = require("express").Router();


router.get("/", (req, res) => {
    res.render("user/application", { layout: false })
})


module.exports = router;
