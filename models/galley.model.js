import { model, Schema } from "mongoose";



const gallerySchema=new Schema(
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


const Gallery=model("GalleryModel",gallerySchema)


export default Gallery