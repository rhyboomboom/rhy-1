import classify from '../../views/classify/classify';
import productlist from "../../views/classify/productlist"
import phone from "../../views/classify/phone"
import clothing from "../../views/classify/clothing"
import everyday from "../../views/classify/everyday"
import particulars from "../../views/classify/particulars"
import getquery from "../../views/classify/query"
import cart from "../../views/classify/cart"
import settle from "../../views/settle/settle"
import site from "../../views/settle/site"
import amend from "../../views/settle/amend"
import pay from "../../views/settle/pay"
var classifys=[{path:"/classify",component:classify,redirect:"/classify/phone",
children:[
    {path:"productlist",component:productlist},
    {path:"phone",component:phone},
    {path:"clothing",component:clothing},
    {path:"everyday",component:everyday},
]
},
{path:"/list/:id?",component:productlist},
{path:"/particulars/:id?",component:particulars},
{path:"/getquery/:id?",component:getquery},
{path:"/cart",component:cart},
{path:"/settle",component:settle},
{path:"/site",component:site},
{path:"/amend/:id?",component:amend},
{path:"/pay",component:pay}
]

export default classifys