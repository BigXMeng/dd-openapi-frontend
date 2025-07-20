# 常用命令
- **安装依赖**：npm install 或 yarn
- **运行项目**：npm start
- **CheckCodeStyle**: npm run lint
- **AutoFixLintError**: npm run lint:fix
- **TestCode**: npm test
# 文件引用协议
- **public文件夹下的文件引用**：`public/logo.svg` -> logo={<img alt="logo" `src="/logo.svg"` />}
- **src文件夹下的文件引用**：`src/components/Footer` -> `import { Footer } from '@/components';`
- **相对引用**：`./` `../`
