<template>
    <template v-if="inIframe">
        <div :id="sectionId"><slot /></div>
    </template>
    <section v-else :id="sectionId" class="code-box">
        <section class="code-box-demo">
            <template v-if="iframeDemo[iframeDemoKey]">
                <div class="browser-mockup with-url">
                    <iframe
                        :src="iframeDemo[iframeDemoKey]"
                        :height="iframeHeight"
                    />
                </div>
            </template>
            <template v-else>
                <slot />
            </template>
        </section>
        <section class="code-box-meta markdown">
            <div class="code-box-title">
                <a :href="`#${sectionId}`">{{ title }}</a>
            </div>
            <div class="code-box-description" v-html="docHtml"></div>
            <div class="code-box-actions">
                <!--        <a-tooltip :title="$t('app.demo.codesandbox')">-->
                <!--          <CodeSandboxOutlined-->
                <!--            class="code-box-code-copy code-box-code-action"-->
                <!--            @click="handleCodeSandbox"-->
                <!--          />-->
                <!--        </a-tooltip>-->
                <a-tooltip
                    :title="$t(`app.demo.type.${type === 'JS' ? 'js' : 'ts'}`)"
                >
                    <span
                        class="code-expand-icon code-box-code-action"
                        style="width: auto"
                        @click="handleChangeType"
                    >
                        {{ type }}
                    </span>
                </a-tooltip>
                <a-tooltip
                    v-if="!blocked"
                    :title="$t(`app.demo.${copied ? 'copied' : 'copy'}`)"
                    :visible="copyTooltipVisible"
                    @visibleChange="onCopyTooltipVisibleChange"
                >
                    <component
                        :is="
                            copied && copyTooltipVisible
                                ? 'CheckOutlined'
                                : 'SnippetsOutlined'
                        "
                        key="copy"
                        v-clipboard:copy="
                            type === 'TS' ? sourceCode : jsSourceCode
                        "
                        v-clipboard:success="handleCodeCopied"
                        class="code-box-code-copy code-box-code-action"
                    />
                </a-tooltip>
                <a-tooltip v-else :title="$t('app.demo.copy')">
                    <SnippetsOutlined
                        class="code-box-code-copy code-box-code-action"
                        @click="warning"
                    />
                </a-tooltip>
                <a-tooltip
                    :title="$t(`app.demo.code.${codeExpand ? 'hide' : 'show'}`)"
                >
                    <span class="code-expand-icon code-box-code-action">
                        <img
                            alt="expand code"
                            :src="
                                theme === 'dark'
                                    ? 'https://gw.alipayobjects.com/zos/antfincdn/btT3qDZn1U/wSAkBuJFbdxsosKKpqyq.svg'
                                    : 'https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg'
                            "
                            :class="
                                codeExpand
                                    ? 'code-expand-icon-hide'
                                    : 'code-expand-icon-show'
                            "
                            @click="handleCodeExpand"
                        />
                        <img
                            alt="expand code"
                            :src="
                                theme === 'dark'
                                    ? 'https://gw.alipayobjects.com/zos/antfincdn/CjZPwcKUG3/OpROPHYqWmrMDBFMZtKF.svg'
                                    : 'https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg'
                            "
                            :class="
                                codeExpand
                                    ? 'code-expand-icon-show'
                                    : 'code-expand-icon-hide'
                            "
                            @click="handleCodeExpand"
                        />
                    </span>
                </a-tooltip>
            </div>
        </section>
        <section :class="highlightClass">
            <div ref="codeRef" class="highlight">
                <slot v-if="type === 'TS'" name="htmlCode" />
                <slot v-else name="jsVersionHtml" />
            </div>
        </section>
    </section>
</template>

<script lang="ts">
import type { GlobalConfig } from '../App.vue';
import { GLOBAL_CONFIG } from '../SymbolKey';
import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import {
    CheckOutlined,
    SnippetsOutlined,
    CodeSandboxOutlined,
} from '@ant-design/icons-vue';
import { getCodeSandboxParams } from '../utils/generateOnlineDemo';
import packageInfo from '../../../package.json';

// import { Modal } from 'ant-design-vue';
export default defineComponent({
    name: 'DemoBox',
    components: {
        CheckOutlined,
        SnippetsOutlined,
        CodeSandboxOutlined,
    },
    props: {
        jsfiddle: Object,
    },
    setup(props) {
        console.log('demoBox', props);
        const codeExpand = ref(false);
        const type = ref('TS');
        const copyTooltipVisible = ref(false);
        const copied = ref(false);
        const codeRef = ref<HTMLDivElement>();
        const sectionId = computed(() => {
            const relativePath = props.jsfiddle?.relativePath || '';
            return `${relativePath.split('/').join('-').replace('.vue', '')}`;
        });
        console.log('sectionId', props);
        const inIframe = inject('inIframe', false);
        const iframeHeight = computed(() => props.jsfiddle?.iframe);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const addDemosInfo: any = inject('addDemosInfo', () => {});

        const globalConfig = inject<GlobalConfig>(GLOBAL_CONFIG);
        const title = computed(() => props.jsfiddle && props.jsfiddle.title);
        const warning = () => {};
        const iframeDemoKey = computed(() => {
            return (
                props.jsfiddle &&
                props.jsfiddle.title &&
                props.jsfiddle.iframePath
            );
        });
        console.log('iframeDemoKey', props.jsfiddle);
        const onCopyTooltipVisibleChange = (visible: boolean) => {
            if (visible) {
                copyTooltipVisible.value = visible;
                copied.value = false;
            } else {
                copyTooltipVisible.value = visible;
            }
        };
        const docHtml = computed(() =>
            props.jsfiddle && props.jsfiddle.docHtml
                ? (
                      props.jsfiddle.docHtml.replace(
                          `<h2 id="zh-CN">zh-CN <a class="header-anchor" href="#zh-CN">
          <span aria-hidden="true" class="anchor">#</span>
        </a></h2>`,
                          '',
                      )
                          .split(`<h2 id="en-US">en-US <a class="header-anchor" href="#en-US">
          <span aria-hidden="true" class="anchor">#</span>
        </a></h2>`)[0] || ''
                  ).trim()
                : '',
        );
        const handleCodeExpand = () => {
            if (globalConfig.blocked.value) {
                warning();
                return;
            }
            codeExpand.value = !codeExpand.value;
        };
        const handleCodeCopied = () => {
            copied.value = true;
        };
        const handleChangeType = () => {
            if (globalConfig.blocked.value) {
                warning();
                return;
            }
            type.value = type.value === 'TS' ? 'JS' : 'TS';
        };
        // const handleCodeSandbox = () => {
        //   const code = codeRef.value!.innerText;
        //   const params = getCodeSandboxParams(code, {
        //     title: `${title.value} - ant-design-vue@${packageInfo.version}`,
        //   });
        //   const div = document.createElement('div');
        //   div.style.display = 'none';
        //   div.innerHTML = `<form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
        //     <input type="hidden" name="parameters" value="${params}" />
        //     <input type="submit" value="Open in sandbox" />
        //   </form>`;
        //   document.body.appendChild(div);
        //   (div.firstElementChild as HTMLFormElement).submit();
        //   document.body.removeChild(div);
        // };
        const highlightClass = computed(() => {
            return {
                'highlight-wrapper': true,
                'highlight-wrapper-expand': codeExpand.value,
            };
        });
        const iframeDemo = inject('iframeDemo', {});
        onMounted(() => {
            addDemosInfo({
                href: `#${sectionId.value}`,
                title,
            });
        });
        const theme = computed(
            () => inject('themeMode', { theme: ref('default') }).theme.value,
        );
        return {
            docHtml,
            iframeDemo,
            iframeDemoKey,
            iframeHeight,
            inIframe,
            theme,
            type,
            warning,
            blocked: globalConfig.blocked,
            sectionId,
            title,
            codeExpand,
            copyTooltipVisible,
            copied,
            onCopyTooltipVisibleChange,
            handleCodeExpand,
            handleCodeCopied,
            handleChangeType,
            highlightClass,
            sourceCode: decodeURIComponent(
                escape(window.atob(props.jsfiddle?.sourceCode)),
            ),
            jsSourceCode: decodeURIComponent(
                escape(window.atob(props.jsfiddle?.jsSourceCode)),
            ),
            codeRef,
            // handleCodeSandbox,
        };
    },
});
</script>

<style></style>
