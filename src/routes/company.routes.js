import { Router } from "express";
import * as companyCtrl from "../controllers/company.controller";
import { authJwt } from "../middlewares";

const router = Router();
router.get('/category',authJwt.verifyToken, companyCtrl.getCategories);
router.get('/category/:categoryName',authJwt.verifyToken, companyCtrl.getCompaniesByName);
router.get('/', authJwt.verifyToken, companyCtrl.getCompanies);
router.get('/:companyId',authJwt.verifyToken, companyCtrl.getCompanyById);
router.put('/:companyId', [authJwt.verifyToken, authJwt.isAdmin], companyCtrl.updateCompanyById);
router.post('/',  [authJwt.verifyToken, authJwt.isAdmin],companyCtrl.createCompany);
router.delete('/:companyId', [authJwt.verifyToken, authJwt.isAdmin], companyCtrl.deleteCompanyById);

export default router;
