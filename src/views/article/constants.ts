/*
 * @Description:
 * @FilePath: \dms-web\src\views\article\constants.ts
 * @Author: zys
 * @Date: 2022-11-14 11:26:22
 * @LastEditTime: 2023-02-14 16:01:09
 * @LastEditors: zys
 * @Reference:
 */
import {
    FormType,
    ARTICLE_STATUS,
    ARTICLE_STATUS_LABEL,
    ARTICLE_STATUS_TAG,
    SORT_TYPE,
    ARTICLE_MODULE,
    ARTICLE_TYPE_LABEL,
    FILE_TYPE,
    FILE_SERVER,
    ELEMENT_TAG_TYPE,
} from '@/enums';
import type { DefItem } from '@/components/SjcForm/types';

export const TAB_LIST = [
    {
        title: ARTICLE_STATUS_LABEL.ALL,
        value: ARTICLE_STATUS.ALL,
        icon: 'ep:house',
        queryParams: {
            status: ARTICLE_STATUS.ALL,
        },
        filterOption: [
            {
                name: ARTICLE_STATUS_LABEL.ALL,
                value: ARTICLE_STATUS.ALL,
            },
            {
                name: ARTICLE_STATUS_LABEL.PUBLISHED,
                value: ARTICLE_STATUS.PUBLISHED,
            },
            {
                name: ARTICLE_STATUS_LABEL.OFFLINE,
                value: ARTICLE_STATUS.OFFLINE,
            },
            {
                name: ARTICLE_STATUS_LABEL.MY_PUBLISHED,
                value: ARTICLE_STATUS.MY_PUBLISHED,
            },
        ],
    },
    {
        title: ARTICLE_STATUS_LABEL.PUBLISHED,
        value: ARTICLE_STATUS.PUBLISHED,
        icon: 'ep:finished',
        queryParams: {
            status: ARTICLE_STATUS.PUBLISHED,
        },
        filterOption: [
            {
                name: ARTICLE_STATUS_LABEL.ALL,
                value: ARTICLE_STATUS.PUBLISHED,
            },
            {
                name: ARTICLE_STATUS_LABEL.MY_PUBLISHED,
                value: ARTICLE_STATUS.MY_PUBLISHED,
            },
        ],
    },
    {
        title: ARTICLE_STATUS_LABEL.OFFLINE,
        value: ARTICLE_STATUS.OFFLINE,
        icon: 'ep:sold-out',
        queryParams: {
            status: ARTICLE_STATUS.OFFLINE,
        },
        filterOption: [
            {
                name: ARTICLE_STATUS_LABEL.ALL,
                value: ARTICLE_STATUS.OFFLINE,
            },
            {
                name: ARTICLE_STATUS_LABEL.MY_OFFLINE,
                value: ARTICLE_STATUS.MY_OFFLINE,
            },
        ],
    },
    {
        title: ARTICLE_STATUS_LABEL.DRAFT,
        value: ARTICLE_STATUS.DRAFT,
        icon: 'ep:box',
        queryParams: {
            status: ARTICLE_STATUS.DRAFT,
        },
        filterOption: [
            {
                name: ARTICLE_STATUS_LABEL.ALL,
                value: ARTICLE_STATUS.DRAFT,
            },
            {
                name: ARTICLE_STATUS_LABEL.MY_DRAFT,
                value: ARTICLE_STATUS.MY_DRAFT,
            },
        ],
    },
];

export const ARTICLE_TYPE = Object.freeze({
    [ARTICLE_MODULE.NEWS_LXT]: ARTICLE_TYPE_LABEL.NEWS,
    [ARTICLE_MODULE.NEWS_ZJFW]: ARTICLE_TYPE_LABEL.NEWS,
    [ARTICLE_MODULE.POLICY_LXT]: ARTICLE_TYPE_LABEL.POLICY,
    [ARTICLE_MODULE.POLICY_ZJFW]: ARTICLE_TYPE_LABEL.POLICY,
});

export const ARTICLE_STATUS_TAG_MAP = {
    [ARTICLE_STATUS.PUBLISHED]: {
        status: ELEMENT_TAG_TYPE.SUCCESS,
        label: ARTICLE_STATUS_TAG.PUBLISHED,
    },
    [ARTICLE_STATUS.OFFLINE]: {
        status: ELEMENT_TAG_TYPE.INFO,
        label: ARTICLE_STATUS_TAG.OFFLINE,
    },
    [ARTICLE_STATUS.DRAFT]: {
        status: ELEMENT_TAG_TYPE.WARNING,
        label: ARTICLE_STATUS_TAG.DRAFT,
    },
};
export const ARTICLE_STATUS_SELECT_OPTIONS = [
    {
        name: ARTICLE_STATUS_LABEL.ALL,
        value: ARTICLE_STATUS.ALL,
    },
    {
        name: ARTICLE_STATUS_LABEL.PUBLISHED,
        value: ARTICLE_STATUS.PUBLISHED,
    },
    {
        name: ARTICLE_STATUS_LABEL.OFFLINE,
        value: ARTICLE_STATUS.OFFLINE,
    },
    {
        name: ARTICLE_STATUS_LABEL.MY_PUBLISHED,
        value: ARTICLE_STATUS.MY_PUBLISHED,
    },
];

export const INIT_ARTICLE_SORT_LIST = [
    {
        sortType: SORT_TYPE.NONE,
        sortField: 'sort',
        label: ' 文章序号',
    },
    {
        sortType: SORT_TYPE.NONE,
        sortField: 'updateTime',
        label: ' 更新时间',
    },
    {
        sortType: SORT_TYPE.NONE,
        sortField: 'publishDate',
        label: ' 发布日期',
    },
];

export const ARTICLE_SORT_CONFIG = [
    {
        field: 'sort',
        label: ' 文章序号',
    },
    {
        field: 'updateTime',
        label: ' 更新时间',
    },
    {
        field: 'publishDate',
        label: ' 发布日期',
    },
];
// 表格列配置
export const TABLE_COLUMNS = [
    // 自定义索引
    {
        label: '缩略图',
        prop: 'thumbnail',
        slotName: 'thumbnail',
        width: 100,
    },
];

const NEW_FORM: DefItem[] = [
    {
        type: FormType.INPUT,
        label: '一级标题', // 字段
        keyName: 'title', // 字段名
        placeholder: '请填写一级标题', // 提示内容
        span: 8, // 参考el-col
        disabled: false, // 是否禁用
        rules: [
            {
                required: true,
                message: '一级标题不能为空',
                trigger: ['blur', 'change'],
            },
            {
                max: 255,
                message: '一级标题不能超过255个字符',
                trigger: ['blur', 'change'],
            },
        ], // 验证
    },
    {
        type: FormType.INPUT,
        label: '二级标题', // 字段
        keyName: 'subTitle', // 字段名
        placeholder: '请填写二级标题', // 提示内容
        span: 8, // 参考el-col
        disabled: false, // 是否禁用
        rules: [
            {
                max: 255,
                message: '二级标题不能超过255个字符',
                trigger: ['blur', 'change'],
            },
        ], // 验证
    },
    {
        type: FormType.UPLOAD,
        label: '新闻缩略图',
        keyName: 'thumbnail',
        disabled: false,
        span: 8, // 参考el-col
        uploadObj: {
            fileType: FILE_TYPE.IMAGE,
            limit: 1, // 上传长度限制
            hideUpload: false, // 是否隐藏上传框
            listType: 'picture',
            showFileList: true,
            tips: '只能上传jpg/jpeg/png文件，且不超过2MB',
        },
        rules: [
            {
                required: true,
                message: '新闻缩略图不能为空',
            },
        ],
    },
    {
        type: FormType.INPUT,
        label: '信息来源', // 字段
        keyName: 'origin', // 字段名
        placeholder: '请填写信息来源', // 提示内容
        span: 8, // 参考el-col
        disabled: false, // 是否禁用
        rules: [
            {
                required: true,
                message: '信息来源不能为空',
                trigger: ['blur', 'change'],
            },
            {
                max: 255,
                message: '信息来源不能超过255个字符',
                trigger: ['blur', 'change'],
            },
        ], // 验证
    },
    {
        type: FormType.DATA_PICKER,
        label: '发布日期',
        valueFormat: 'YYYY-MM-DD',
        keyName: 'publishDate',
        placeholder: '请选择',
        span: 8, // 参考el-col
        disabled: false,
        disabledDate(time: any) {
            return time.getTime() > Date.now();
        },
        rules: [
            {
                required: true,
                message: '发布日期不能为空',
                trigger: 'blur',
            },
        ],
    },
    {
        type: FormType.RADIO,
        label: '热点新闻',
        keyName: 'hotNews',
        placeholder: '请选择',
        span: 8, // 参考el-col
        disabled: false,
        radioOptions: [
            { label: '是', value: 1 },
            { label: '否', value: 0 },
        ],
        rules: [
            {
                required: true,
                message: '热点新闻不能为空',
                trigger: ['blur', 'change'],
            },
        ],
    },
    {
        type: FormType.TEXTAREA,
        label: '摘要', // 字段
        keyName: 'summary', // 字段名
        placeholder: '请填写摘要', // 提示内容
        span: 8, // 参考el-col
        disabled: false, // 是否禁用
        rules: [
            {
                required: true,
                message: '摘要不能为空',
                trigger: ['blur', 'change'],
            },
            {
                max: 255,
                message: '摘要不能超过255个字符',
                trigger: ['blur', 'change'],
            },
        ], // 验证
    },
];

const POLICE_FORM: DefItem[] = [
    {
        type: FormType.INPUT,
        label: '一级标题', // 字段
        keyName: 'title', // 字段名
        placeholder: '请填写一级标题', // 提示内容
        span: 8, // 参考el-col
        disabled: false, // 是否禁用
        rules: [
            {
                required: true,
                message: '一级标题不能为空',
                trigger: ['blur', 'change'],
            },
            {
                max: 255,
                message: '一级标题不能超过255个字符',
                trigger: ['blur', 'change'],
            },
        ], // 验证
    },
    {
        type: FormType.INPUT,
        label: '二级标题', // 字段
        keyName: 'subTitle', // 字段名
        placeholder: '请填写二级标题', // 提示内容
        span: 8, // 参考el-col
        disabled: false, // 是否禁用
        rules: [
            {
                max: 255,
                message: '二级标题不能超过255个字符',
                trigger: ['blur', 'change'],
            },
        ], // 验证
    },
    {
        type: FormType.INPUT,
        label: '信息来源', // 字段
        keyName: 'origin', // 字段名
        placeholder: '请填写信息来源', // 提示内容
        span: 8, // 参考el-col
        disabled: false, // 是否禁用
        rules: [
            {
                required: true,
                message: '信息来源不能为空',
                trigger: ['blur', 'change'],
            },
            {
                max: 255,
                message: '信息来源不能超过255个字符',
                trigger: ['blur', 'change'],
            },
        ], // 验证
    },
    {
        type: FormType.DATA_PICKER,
        label: '发布日期',
        keyName: 'publishDate',
        placeholder: '请选择',
        span: 8, // 参考el-col
        disabled: false,
        disabledDate(time) {
            return time.getTime() > Date.now();
        },
        rules: [
            {
                required: true,
                message: '发布日期不能为空',
                trigger: 'blur',
            },
        ],
    },
    {
        type: FormType.TEXTAREA,
        label: '摘要', // 字段
        keyName: 'summary', // 字段名
        placeholder: '请填写摘要', // 提示内容
        span: 8, // 参考el-col
        disabled: false, // 是否禁用
        rules: [
            {
                required: true,
                message: '摘要不能为空',
                trigger: ['blur', 'change'],
            },
            {
                max: 255,
                message: '摘要不能超过255个字符',
                trigger: ['blur', 'change'],
            },
        ], // 验证
    },
];

// 新建表单
export const ARTICLE_FORM_MAP: { [key in ARTICLE_MODULE]: DefItem[] } = {
    [ARTICLE_MODULE.NEWS_LXT]: [
        ...NEW_FORM,
        {
            type: FormType.EDITOR,
            fileServer: FILE_SERVER.LXT, // 辽信通
            label: '文章内容',
            keyName: 'content',
            disabled: false,
            rules: [
                {
                    required: true,
                    message: '文章内容不能为空',
                    trigger: ['blur', 'change'],
                },
            ],
        },
    ],
    [ARTICLE_MODULE.NEWS_ZJFW]: [
        ...NEW_FORM,
        {
            type: FormType.EDITOR,
            fileServer: FILE_SERVER.ZJFW, // 市综服
            label: '文章内容',
            keyName: 'content',
            disabled: false,
            rules: [
                {
                    required: true,
                    message: '文章内容不能为空',
                    trigger: ['blur', 'change'],
                },
            ],
        },
    ],
    [ARTICLE_MODULE.POLICY_LXT]: [
        ...POLICE_FORM,
        {
            type: FormType.EDITOR,
            fileServer: FILE_SERVER.LXT, // 辽信通
            label: '文章内容',
            keyName: 'content',
            disabled: false,
            rules: [
                {
                    required: true,
                    message: '文章内容不能为空',
                    trigger: ['blur', 'change'],
                },
            ],
        },
    ],
    [ARTICLE_MODULE.POLICY_ZJFW]: [
        ...POLICE_FORM,
        {
            type: FormType.EDITOR,
            fileServer: FILE_SERVER.ZJFW, // 市综服
            label: '文章内容',
            keyName: 'content',
            disabled: false,
            rules: [
                {
                    required: true,
                    message: '文章内容不能为空',
                    trigger: ['blur', 'change'],
                },
            ],
        },
    ],
};
