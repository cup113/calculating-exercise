# readme - 速算练习的使用说明

### 1. 功能

1. 速算练习。练习你的速算能力与细心程度。
2. 分为5种不同模式，每种模式分为6档不同的难度。

### 2. 注意事项

1. 至少拥有小学3年级的知识。
2. 真的挺复杂的，请把4.选择建议看一下吧

### 3. 操作说明

1. 分为3个部分：准备（选择）、答题和结果生成
2. 准备部分：按照选择建议选择好，再选择自己要答的题数。
3. 答题部分：灵活运用Tab切换焦点、Space点击按钮的快捷键，有助于提高速度。
4. 结果生成：生成一个结果表格，配上背景图片。可以将其截图。

### 4. 选择建议

1. 名称格式：（加法、连加、乘法、连乘、平方）+（入门=1、初级=2、中级=3、高级=4、专家=5、大师=6）
2. LV1 基础入门: 加法1,2 连加1 乘法1 连乘1 平方1,2,3
3. LV2 擅长计算: 加法3 连加2,3 乘法2 平方4
4. LV3 人体计算器: 加法4,5 连加4 乘法3,4 连乘2 平方5
5. LV4 专业训练: 加法6 连加5 乘法5 连乘3 平方6
6. LV5 世界顶尖: 连加6 连乘4
7. LV6 绝对计算: 乘法6 连乘5,6

### 5. 代码原理

1. 在ready中收集选择信息，用url传递个exercise部分
2. 在exercise中不断循环判断，并记录数据【使用了big_number.js库】
3. 将exercise的信息用url传输到result部分，并将数据用表格可视化。

### 6. 更新日志

#### V1.2.0 // 26.5KB

就当这是一个新的开始吧。
版本编号：202109151