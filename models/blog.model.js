import { model, Schema } from "mongoose";

const blogSchema=new Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
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


const BlogModel=model("Blogs_Web",blogSchema)

export default BlogModel