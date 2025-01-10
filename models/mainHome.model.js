import { model, Schema } from "mongoose";


const mainHomeSchema=new Schema(
    {
        name:{
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



const MainHomeModel=model("MainHomeModel",mainHomeSchema)

export default MainHomeModel