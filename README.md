# 空梦回廊

梦核（dreamcore）+ 轻恐怖 3D 网页游戏。Three.js + Vite，零成本开发与发布。

## 当前进度
- [x] M0 工程骨架：Vite + Three.js、第一人称移动（键鼠 / 手机摇杆）、自适应分辨率、自动发布
- [ ] M1 梦核场景垂直切片
- [ ] M2 探索、谜题、事件、存档
- [ ] M3 多场景、剧情、异常实体
- [ ] M4 性能、音效、特效、移动端优化
- [ ] M5 PWA 发布

## 本地运行
```bash
npm install
npm run dev
```

## 目录
- `src/core/` 引擎、输入、玩家控制
- `src/scenes/` 场景（当前为 M0 测试走廊）
- `public/` 静态素材（仅 CC0 / 自制）
- `.github/workflows/deploy.yml` 推送 main 后自动构建并发布到 gh-pages

## 素材原则
只使用 CC0 或程序化生成素材，所有来源记录在 `CREDITS.md`。
