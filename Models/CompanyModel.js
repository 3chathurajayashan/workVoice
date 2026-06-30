import mongoose from "mongoose";
import slugify from "slugify";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    logo: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    industry: {
      type: String,
      default: "",
    },

    headquarters: {
      type: String,
      default: "",
    },

    verified: {
      type: Boolean,
      default: false,
    },

    totalPosts: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "HIDDEN"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

companySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  next();
});

companySchema.index({ name: "text" });
companySchema.index({ slug: 1 });

const Company = mongoose.model("Company", companySchema);

export default Company;