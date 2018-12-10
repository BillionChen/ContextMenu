<template>
  <ul class="contextmenu" v-show="status" :style="style">
    <li v-for="item in menu"
      class="contextmenu__item"
      :key="item.action || item.name">
      <button @click.stop="fnHandler(item)" type="button">
        <i v-if="icon" :class="item.icon"></i>
        <span>{{item.name}}</span>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    customEvent: {
      type: Object
    },
    icon: { // 是否显示icon
      type: Boolean,
      default: true,
    },
    axis: { // 鼠标右键点击的位置
      type: Object,
      default () {
        return { x: null, y: null };
      }
    },
    menu: { // 最重要的列表，没有的话直接不显示
      type: Array,
      default () {
        return [
          // { icon: '', name: '', action: '', fn: function() {} },
          // 模板，必须有name是国际化传过来, action是作为key和action的存在, icon如果显示但不传icon的话会留空白
          // { icon: 'el-icon-view', name: '查看', action: 'view', fn: function() {} },
          { icon: 'el-icon-edit', name: '编辑', action: 'edit' },
          { icon: 'el-icon-setting', name: '设置', action: 'setting' },
          // { icon: 'el-icon-delete', name: '删除', action: 'delete' }, // 此处传入参数时记得国际化
          // { icon: 'el-icon-printer', name: '打印', action: 'print' },
        ];
      }
    },
    resolve: { // 点击menu按钮时执行的方法
      type: Function,
      default: function() {}
    },
    // reject: { // 不点击按钮点击其他地方关闭时执行的方法 .catch(e => {})
    //   type: Function,
    //   default: function() {}
    // }
  },
  computed: {
    style () {
      let x = this.axis.x;
      let y = this.axis.y;
      // 判断menu距离浏览器可视窗口底部距离,以免距离底部太近的时候，会导致menu被遮挡
      let menuHeight = this.menu.length * 32;// 不能用scrollHeight,获取到的menu是上一次的menu宽高
      let menuWidth = 150; // 不能用scrollWidth,同理
      return {
        left: (document.body.clientWidth < x + menuWidth ? x - menuWidth : x) + 'px',
        top: (document.body.clientHeight < y + menuHeight ? y - menuHeight : y) + 'px',
      };
    }
  },
  data () {
    return {
      status: false
    };
  },
  methods: {
    fnHandler (item) {
      this.status = false;
      if (item.fn) item.fn(this.customEvent);
      this.resolve(item.action);
    },
  },
  beforeDestroy () {
    document.body.removeChild(this.$el);
  },
  mounted () {
    // 挂载后才开始计算左右，隐藏挂载后显示不会闪一下
    this.$nextTick(function () { this.status = true; });
  }
};
</script>

<style lang="scss">
.contextmenu {
  box-shadow: 2px 2px 2px #cccccc;
  display: block;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  &__item {
    width: 150px;
    height: 32px;
    border-radius: 4px;
    background: #F3F3F3;
    text-decoration: none;
    list-style: none;
    button {
      cursor: pointer;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      outline: 0;
      border: 0;
      span {
        flex: 1;
        text-align: left;
      }
      i {
        text-align: center;
        width: 16px;
        padding: 0 8px;
      }
      &:hover {
        box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2);
        color: #ffffff;
        border-radius: 4px;
        background: -webkit-linear-gradient(bottom, #5a6a76 , #2e3940); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(bottom, #5a6a76, #2e3940); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(bottom, #5a6a76, #2e3940); /* Firefox 3.6 - 15 */
        background: linear-gradient(to bottom, #5a6a76 , #2e3940);
      }
    }
  }
}
</style>
