import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
 sharesCount: {
  type: Number,
  default: 0,
},

viewsCount: {
  type: Number,
  default: 0,
},
   company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
},

    mentionedPeople: [
      {
        type: String,
        trim: true,
      },
    ],

   images: [
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
],
status: {
    type: String,
    enum: ["ACTIVE", "HIDDEN", "DELETED"],
    default: "ACTIVE"
},

    isAnonymous: {
      type: Boolean,
      default: false,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    savedCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true,
     versionKey: false,
   }
);
postSchema.index({
    description: "text",
});
postSchema.index({ author: 1 });
postSchema.index({ company: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ status: 1 });

const Post = mongoose.model("Post", postSchema);

export default Post;