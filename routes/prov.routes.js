const router = require("express").Router();


router.get("/", (req, res) => {
    res.render("prov/index", { layout: false })
})


module.exports = router;
