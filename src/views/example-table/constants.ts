import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import type { DefItem } from '@/components/SjcForm/types';
import type { IColumnTypes, IColumnKeys } from './types';
import { STATUS_LABEL_MAP, STATUS, FILE_TYPE } from '@/enums';

// 表格列配置
export const COLUMNS = readonly([
    // 自定义索引
    {
        label: '排名',
        prop: 'ranking',
        type: 'index',
        width: 80,
        index: (index: number) => {
            return index * 3;
        },
    },
    {
        prop: 'name',
        label: '名字',
        filters: [
            { text: '李白2', value: '李白2' },
            { text: '李白4', value: '李白4' },
        ],
        filterMethod: (value: string, row: IColumnTypes, column: TableColumnCtx<IColumnTypes>) => {
            const { property } = column;
            return row[property as IColumnKeys] === value;
        },
        slotName: 'name',
    },
    {
        prop: 'address',
        label: '地址',
        children: [
            {
                label: '省份',
                prop: 'province',
                align: 'center',
            },
            {
                label: '城市',
                prop: 'city',
                align: 'center',
                children: [
                    {
                        label: '区',
                        prop: 'area',
                        align: 'center',
                    },
                    {
                        label: '县',
                        prop: 'county',
                        align: 'center',
                    },
                ],
            },
        ],
    },
    {
        prop: 'amount',
        label: '金额',
        sortable: true,
    },
]);

export const SEARCH_FORM: DefItem[] = [
    {
        type: 'select',
        keyName: 'status',
        placeholder: '请选择',
        label: '启用状态',
        selectOptions: [
            {
                title: STATUS_LABEL_MAP[STATUS.ABLED],
                value: STATUS.ABLED,
            },
            {
                title: STATUS_LABEL_MAP[STATUS.DISABLED],
                value: STATUS.DISABLED,
            },
        ],
    },
    {
        type: 'input',
        keyName: 'loginName',
        placeholder: '请输入',
        label: '登录名',
    },
    {
        type: 'input',
        keyName: 'name',
        placeholder: '请输入',
        label: '真实姓名',
    },
    {
        type: 'input',
        keyName: 'phone',
        placeholder: '请输入',
        label: '手机号码',
    },
];

export const INIT_ROLE_FORM: DefItem[] = [
    {
        type: 'select',
        keyName: 'status',
        placeholder: '请选择',
        label: '启用状态',
        selectOptions: [
            {
                title: STATUS_LABEL_MAP[STATUS.ABLED],
                value: STATUS.ABLED,
            },
            {
                title: STATUS_LABEL_MAP[STATUS.DISABLED],
                value: STATUS.DISABLED,
            },
        ],
    },
    {
        type: 'input',
        keyName: 'loginName',
        placeholder: '请输入',
        label: '登录名',
        rules: [
            {
                required: true,
                message: '登录名必填',
                trigger: 'blur',
            },
        ],
    },
    {
        type: 'input',
        keyName: 'name',
        placeholder: '请输入',
        label: '真实姓名',
        rules: [
            {
                required: true,
                message: '真实姓名必填',
                trigger: 'blur',
            },
        ],
    },
    {
        type: 'input',
        keyName: 'phone',
        placeholder: '请输入',
        label: '手机号码',
    },
    {
        type: 'tree',
        keyName: 'menu',
        placeholder: '',
        label: '菜单配置',
        defaultValue: ['123432334231'],
        treeData: [
            {
                id: '13232323211',
                label: '1',
                children: [{ id: '123432334231', label: '2' }],
            },
            { id: '1256522311', label: '2', children: [{ id: '9899323211', label: '3' }] },
        ],
    },
    {
        type: 'upload',
        keyName: 'haha',
        placeholder: '',
        label: '图片上传',
        uploadObj: {
            limit: 1,
            hideUpload: false,
            tips: 'aaaaa',
            listType: 'picture',
            fileType: FILE_TYPE.IMAGE,
        },
        rules: [
            {
                required: true,
                message: '图片上传必填',
                trigger: ['blur', 'change'],
            },
        ],
    },
];
