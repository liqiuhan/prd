# ChatBI - 分析思路配置需求文档

## 1. 概述

### 1.1 背景

ChatBI平台需要提供一个分析思路配置功能，使业务人员能够创建、管理和应用不同的分析思路，以便更有效地分析业务数据。分析思路由分析模块、业务知识和管理策略三个核心要素组成，形成一个完整的分析框架。

### 1.2 目标

开发一个直观、易用的分析思路配置页面，使用户能够：
- 查看和管理现有的分析思路
- 创建新的分析思路
- 编辑现有的分析思路
- 按分析对象筛选分析思路

## 2. 功能需求

### 2.1 分析思路管理页面

#### 2.1.1 页面布局
- 页面顶部显示标题"分析思路配置与管理"和"新建分析思路"按钮
- 提供两个标签页：
  - "全部分析思路"：显示所有分析思路
  - "按分析对象查看"：按不同分析对象分类显示分析思路

#### 2.1.2 搜索功能
- 提供搜索框，支持按分析思路名称搜索

#### 2.1.3 分析思路列表
- 每个分析思路以卡片形式展示，包含：
  - 分析思路名称
  - 分析模块、业务知识和管理策略的可视化展示
  - 适用的分析对象标签
  - 编辑和删除按钮

#### 2.1.4 按分析对象查看
- 提供多个标签页，对应不同的分析对象（门店、CA、大区等）
- 每个标签页下显示适用于该分析对象的分析思路

### 2.2 创建/编辑分析思路页面

#### 2.2.1 页面布局
- 页面顶部显示导航和标题
- 分步骤引导用户完成分析思路的创建/编辑

#### 2.2.2 基本信息
- 分析思路名称输入框
- 简短描述文本区域

#### 2.2.3 分析思路可视化
- 提供一个直观的等式展示：分析思路 = 分析模块 + 业务知识 + 管理策略
- 等式各部分可点击，点击后跳转到对应的配置区域
- 等式在页面滚动时固定在顶部，方便用户随时查看已选内容

#### 2.2.4 分析模块选择（第一步）
- 以卡片形式展示可选的分析模块（业绩、房源、客源、带看、商机等）
- 支持搜索分析模块
- 支持多选，并显示已选模块的顺序
- 已选模块以标签形式展示，可删除

#### 2.2.5 业务知识选择（第二步）
- 根据已选的分析模块，为每个模块提供相关的业务知识选择
- 提供搜索功能
- 显示推荐的业务知识
- 支持查看更多业务知识的弹窗选择
- 已选业务知识以标签形式展示，可删除

#### 2.2.6 管理策略选择（第三步）
- 根据已选的分析模块，为每个模块提供相关的管理策略选择
- 提供搜索功能
- 显示推荐的管理策略
- 支持查看更多管理策略的弹窗选择
- 已选管理策略以标签形式展示，可删除

#### 2.2.7 整体要求（第四步）
- 提供文本区域，用于输入分析思路的整体要求
- 提供相关知识搜索功能
- 显示推荐知识
- 支持查看更多知识的弹窗选择
- 已选知识以标签形式展示，可删除

#### 2.2.8 分析对象选择（第五步）
- 提供组织架构选择器，包含两个标签页：
  - 贝壳城市运营：门店、CA、大区、大部、城市、区域、全国
  - 整装：城市店、经营部、大区、区域、全国
- 支持多选，已选对象高亮显示

#### 2.2.9 操作按钮
- 取消按钮：取消当前操作，返回管理页面
- 保存按钮：保存分析思路，返回管理页面

### 2.3 知识选择弹窗

#### 2.3.1 弹窗布局
- 弹窗标题根据选择类型显示（业务知识/管理策略/整体要求知识）
- 提供搜索框
- 提供层级筛选器和单级筛选器
- 显示知识列表
- 底部提供取消和确认按钮

#### 2.3.2 层级筛选器
- 提供三级标签筛选：
  - 一级标签（业务分析、市场研究、管理方法等）
  - 二级标签（根据一级标签动态变化）
  - 三级标签（根据二级标签动态变化）

#### 2.3.3 单级筛选器
- 业务线筛选（租赁、二手房、新房、全业务线）
- 负责人筛选

#### 2.3.4 知识列表
- 以列表形式展示符合筛选条件的知识
- 每项包含：
  - 复选框
  - 知识标题
  - 知识ID
  - 负责人
  - 知识类型

## 3. 非功能需求

### 3.1 性能要求
- 页面加载时间不超过2秒
- 搜索响应时间不超过1秒
- 保存操作响应时间不超过3秒

### 3.2 兼容性要求
- 支持主流浏览器：Chrome、Firefox、Safari、Edge最新版本
- 支持响应式设计，适配桌面和平板设备

### 3.3 安全要求
- 实施适当的内容安全策略
- 防止XSS和CSRF攻击
- 确保用户只能访问其有权限的分析思路

### 3.4 可用性要求
- 提供清晰的视觉反馈，指示当前操作状态
- 提供适当的错误提示和操作指导
- 支持键盘导航和快捷键

## 4. 用户界面设计要求

### 4.1 整体风格
- 遵循公司设计规范
- 使用简洁、现代的界面风格
- 采用一致的色彩方案和字体

### 4.2 交互设计
- 提供平滑的动画过渡效果
- 使用直观的图标和视觉提示
- 确保关键操作有明确的视觉焦点

### 4.3 响应式设计
- 在不同屏幕尺寸下保持良好的可用性
- 移动设备上优化布局和交互方式

## 5. 数据要求

### 5.1 数据结构
分析思路数据结构应包含：
- 基本信息（ID、名称、描述、创建时间、更新时间、创建者）
- 分析模块列表（包含顺序信息）
- 业务知识（按分析模块分组）
- 管理策略（按分析模块分组）
- 整体要求（文本和关联知识）
- 适用分析对象列表

### 5.2 数据验证
- 分析思路名称为必填项
- 至少选择一个分析模块
- 至少选择一个分析对象

## 6. 接口要求

### 6.1 前端接口
前端页面需要实现以下功能接口：
- 分析思路列表获取
- 分析思路详情获取
- 分析思路创建
- 分析思路更新
- 分析思路删除
- 分析模块列表获取
- 业务知识搜索和筛选
- 管理策略搜索和筛选

### 6.2 后端接口
后端需要提供以下API接口：
- GET /api/analysis-approaches - 获取分析思路列表
- GET /api/analysis-approaches/{id} - 获取特定分析思路详情
- POST /api/analysis-approaches - 创建新分析思路
- PUT /api/analysis-approaches/{id} - 更新分析思路
- DELETE /api/analysis-approaches/{id} - 删除分析思路
- GET /api/analysis-modules - 获取分析模块列表
- GET /api/business-knowledge - 获取业务知识（支持搜索和筛选）
- GET /api/management-strategies - 获取管理策略（支持搜索和筛选）

## 7. 测试要求

### 7.1 功能测试
- 验证所有功能按需求正常工作
- 验证表单验证和错误处理
- 验证数据保存和加载

### 7.2 兼容性测试
- 在不同浏览器上测试
- 在不同屏幕尺寸上测试

### 7.3 性能测试
- 测试页面加载时间
- 测试搜索和筛选响应时间
- 测试大量数据下的性能表现

## 8. 交付要求

### 8.1 交付物
- 前端页面代码
- 后端API实现
- 技术文档
- 用户使用手册

### 8.2 时间节点
- 需求确认：[日期]
- 设计完成：[日期]
- 开发完成：[日期]
- 测试完成：[日期]
- 上线日期：[日期]

## 9. 附录

### 9.1 术语表
- **分析思路**：一种结构化的分析方法，由分析模块、业务知识和管理策略组成
- **分析模块**：数据分析的特定领域，如业绩、房源、客源等
- **业务知识**：与特定分析模块相关的业务理解和分析方法
- **管理策略**：基于分析结果可采取的管理措施和策略

### 9.2 参考资料
- 现有分析思路示例
- 组织架构图
- 业务知识库结构 