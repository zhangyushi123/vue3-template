import { DMS_DOMAIN } from './const';
import { api } from './http';

export type GetRecordListPayload = {
    pageIndex: number
    pageSize: number
    sortField: string
    sortType: string
    searchInput: string,
    menuName: string
}

export interface ListResponse<T = any> {
    total: number,
    data: T[]
}

export interface ReportRecordEntity {
    id: string,
    corpCode: string,
    corpName: string,
    createTime: string,
    inquiry: string
}

export type GetRecordListResponse = ListResponse<ReportRecordEntity>

// 查询征信报告查询记录列表页(辽信通)
export function getRecordList(params: GetRecordListPayload): Promise<GetRecordListResponse>{
    return api.get(`${DMS_DOMAIN}/v1/corp/log/list`, {
        params
    });
}

// 查询征信报告查询记录列表页(市综服)
export function getZfRecordList(params: GetRecordListPayload): Promise<GetRecordListResponse>{
    return api.get(`${DMS_DOMAIN}/v1/zjfw/corp/log/list`, {
        params
    });
}
