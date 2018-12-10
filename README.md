# ContextMenu
vue-contextmenu 右键弹出菜单插件


## 场景1 某个固定的元素需要右键点击菜单

```vue
<template>
    <div class="panel__wrap" v-contextmenu="menu">
        some inner html or other ...
    </div>
</template>
<script>
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
