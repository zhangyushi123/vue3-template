<template>
    <div ref="formWrapperRef">
        <el-form
            class="sjc-form"
            ref="form"
            :model="formData"
            label-width="120px">
            <div class="w-full flex">
                <div class="flex-1">
                    <el-row>
                        <el-col
                            v-for="(item, index) in formData.form"
                            :key="item.keyName"
                            :span="item.span || 24"
                            :style="item.style">
                            <el-form-item
                                :label="item.label"
                                :prop="`form[${index}].value`"
                                :rules="getFormRules(item.rules, formData.form)"
                                :label-width="item.labelWidth">
                                <el-input
                                    v-if="item.type === FormType.INPUT"
                                    v-model.trim="item.value"
                                    :placeholder="item.placeholder || ''"
                                    :disabled="item.disabled || false"
                                    :readonly="item.readonly || false"
                                    :show-word-limit="item.showWordLimit ?? true"
                                    :maxlength="item.maxlength || 255"
                                    :style="item.style || { width: '100%' }" />

                                <el-input-number
                                    v-if="item.type === FormType.INPUT_NUMBER"
                                    v-model.trim="item.value"
                                    :min="item.min"
                                    :max="item.max"
                                    :placeholder="item.placeholder || ''"
                                    :disabled="item.disabled"
                                    :controls="item.controls || false"
                                    :style="item.style || { width: '100%' }" />
                                <!-- textarea输入框 -->
                                <el-input
                                    size="small"
                                    type="textarea"
                                    v-if="item.type === FormType.TEXTAREA"
                                    :disabled="item.disabled"
                                    :autosize="item.autosize || { minRows: 2 }"
                                    v-model.trim="item.value"
                                    :maxlength="item.maxlength || 255"
                                    show-word-limit
                                    :placeholder="item.placeholder"
                                    :style="item.style || { width: '100%' }"></el-input>
                                <el-select
                                    v-if="item.type === FormType.SELECT"
                                    v-model="item.value"
                                    :style="item.style || { width: '100%' }"
                                    :disabled="item.disabled"
                                    filterable
                                    :multiple="item.multiple"
                                    :borderless="item.borderless || false"
                                    :placeholder="item.placeholder || '请选择'"
                                    @change="() => handleChange(item, formData.form)">
                                    <el-option
                                        v-for="(option, optionIndex) in item.selectOptions"
                                        :key="optionIndex + item.keyName"
                                        :label="option.name"
                                        :value="option.value"
                                        :disabled="option.disabled">
                                        {{ option.name }}
                                    </el-option>
                                </el-select>
                                <el-tree
                                    v-if="item.type === FormType.TREE"
                                    :ref="(el: any) => bindTreeRef(el, item.keyName)"
                                    :data="item.treeData"
                                    :props="item.fieldNames || treeProps"
                                    show-checkbox
                                    highlight-current
                                    default-expand-all
                                    :default-checked-keys="item.value"
                                    node-key="id"
                                    :style="item.style || { width: '100%' }"
                                    @check-change="handleTreeCheckChange(item)">
                                </el-tree>
                                <!-- 日期选择器 -->
                                <el-date-picker
                                    v-if="item.type === FormType.DATA_PICKER"
                                    class="w-full"
                                    :value-format="item.valueFormat || 'YYYY-MM-DD'"
                                    :type="item.datePickerType || 'date'"
                                    :disabled="item.disabled"
                                    :disabled-date="item.disabledDate"
                                    :start-placeholder="item.startPlaceholder || '开始时间'"
                                    :end-placeholder="item.endPlaceholder || '结束时间'"
                                    :range-separator="item.rangeSeparator || '至'"
                                    v-model="item.value"
                                    :placeholder="item.placeholder"
                                    :style="item.style || { width: '100%' }">
                                </el-date-picker>
                                <!-- 时分秒选择器 -->
                                <el-time-picker
                                    v-if="item.type === FormType.TIME_PICKER"
                                    :style="item.style || { width: '100%' }"
                                    :value-format="item.valueFormat || 'HH:mm:ss'"
                                    :type="item.datePickerType || 'date'"
                                    clearable
                                    :is-range="item.isRange"
                                    :disabled="item.disabled"
                                    :start-placeholder="item.startPlaceholder || '开始时间'"
                                    :end-placeholder="item.endPlaceholder || '结束时间'"
                                    :range-separator="item.rangeSeparator || '至'"
                                    v-model="item.value"
                                    :placeholder="item.placeholder || '选择时间范围'">
                                </el-time-picker>
                                <!-- switch开关 -->
                                <el-switch
                                    v-if="item.type === FormType.SWITCH"
                                    :disabled="item.disabled"
                                    v-model="item.value"
                                    :active-value="item.activeValue"
                                    :inactive-value="item.inactiveValue"></el-switch>
                                <!-- radio单选框 -->
                                <el-radio-group
                                    v-if="item.type === FormType.RADIO"
                                    :disabled="item.disabled"
                                    v-model="item.value">
                                    <el-radio
                                        :label="option.value"
                                        v-for="(option, index) in item.radioOptions"
                                        :key="index">
                                        {{ option.label }}
                                    </el-radio>
                                </el-radio-group>
                                <!-- checkbox复选框 -->
                                <el-checkbox-group
                                    v-if="item.type === FormType.CHECKBOX"
                                    :disabled="item.disabled"
                                    v-model="item.value">
                                    <el-checkbox
                                        :label="option.value"
                                        :key="index"
                                        v-for="(option, index) in item.checkboxOptions">
                                        {{ option.label }}
                                    </el-checkbox>
                                </el-checkbox-group>
                                <!-- text展示 -->
                                <Text
                                    size="sm"
                                    color="regular"
                                    v-if="item.type === FormType.TEXT"
                                    >{{ item.value }}</Text>
                                <!-- 计量单位 -->
                                <Text
                                    size="sm"
                                    color="regular"
                                    style="margin-left: .25rem; margin: .2rem;"
                                    v-if="item.type === FormType.UNIT"
                                >{{ item.value }}</Text>
                                <!-- 文件上传 --><!-- 如果对象有值就回显，没有值就为空 -->
                                <el-upload
                                    v-if="item.type === FormType.UPLOAD"
                                    :ref="(el: any) => bindUploadRef(el, item.keyName)"
                                    v-model:file-list="item.value"
                                    :limit="item.uploadObj!.limit"
                                    :class="{
                                        hide: isHiddenUploadBtn(item),
                                        'w-full': true,
                                    }"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="
                                    (file: any, fileList: UploadFiles) =>
                                        handleRemove(
                                            {fileList,item,index}
                                        )
                                "
                                    :on-success="
                                    (response: any, file: any, fileList: UploadFiles) =>
                                        uploadSuccess({fileList,item, index})
                                "
                                    :on-exceed="(files: File[]) => handleExceed({ fileList: files, item })"
                                    :http-request="() => handleUpload({ item, index })"
                                    :show-file-list="item.uploadObj!.showFileList"
                                    :before-upload="(rawFile: UploadRawFile) => beforeUpload(rawFile, item.uploadObj as UploadObj)"
                                    :auto-upload="true"
                                    :list-type="item.uploadObj!.listType">
                                    <el-button
                                        class="el-upload__btn"
                                        style="margin-right: 1rem;"
                                        type="primary"
                                        >点击上传
                                    </el-button>
                                    <template #tip>
                                        <span class="el-upload__tip">{{ item.uploadObj!.tips }}</span>
                                    </template>
                                </el-upload>
                                <slot
                                    name="fileList"
                                    :fileList="item.value"
                                    :limit="item.uploadObj!.limit"
                                    :prop="item.keyName"
                                    :index="index"
                                    v-if="item.type === FormType.UPLOAD"></slot>
                                <el-dialog
                                    v-model="dialogVisible"
                                    v-if="item.type === FormType.UPLOAD"
                                    :modal-append-to-body="true"
                                    append-to-body
                                    width="40%">
                                    <img
                                        class="w-full block"
                                        width="100%"
                                        :src="dialogImageUrl"
                                        alt="" />
                                </el-dialog>
                                <el-image
                                    v-if="item.type === FormType.IMAGE"
                                    :src="item.value"
                                    @error="error"
                                    class="form-image">
                                    <template #error>
                                        <div :class="['image-slot', item.value && 'image-slot--error']">
                                            {{ item.value || item.placeholder || '加载失败' }}
                                        </div>
                                    </template>
                                </el-image>
                                {{ item.fileServer }}
                                <sjc-editor
                                    v-if="item.type === FormType.EDITOR"
                                    :file-server="item.fileServer"
                                    v-model="item.value"></sjc-editor>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>

                <div
                    v-if="props.showBtn"
                    >
                    <el-space size="small">
                        <el-button
                            type="default"
                            @click="onReset"
                            >重置</el-button
                        >
                        <el-button
                            type="primary"
                            :loading="loading"
                            @click="handleSearch"
                            >查询</el-button
                        >
                    </el-space>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script lang="ts">
export default {
    name: 'SjcForm',
};
</script>
<script lang="ts" setup>
import type { Ref } from 'vue';
import SjcEditor from '@/components/editor/SjcEditor.vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { FormInstance, ElTree, UploadRawFile, UploadFiles } from 'element-plus';
import type { DefItem, IFormValues, UploadObj } from './types';
import { useTree, useUpload } from './hooks';
import { FormType } from '@/enums';
import { isFunction, cloneDeep } from 'lodash';

const form = ref<FormInstance>();
const formWrapperRef = ref<HTMLDivElement>();
const { treeProps, handleTreeCheckChange, bindTreeRef } = useTree();
const {
    bindUploadRef,
    isHiddenUploadBtn,
    dialogVisible,
    dialogImageUrl,
    beforeUpload,
    handlePictureCardPreview,
    handleUpload,
    handleRemove,
    uploadSuccess,
    handleExceed,
} = useUpload(form as Ref<FormInstance>);
const props = withDefaults(
    defineProps<{
        def: DefItem[];
        loading?: boolean;
        showBtn?: boolean;
        updateSubmit?: number | string;
        updateReset?: number | string;
        autoFocus?: boolean;
    }>(),
    { def: () => [], loading: false, showBtn: false, updateSubmit: 0, updateReset: 0, autoFocus: true }
);

const emits = defineEmits<{
    (e: 'search', values: IFormValues): void;
    (e: 'change', formItem: DefItem, form?: DefItem[]): void;
}>();

const formData = reactive<{ form: DefItem[] }>({ form: [] });
const initForm = () => {
    formData.form.length = 0;
    const formObj = cloneDeep(props.def);
    formObj.forEach((item) => {
        const tmpItem = reactive<DefItem>({
            ...item,
            value: undefined,
        });

        // if (item.type === FormType.DATA_PICKER && item.datePickerType !== 'date') {
        //     tmpItem.value = null;
        // }

        if ([FormType.UPLOAD].includes(item.type) || (item.type === FormType.SELECT && item.multiple)) {
            tmpItem.value = [];
        }

        if (item.defaultValue || item.defaultValue === 0) {
            tmpItem.value = item.defaultValue;
        }

        formData.form.push(tmpItem);
    });
};

const getFormRules = computed(() => {
    return (rules: any, form: DefItem[]) => {
        if (isFunction(rules)) {
            const values: IFormValues = {};
            formData.form.forEach((formItem) => {
                if (formItem.keyName && !formItem.isIgnoreKey) {
                    values[formItem.keyName] = formItem.value;
                }
            });
            return rules(values) ?? [];
        }
        return rules ?? [];
    };
});

const handleChange = (item: DefItem, form?: DefItem[]) => {
    emits('change', item, form);
};
const error = () => {
};
const handleSearch = async() => {
    if (!form) return;
    await form.value?.validate((valid, fields) => {
        if (valid) {
            const values: IFormValues = {};
            formData.form.forEach((formItem) => {
                if (formItem.keyName && !formItem.isIgnoreKey) {
                    values[formItem.keyName] = formItem.value;
                }
            });
            emits('search', values);
        } else {
            const [[{ message }]] = Object.values(fields ?? {});
            ElMessage({
                message,
                grouping: true,
                type: 'warning',
            });
        }
    });
};

const onReset = () => {
    if (!form) return;
    form.value?.resetFields();
    initForm();
};

const getFocus = (isAuto = true) => {
    if (formWrapperRef.value && isAuto) {
        setTimeout(() => {
            const firstInputDom = formWrapperRef.value?.querySelector('input');
            if (firstInputDom) {
                firstInputDom.focus();
            }
        }, 30);
    }
};

watch(
    () => props.def,
    () => {
        initForm();
    },
    { deep: true }
);

watch(
    () => props.updateSubmit,
    () => {
        handleSearch();
    }
);

watch(
    () => props.updateReset,
    () => {
        onReset();
    }
);

onMounted(() => {
    initForm();
    getFocus(props.autoFocus);
});

defineExpose({
    handleSearch,
    onReset,
    getFocus
});
</script>

<style lang="scss" scoped>
.sjc-form {
    :deep(.el-form-item.is-error) {
        .wangeditor {
            border-color: var(--el-color-danger);
        }
    }
    :deep(.el-date-editor) {
        .el-input__wrapper {
            display: flex;
        }
    }
    :deep(.el-upload-list) {
        margin: 0;
        width: 100%;
        .el-upload-list__item {
            margin: 0;
            height: 52px;
            overflow: hidden;
            .el-upload-list__item-thumbnail {
                width: 50px;
                height: 50px;
            }
            .el-upload-list__item-info {
                overflow: hidden;
                text-overflow: ellipsis;
                transition: color 0.3s;
                white-space: nowrap;
            }
        }
    }
    .hide {
        display: flex;

        .el-upload__btn {
            display: none;
        }

        .el-upload__tip {
            display: none;
        }
    }

    .form-image {
        height: 32px;
        max-width: 100%;
        box-sizing: border-box;
        :deep(.el-image__wrapper) {
            position: relative;
        }
        .image-slot {
            color: $text-color-placeholder;
            font: var(--el-font-size-base);
            &--error {
                color: $color-danger;
            }
        }
    }
}
</style>
