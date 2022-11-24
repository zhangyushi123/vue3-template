import { DMS_DOMAIN } from './const';
import { api } from './http';

export type GetFirstPageDataResponse = {
    financeResolve: number,
    financeSuccess: number,
    financialProduct: number,
    registerEnterprise: number
};

export type UpdateHomePageStaticPayload = GetFirstPageDataResponse;

export type GetZfFirstPageDataResponse = {
    registerEnterprise: number,
    financialProduct: number,
    releaseRequirement: number,
    registerOrg: number,
    financeResolve: number,
    propertyFinanceResolve: number
}

export type UpdateZfHomePageStaticPayload = GetZfFirstPageDataResponse;

// 获取首页静态数据 (辽信通)
export function getFirstPageData(): Promise<GetFirstPageDataResponse>{
    return api.get(`${DMS_DOMAIN}/v1/home/page/statistics`);
}

// 修改首页静态数据 (辽信通)
export function updateHomePageStatic(data: UpdateHomePageStaticPayload) {
    return api.post(`${DMS_DOMAIN}/v1/update/home/page/statistics`, data);
}

// 获取首页静态数据 (市综服)
export function getZfFirstPageData(): Promise<GetZfFirstPageDataResponse>{
    return api.get(`${DMS_DOMAIN}/v1/zjfw/home/page/statistics`);
}

// 修改首页静态数据 (市综服)
export function updateZfHomePageStatic(data: UpdateZfHomePageStaticPayload) {
    return api.post(`${DMS_DOMAIN}/v1/zjfw/update/home/page/statistics`, data);
}
