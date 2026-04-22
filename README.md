# 星星脑力营

一个适合小学生使用的答题小游戏原型。

功能包括：

- 点开始就连续出题，直到手动结束
- 支持数学思维、语文阅读、英语能力混合出题
- 优先使用阿里千问实时生成题目
- 千问失败时自动回退到本地题库
- 答对有星星动画和提示音
- 每 20 颗星解锁 1 枚奖牌
- 支持简单 / 普通 / 挑战三档难度

## 文件说明

- `index.html`：页面入口
- `styles.css`：样式文件
- `app.js`：游戏逻辑
- `.nojekyll`：让 GitHub Pages 直接按静态文件发布

## 本地使用

直接用浏览器打开 `index.html` 即可试玩。

## 发布到 GitHub Pages

1. 在 GitHub 新建一个公开仓库，例如 `star-camp-game`
2. 把本目录中的这些文件上传到仓库根目录：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `.nojekyll`
   - `README.md`
3. 打开仓库的 `Settings`
4. 进入左侧 `Pages`
5. 在 `Build and deployment` 里：
   - `Source` 选 `Deploy from a branch`
   - `Branch` 选你的主分支，一般是 `main`
   - 文件夹选 `/ (root)`
6. 点击 `Save`
7. 等待 GitHub Pages 部署完成
8. 打开生成的网址：

`https://你的用户名.github.io/仓库名/`

例如仓库名是 `star-camp-game`，用户名是 `sally-demo`，那么网址通常是：

`https://sally-demo.github.io/star-camp-game/`

## 使用千问 API

网页打开后：

1. 点击首页 `设置`
2. 输入阿里千问 API key
3. 保持默认接口地址，或者改成你自己的区域地址
4. 保存后开始答题

默认接口地址：

`https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions`

默认模型：

`qwen-plus`

## 注意事项

- 当前版本适合自己测试和演示
- API key 是保存在浏览器本地的，不会上传到 GitHub
- 但这是前端直连模型接口，不适合正式公开商用
- 如果以后要正式上线，建议改成后端代调千问接口
