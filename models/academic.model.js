import { model, Schema } from "mongoose"



const academicSchema=new Schema(
    {
        name:{
            type:String
        },
        year:{
            type:Number
        },
        pdf:{
            public_id:{
                type:String
            },
            secure_url:{
                type:String
            }
        }
    },
    {
        timestamps:true
    }
)


const Academic=model("Academic",academicSchema)


export default Academic