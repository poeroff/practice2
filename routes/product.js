const express = require("express");

const router = express.Router();

const productcontroller = require("../controller/product")
const {body} = require("express-validator");

const isAuth = require("../middleware/is-auth")


router.post("/product",[body("title","제목을 6글자 이상적어주세요").isString().isLength({min : 5}).trim(), body("content","내용을 6글자 이상적어주세요").isString().isLength({min : 5}).trim()],isAuth, productcontroller.postcreate)


router.post("/product/:update/:productId",[body("title","제목을 6글자 이상적어주세요").isString().isLength({min : 5}).trim(), 
body("content","내용을 6글자 이상적어주세요").isString().isLength({min : 5}).trim(),
body("condition").isString().custom((value,{req})=>{
    if(value === "FOR_SALE" || value === "SOLD_OUT"){
        return true;
        
    }
    throw new Error("유효하지 않은 상품 상태입니다.")
})
],isAuth ,productcontroller.postupdate)

router.delete("/product/:del/:productId",isAuth,productcontroller.postDelete)

router.get("/search",isAuth , productcontroller.productsearch)

router.get("/:detail",isAuth, productcontroller.getdetail)



module.exports = router;