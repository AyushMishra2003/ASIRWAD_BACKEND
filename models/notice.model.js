import { model, Schema } from "mongoose";


const noticeSchema=new Schema(
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


const NoticeModel=model("notice",noticeSchema)

export default NoticeModel