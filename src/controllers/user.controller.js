import {asyncHandler} from "../utils/asyncHandler.js"
import{ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import{uploadOnCloudinary}from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{
                /*
                get the data  from the frontend
                validation that each should not be empty
                check if user is already exist
                check for images and avatar
                uploads them in cloudianry,avatar
                create the user object  -create entry in db
                remove the password and refresh token from repsonse field
                check for user creation 
                return 

                */ 


                const{ fullName,email,username,password} =req.body
                console.log("email : ",email);

                //here i wll console log req .nody 
                // console.log("req.body ",req.body);

                // console.log("\nwhole body is printed");

              //validation
            if( [fullName,email,username,password].some((field)=>
                field?.trim()==="")  ){
                    throw new ApiError(400,"All field are compulsory")
            }

            //check if user exist or not
            const existedUser =await User.findOne({
                $or:[{email},{username}]
            })

            //if user existedUser
            if(existedUser){
                throw new ApiError(409,"User with email or username already Exists")
            }

            //for avatar and images
            const avatarLocalPath = req.files?.avatar[0]?.path;
            const coverImageLocalPath= req.files?.coverImage?.[0]?.path;

            //if not present the avatar
            if(!avatarLocalPath){
                throw new ApiError(400,"Avatar file is required")
            }

         const avatar = await uploadOnCloudinary(avatarLocalPath)
         const coverImage =await uploadOnCloudinary(coverImageLocalPath)

         if(!avatar){
            throw new ApiError(400,"Avatar file is required")
         }

   const user = await User.create(
            {   fullName,
                avatar:avatar.url,
                coverImage:coverImage?.url || "",
                email,
                password,
                username: username.toLowerCase()
            }
         )

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200),createdUser,"User registered successfully"
    )


})


export { registerUser}
