import companyService from "../Services/company.service.js";

class CompanyController {
  async create(req, res, next) {
    try {
      const company = await companyService.createCompany(req.body);

      res.status(201).json({
        success: true,
        company,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBySlug(req, res, next) {
    try {
      const company = await companyService.getCompanyBySlug(req.params.slug);

      res.status(200).json({
        success: true,
        company,
      });
    } catch (error) {
      next(error);
    }
  }

  async search(req, res, next) {
    try {
      const companies = await companyService.searchCompanies(req.query.q);

      res.status(200).json({
        success: true,
        companies,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const companies = await companyService.getAllCompanies();

      res.status(200).json({
        success: true,
        companies,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CompanyController();