import Company from "../Models/CompanyModel.js";

class CompanyRepository {
  // 👉 Create company manually
  async create(data) {
    return await Company.create(data);
  }

  async findById(id) {
    return await Company.findById(id);
  }

  async findByName(name) {
    return await Company.findOne({ name });
  }

  async findBySlug(slug) {
    return await Company.findOne({ slug });
  }

  // 🔥 MAIN FEATURE: Find or Create Company
  async findOrCreateByName(name) {
    const slug = this.generateSlug(name);

    let company = await Company.findOne({ slug });

    if (!company) {
      company = await Company.create({
        name,
        slug,
        totalPosts: 0,
      });
    }

    return company;
  }

  // 🧠 Centralized slug generator (IMPORTANT)
  generateSlug(name) {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  // 🔍 Search companies
  async search(query) {
    return await Company.find({
      name: { $regex: query, $options: "i" },
    }).limit(20);
  }

  // 📈 Increment posts
  async incrementPosts(companyId) {
    return await Company.findByIdAndUpdate(
      companyId,
      { $inc: { totalPosts: 1 } },
      { new: true }
    );
  }

  // 📉 Decrement posts
  async decrementPosts(companyId) {
    return await Company.findByIdAndUpdate(
      companyId,
      { $inc: { totalPosts: -1 } },
      { new: true }
    );
  }

  // 📊 Get all companies
  async getAll() {
    return await Company.find().sort({ createdAt: -1 });
  }
}

export default new CompanyRepository();