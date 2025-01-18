import { model, Schema } from "mongoose";


const IqacMemberSchema=new Schema(
    {
         name:{
            type:String,
         },
          position:{
            type:String
         },
         contactNumber:{
            type:String
         },
         other:{
            type:String
         },
         photo:{
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

const IQACModel=model("IQACModel",IqacMemberSchema)

export default IQACModel