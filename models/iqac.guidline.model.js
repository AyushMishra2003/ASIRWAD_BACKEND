import { model, Schema } from "mongoose";

const iqacGuidlineSchema=new Schema(
    {
         guidline:{
            type:String
         }
    },
    {
        timestamps:true
    }
)


const IqacGuidlineModel=model("IQAC_GUIDLINE",iqacGuidlineSchema)

export default IqacGuidlineModel