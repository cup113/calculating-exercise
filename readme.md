# readme - 速算练习的使用说明

### 1. 功能

1. 速算练习。练习你的速算能力与细心程度。
2. 分为9种不同模式，每种模式最多分为10档不同的难度。

### 2. 注意事项

1. 请根据自己的水平，选择相应合适的难度。
2. 在练习界面时，可以点击左上角的返回按钮返回准备界面。但这会清除你当前的所有进度。

### 3. 操作说明

1. 准备（准备界面）: 选择项目、难度，并输入题数(1~1000)
2. （练习界面）在答题中会消耗时间（即下方提示`答题完毕请点击“提交”，或按回车(Enter键)`时），两题之间间隔不算时间，不用担心。
3. 显示报告（报告界面）。你可以看到你的总览和具体的每题详情。

### 4. 函数接口

#### Lib\BigInteger\BigInteger.js

**第三方库**。详情请见 [https://github.com/peterolson/BigInteger.js/](https://github.com/peterolson/BigInteger.js/)

#### src\exercise.ts

1. `class Question` 问题类
2. `function bRandom` 随机通过位数产生BigInteger函数
3. `function iRandom` 普通离散型随机数生成
4. `function siRandom` 平方偏上分布的随机数生成
5. `function sup0` 把数前补充0到指定位数