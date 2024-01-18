const { text } = require('express');
const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema; 

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First Name Is Required"],
        trim: true,
        text: true,
    },
    last_name: {
        type: String,
        required: [true, "First Name Is Required"],
        trim: true,
        text: true,
    },
    username: {
        type: String,
        required: [true, "User Name Is Required"],
        trim: true,
        text: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email Is Required"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password Is Required"],
    },
    picture: {
        type: String,
        trim: true,
        default: "https://res.cloudinary.com/db5uzcggy/image/upload/v1705481217/defaultUser_jcenr5.png",
    },
    cover: {
        type: String,
        trim: true,
    },
    bYear: {
        type: Number,
        required: true,
        trim: true,
    },
    bMonth: {
        type: Number,
        required: true,
        trim: true,
    },
    bDay: {
        type: Number,
        required: true,
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    friends: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    followers: {
        type: Array,
        default: [],
    },
    request: {
        type: Array,
        default: [],
    },
    search: [
        {
            user:{
                type: ObjectId,
                ref: 'user'
            }
        }
    ],
    details: {

            bio: {
                type: String,
            },
            otherName: {
                type: String,
            },
            job: {
                type: String,
            },
            works: {
                type: String,
            },
            highSchools: {
                type: String,
            },
            college: {
                type: String,
            },
            currentCity: {
                type: String,
            },
            homeTown: {
                type: String,
            },
            relationship: {
                type: String,
                enum: ["Single", "In a relationship", "Married", "Divorced"]
            },
            instagram: {
                type: String,
            },
        },
        
    savePosts: [
        {
            post: {
                type: ObjectId,
                ref: "Post",
            },
            savedAt: {
                type: Date,
                default: new Date(),

            }
        }
    ]
    
}, {
    timestamps: true,
});

module.exports = mongoose.mongoose.model("User", userSchema)
