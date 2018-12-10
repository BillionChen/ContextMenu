import Vue from 'vue';
import contextMenuVue from './main.vue';
const isVNode = (node) => {
  return node !== null && typeof node === 'object' && hasOwnProperty.call(node, 'componentOptions');
};
const ContextMenuConstructor = Vue.extend(contextMenuVue);
let instance;
const ContextMenu = function (options) {
  try {
    let e = options.event;
    e.preventDefault();
  } catch (e) {
    console.log(e);
  }
  if (Vue.prototype.$isServer) return;
  return new Promise((resolve, reject) => {
    const remove = function () {
      document.body.removeChild(instance.$el);
      document.body.removeEventListener('click', bodyClick);
      document.body.removeEventListener('scroll', bodyClick);
      instance = null;
    };
    const bodyClick = function () {
      instance.resolve('');
    };
    if (instance) { // 如果还有上一个未关闭
      instance.resolve('');
    }
    instance = new ContextMenuConstructor({
      el: document.createElement('div')
    });
    if (options.icon !== undefined) instance.icon = options.icon;
    if (options.menu !== undefined) instance.menu = options.menu;
    if (options.event !== undefined) {
      instance.customEvent = options.event;
      instance.axis = { x: options.event.x, y: options.event.y };
    }
    instance.resolve = function () {
      resolve(arguments[0]);
      remove();
    };
    // instance.reject = reject;
    document.body.appendChild(instance.$el);
    document.body.addEventListener('click', bodyClick);
    document.body.addEventListener('scroll', bodyClick);
  });
};

const ContextMenuDirective = {
  bind(el, binding) {
    el.addEventListener('contextmenu', function (event) {
      ContextMenu({event, menu: binding.value});
    });
  }
};

ContextMenu.install = function (Vue) {
  Vue.prototype.$ContextMenu = ContextMenu;
  Vue.directive('Contextmenu', ContextMenuDirective);
};

export default ContextMenu;
export { ContextMenu };
