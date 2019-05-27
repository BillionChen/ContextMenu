# ContextMenu
vue-contextmenu 右键弹出菜单插件，新增加了无限子菜单功能。  

## 编者语

简单的小插件，欢迎拷贝走，记得给个star！

## 引用方法

### 全局引入写法

```js
// main.js
import Vue from 'vue';
import ContextMenu from '@/plugins/ContextMenu';
Vue.use(ContextMenu);
```

### 局部引入写法

```vue
<script>
import { ContextMenu, ContextMenuDirective } from '@/plugins/ContextMenu';
export default {
    directives: {
        // 引入指令式 指令式写法见下文
        'v-contextmenu': ContextMenuDirective
    },
    methods: {
        openMenu() {
            // 引入函数式
            ContextMenu({
                event, // 传入鼠标事件
                menu: [
                    { icon: 'el-icon-view', name: this.$t('button.view'), action: 'view' },
                    { icon: 'el-icon-edit', name: this.$t('button.edit'), action: 'edit' },
                    { icon: 'el-icon-delete', name: this.$t('button.delete'), action: 'delete',
                        children: [
                          {
                            icon: 'el-icon-price-tag',
                            name: '新增1',
                            action: 'newMemoryTag',
                          },
                          {
                            icon: 'el-icon-price-tag',
                            name: '新增2',
                            action: 'newExpressionTag',
                          }
                        ] 
                    }
                ]
            }).then(rs => {
                switch (rs) {
                    case 'view':
                        this.viewFn();
                        break;
                    case 'edit':
                        this.editFn();
                        break;
                    case 'delete':
                        this.deleteFn();
                        break;
                }
            });
        }
    }
};
</script>
```

## 场景1 某个固定的元素需要右键点击菜单

```vue
<template>
    <div class="panel__wrap" v-contextmenu="menu">
        some inner html or other ...
    </div>
</template>
<script>
// 以下两种场景均以全局引入方式引入
export default {
    methods: {
        viewFn(event) {},
        editFn(event) {},
        deleteFn(event) {}
    },
    computed: {
        menu () {
            return [{
                icon: 'el-icon-view',
                name: this.$t('button.view'),
                fn: this.viewFn
            }, {
                icon: 'el-icon-edit',
                name: this.$t('button.edit'),
                fn: this.editFn
            }, {
                icon: 'el-icon-delete',
                name: this.$t('button.delete'),
                fn: this.deleteFn
            }]
        }
    }
};
</script>
```

## 场景2 element-ui 的 el-table 中对每一行使用右键菜单

### 写法1 promise写法

```vue
<template>
    <el-table @row-contextmenu="rowContextmenu">
        some inner html or other ...
    </el-table>
</template>
<script>
export default {
    data() {
        return {
            tableData: []
        };
    },
    methods: {
        rowContextmenu(row, event) {
            this.$ContextMenu({
                event, // 传入鼠标事件
                menu: [
                    { icon: 'el-icon-view', name: this.$t('button.view'), action: 'view' },
                    { icon: 'el-icon-edit', name: this.$t('button.edit'), action: 'edit' },
                    { icon: 'el-icon-delete', name: this.$t('button.delete'), action: 'delete' }
                ]
            }).then(rs => {
                switch (rs) {
                    case 'view':
                        this.viewFn();
                        break;
                    case 'edit':
                        this.editFn();
                        break;
                    case 'delete':
                        this.deleteFn();
                        break;
                }
            });
        }
    }
};
</script>
```

### 写法2 传入回调函数写法

```vue
<template>
    <el-table @row-contextmenu="rowContextmenu">
        some inner html or other ...
    </el-table>
</template>
<script>
export default {
    data() {
        return {
            tableData: []
        };
    },
    methods: {
        rowContextmenu(row, event) {
            this.$ContextMenu({
                event, // 传入鼠标事件
                menu: [
                    { icon: 'el-icon-view', name: this.$t('button.view'), fn: this.viewFn },
                    { icon: 'el-icon-edit', name: this.$t('button.edit'), fn: this.editFn },
                    { icon: 'el-icon-delete', name: this.$t('button.delete'), fn: this.deleteFn }
                ]
            });
        },
        viewFn(event) {},
        editFn(event) {},
        deleteFn(event) {}
    }
};
</script>
```

## 场景3 某个地方需要提前关闭菜单或者事件冒泡被阻止了需要手动关闭菜单

```js
import { ContextMenuClose } from '@/plugins/ContextMenu';
// 上下文...
ContextMenuClose(); // 调用关闭
```
