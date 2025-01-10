import { model, Schema } from "mongoose";


const libaraySchema=new Schema(
    {
        name:{
            type:String
        },
        writerName:{
            type:String
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


const Library=model("LibraryModel",libaraySchema)

export default Library