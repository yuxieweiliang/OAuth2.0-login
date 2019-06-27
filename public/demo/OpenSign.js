function chunkToString(data) {
  return Object.keys(data).map(key => `${key}=${data[key]}`).toString();
}

class OpenSign {
  constructor(options) {
    const config = {
      height: 100,
      width: 100,
      top: 0,
      left: 0,
      // 是否显示浏览器工具栏.默认值是yes
      toolbar: "no",
      // 是否显示菜单栏.默认值是yes
      menubar: "no",
      // 否显示滚动条.默认值是yes
      scrollbars: "no",
      // 是否可调整窗口大小.默认值是yes
      resizable: "no",
      // 是否显示地址字段.默认值是yes
      location: "no",
      // 是否要添加一个状态栏.默认值是yes
      status: "no",
    };
    this.popup = null;
    this.origin = options.origin;
    this.title = options.title;
    this.isLoaded = false;
    this.config = Object.assign({}, config, options.config);
  }

  open = () => {
    const option = chunkToString(this.config);
    this.popup = window.open(this.origin, this.title, option, false);
  };
  loaded = () => {
    this.isLoaded = true;
    console.log('loaded');
  };
  close = () => {
    this.isLoaded = false;
    console.log('close');
  };
  refresh = (href) => {
    // window.location.reload();
    window.location.href = href;
    console.log('reload');
  };
};
