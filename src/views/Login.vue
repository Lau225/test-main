<template>
    <div class="login-container">
        <!-- 背景遮罩层 -->
        <div class="background-overlay"></div>

        <!-- 登录表单区域 -->
        <div class="login-form-section">
            <div class="form-wrapper">
                <div class="form-header">
                    <h1 class="welcome-title">珠三角运管委协同运行智慧平台</h1>
                    <p class="welcome-subtitle">ZSJ Collaborative Operation Smart Platform</p>
                </div>
                <div class="form-content">
                    <h2>用户登录</h2>
                    <p>请输入您的账户信息</p>
                    <DxForm ref="formRef" :form-data="formData" :col-count="1" label-mode="outside"
                        @field-data-changed="handleFieldChange">
                        <DxSimpleItem data-field="username" editor-type="dxTextBox"
                            :editor-options="{ placeholder: '请输入用户名' }">
                            <DxLabel text="用户名" />
                            <DxStringLengthRule :min="2" :max="20" message="用户名长度必须在1-20个字符之间" />
                        </DxSimpleItem>

                        <DxSimpleItem data-field="password" editor-type="dxTextBox" :editor-options="{
                            placeholder: '请输入密码',
                            mode: 'password'
                        }">
                            <DxLabel text="密码" />
                            <DxStringLengthRule :min="6" :max="20" message="密码长度必须在6-20个字符之间" />
                        </DxSimpleItem>
                    </DxForm>
                    <DxButton style="width: 100%;margin-top: 10px;" text="登录" type="default" @click="handleLogin" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
    DxForm,
    DxSimpleItem,
    DxStringLengthRule,
    DxLabel
} from 'devextreme-vue/form';
import DxButton from 'devextreme-vue/button'
import notify from 'devextreme/ui/notify'
import request from '@/utils/request';
const router = useRouter()
const route = useRoute()
const formRef = ref(null)
const isFormDirty = ref(false);
const formValidationResult = ref(null);
// 表单数据
const formData = reactive({
    username: '',
    password: ''
})
// 表单实例
const formInstance = computed(() => {
    return formRef.value?.instance;
});
const validateForm = () => {
    if (!formInstance.value) return;

    formValidationResult.value = formInstance.value.validate();

    return formValidationResult.value.isValid;
};
// 方法
const handleFieldChange = (e) => {
    isFormDirty.value = true;

    // 实时验证
    validateForm();
};
// 监听表单数据变化
watch(formData, () => {
    if (isFormDirty.value) {
        validateForm();
    }
}, { deep: true });
const handleLogin = () => {
    if (!validateForm()) {
        return notify(
            {
                message: "验证失败",
                height: 45,
                width: 50,
                minWidth: 100,
                position: {
                    at: "top",
                    my: "top",
                    of: "#container"
                }
            },
            'error',
            100
        );

    }
    request.get('/permission').then(res => {
        notify(
            {
                message: "登陆成功",
                height: 45,
                width: 50,
                minWidth: 100,
                position: {
                    at: "top",
                    my: "top",
                    of: "#container"
                }
            },
            'success',
            100
        );
        // 登陆成功后设置token以及路由信息
        localStorage.setItem('token', '123123123')
        localStorage.setItem('permission', JSON.stringify(res.permission))

        // 获取重定向路径，如果没有则默认跳转到 /home
        const redirectPath = route.query.redirect || '/'

        // ⚠️ 重要：使用页面刷新来确保所有子应用都能重新读取权限数据
        // 这样可以避免子应用初始化时序问题
        window.location.href = redirectPath
    })
}

</script>
<style scoped>
.login-container {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('@/assets/picture/1.gif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

/* 背景遮罩层 */
.background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(19, 49, 182, 0.3) 0%, rgba(21, 54, 204, 0.2) 100%);
    z-index: 1;
}

/* 登录表单区域 */
.login-form-section {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 500px;
    padding: 2rem;
}

.form-wrapper {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.form-header {
    text-align: center;
    margin-bottom: 2rem;
}

.welcome-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1336b6;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.welcome-subtitle {
    font-size: 0.9rem;
    font-weight: 400;
    color: #666;
    margin-bottom: 2rem;
}

.form-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #344154;
    margin-bottom: 0.5rem;
    text-align: center;
}

.form-content p {
    color: #666;
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 1.5rem;
}

:deep(.dx-field-item-label-location-top) {
    padding: 0 !important;
}

/* DevExtreme 表单样式覆盖 */
:deep(.dx-form) {
    background: transparent;
}

:deep(.dx-field-item-label) {
    font-weight: 500;
    color: #333;
}

:deep(.dx-textbox) {
    border-radius: 8px;
    border: 1px solid #e1e5e9;
    height: 45px;
}

:deep(.dx-textbox:focus-within) {
    border-color: #1336b6;
    box-shadow: 0 0 0 3px rgba(19, 49, 182, 0.1);
}

:deep(.dx-textbox .dx-texteditor-input) {
    padding: 0 12px;
    font-size: 14px;
}

:deep(.dx-button) {
    background: #1336b6;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    font-size: 16px;
    transition: all 0.3s ease;
}

:deep(.dx-button:hover) {
    background: #0f2a9a;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(19, 49, 182, 0.3);
}

:deep(.dx-button:active) {
    transform: translateY(0);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .login-form-section {
        padding: 1rem;
    }

    .form-wrapper {
        padding: 2rem;
    }

    .welcome-title {
        font-size: 1.4rem;
    }

    .welcome-subtitle {
        font-size: 0.8rem;
    }

    .form-content h2 {
        font-size: 1.3rem;
    }
}

@media (max-width: 480px) {
    .form-wrapper {
        padding: 1.5rem;
    }

    .welcome-title {
        font-size: 1.2rem;
    }

    .form-content h2 {
        font-size: 1.2rem;
    }
}
</style>