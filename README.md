# Plugin Marketplace Monorepo (Hono + React)

这是一个可行性验证（PoC）级别的 monorepo：
- `src/server`：Hono 服务端（插件市场 + 安装/卸载 API）
- `src/client`：React 前端（插件浏览、安装、卸载）
- `packages/*`：插件包（可独立构建/部署）

## 技术可行性结论

可行，且建议采用 **workspace + 约定式插件清单（manifest）+ server 端安装状态管理** 的路线：

1. **插件解耦**：每个插件作为独立 npm package，包含 manifest 与可选前端扩展入口。
2. **服务端中心化安装**：server 维护租户/工作区级安装表，执行安装与卸载流程（可扩展权限校验、审计、回滚）。
3. **前端动态展示**：client 仅依赖市场 API 渲染插件状态；后续可接入动态模块加载。
4. **独立部署 + 并行构建**：workspace 下各包可单独 build/start，也能并行运行。

## 目录结构

```txt
.
├─ package.json
├─ pnpm-workspace.yaml
├─ tsconfig.base.json
├─ src/
│  ├─ server/
│  └─ client/
└─ packages/
   ├─ plugin-sdk/
   ├─ plugin-slack/
   ├─ plugin-github/
   └─ plugin-notion/
```

## 快速开始

```bash
pnpm install
pnpm -r build
pnpm dev
```

默认：
- server: `http://localhost:3000`
- client: `http://localhost:5173`

## API 概览

- `GET /api/plugins`：插件市场列表 + 是否已安装
- `POST /api/plugins/:id/install`：安装插件
- `POST /api/plugins/:id/uninstall`：卸载插件
- `GET /health`：健康检查

## 后续建议（生产化）

- 安装流程改为异步任务队列（BullMQ / Cloud Tasks）
- 安装状态持久化（PostgreSQL）+ 幂等 key
- 插件权限模型（scopes）与审批流
- 插件沙箱隔离（iframe/worker/remote runtime）
- 版本策略（语义化版本 + 兼容矩阵）
