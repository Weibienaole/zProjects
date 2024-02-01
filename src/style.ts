import { ConfigProviderProps } from 'antd/lib/config-provider'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
*,
::before,
::after {
  box-sizing: border-box;
}

html {
  line-height: 1.4;
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
}

html.dark {
  color-scheme: dark;
}

body {
  margin: 0;
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
  line-height: 24px;
  font-family: 'Inter var experimental', 'Inter var',
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #213547;
  background-color: #ffffff;
  direction: ltr;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  display: block;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  line-height: 24px;
  font-size: 16px;
  font-weight: 400;
}

p {
  margin: 0;
}

strong,
b {
  font-weight: 600;
}

/**
 * Avoid 300ms click delay on touch devices that support the 'touch-action'
 * CSS property.
 *
 * In particular, unlike most other browsers, IE11+Edge on Windows 10 on
 * touch devices and IE Mobile 10-11 DON'T remove the click delay when
 * '<meta name="viewport" content="width=device-width">' is present.
 * However, they DO support removing the click delay via
 * 'touch-action: manipulation'.
 *
 * See:
 * - http://v4-alpha.getbootstrap.com/content/reboot/#click-delay-optimization-for-touch
 * - http://caniuse.com/#feat=css-touch-action
 * - http://patrickhlauke.github.io/touch/tests/results/#suppressing-300ms-delay
 */
a,
area,
button,
[role='button'],
input,
label,
select,
summary,
textarea {
  touch-action: manipulation;
}

a {
  color: inherit;
  text-decoration: inherit;
}

ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

blockquote {
  margin: 0;
}

pre,
code,
kbd,
samp {
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
}

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  vertical-align: middle;
}

figure {
  margin: 0;
}

img,
video {
  max-width: 100%;
  height: auto;
}

button,
input,
optgroup,
select,
textarea {
  border: 0;
  padding: 0;
  line-height: inherit;
  color: inherit;
}

button {
  padding: 0;
  font-family: inherit;
  background-color: transparent;
  background-image: none;
}

button,
[role='button'] {
  cursor: pointer;
}

button:focus,
button:focus-visible {
  outline: 1px dotted;
  outline: 4px auto -webkit-focus-ring-color;
}

button:focus:not(:focus-visible) {
  outline: none !important;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

table {
  border-collapse: collapse;
}

input {
  background-color: transparent;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: rgba(60, 60, 60, 0.33);
}

input::-ms-input-placeholder,
textarea::-ms-input-placeholder {
  color: rgba(60, 60, 60, 0.33);
}

input::placeholder,
textarea::placeholder {
  color: rgba(152, 68, 68, 0.33);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

textarea {
  resize: vertical;
}

select {
  -webkit-appearance: none;
}

fieldset {
  margin: 0;
  padding: 0;
}


/* 打印时要隐藏的通用组件 */
@media print {
}
// 全局 loading样式
.Componetn_SpinContainer{
	position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0,0,0,.2);
  display: flex;
  align-items: center;
  justify-content: center;
	animation: .3s;
	transition: .3s all;
}
`

export default GlobalStyle

// antd 组件配置 样式强制加入到style属性中
// https://ant-design.antgroup.com/components/config-provider-cn#%E7%BB%84%E4%BB%B6%E9%85%8D%E7%BD%AE
export const antdStyConfig: ConfigProviderProps = {
	menu: {
		style: {
			//borderInlineEnd: 'none'
		}
	}
}
