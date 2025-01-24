import { model, Schema } from "mongoose";


const iqacnoticeSchema=new Schema(
    {
        heading:{
            type:String
        },
        date:{
            type:String
        },
        pdf:{
            public_id:{
                type:String,
                default:""
            },
            secure_url:{
                type:String,
                default:""
            }
        }
    },
    {
        timestamps:true
    }
)


const iqacNoticeModel=model("IqacNotice",iqacnoticeSchema)

export default iqacNoticeModel