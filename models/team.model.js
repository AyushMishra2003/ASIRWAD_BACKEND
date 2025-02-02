import { model, Schema } from "mongoose"


const teamSchema=new Schema(
    {
          name:{
            type:String,
            required:true
          },
          destination:{
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
          },
          position:{
            type:String,
            enum:["adminstrative","faculty","teacher"]
          },
          contactNumber:{
            type:String,
          },
          emailId:{
            type:String
          }
    },
    {
        timestamps:true
    }
)


const TeamModel=model("teamCollege",teamSchema)

export default TeamModel