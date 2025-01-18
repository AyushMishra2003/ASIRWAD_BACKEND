import { model, Schema } from "mongoose";

const iqacObjectiveSchema=new Schema(
    {
         objective:{
            type:String
         }
    },
    {
        timestamps:true
    }
)

const IqacObjectiveModel=model("IqacObjectiveModel",iqacObjectiveSchema)

export default IqacObjectiveModel