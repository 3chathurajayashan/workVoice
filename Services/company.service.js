import companyRepository from "../repositories/company.repository.js";
import ApiError from "../utils/ApiError.js";

class CompanyService {
  async createCompany(data) {
    const existing = await companyRepository.findByName(data.name);

    if (existing) {
      throw new ApiError(400, "Company already exists");
    }

    return await companyRepository.create(data);
  }

  async getCompanyBySlug(slug) {
    const company = await companyRepository.findBySlug(slug);

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    return company;
  }

  async searchCompanies(query) {
    return await companyRepository.search(query);
  }

  async getAllCompanies() {
    return await companyRepository.getAll();
  }
}

export default new CompanyService();