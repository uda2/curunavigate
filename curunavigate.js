// くるんなび

// new curunNavigate({
// "start": {"src" : "./images/title.png", "msg" : "サンプルテキスト"},
// "file": {"query" : "#file", "align" : "left", "msg" : "サンプルテキスト"}
// });

const curunNavigate = class {
  constructor(navigates, options) {
    this.navigates = navigates;
    this.navkeys = Object.keys(this.navigates);
    if (!options) options = {};
    this.curunkey = null;
    this.clicktype = (options.clicktype)? options.clicktype:"cover";//coverかhole
    this.viewedcallback = (options.viewedcallback)? options.viewedcallback:null;
    if (options.viewedcsv) this.vieweddatas = options.viewedcsv.split(',');
    else this.vieweddatas = (this.viewedcallback === null && localStorage.getItem("curun") !== null)? localStorage.getItem("curun").split(','):[];
    this.curunwrap = document.getElementById("curunwrap");
    if (!this.curunwrap) {
      this.curunwrap = document.createElement("div");//外枠
      this.curunwrap.setAttribute("id", "curunwrap");
      this.curunhole = document.createElement("div");
      this.curunhole.setAttribute("id", "curunhole");
      this.curunwrap.appendChild(this.curunhole);
      document.body.appendChild(this.curunwrap);
      this.curuncover = document.createElement("div");//テキスト
      this.curuncover.setAttribute("id", "curuncover");
      document.body.appendChild(this.curuncover);
    } else {
      this.curuncover = document.getElementById("curuncover");
      this.curunhole = document.getElementById("curunhole");
    }
    this.scrolling = null;
    window.addEventListener('scroll', this.scroll.bind(this));
    window.addEventListener('resize', this.resize.bind(this));
  }
  clear() {
    this.vieweddatas = [];
    if (this.viewedcallback === null) localStorage.setItem("curun", "[]");
    else this.viewedcallback("[]");
  }
  close() {
    if (this.curunkey === null) return;
    this.vieweddatas.push(this.curunkey);
    if (this.viewedcallback === null) localStorage.setItem("curun", this.vieweddatas.join());
    else this.viewedcallback(this.vieweddatas.join());
    document.body.classList.remove('curunactive');
    if (this.clicktype === "hole" && this.navigates[this.curunkey].query) document.querySelector(this.navigates[this.curunkey].query).classList.remove("curuntarget");
    this.curunkey = null;
  }
  scroll(e) {
    if (this.navigates[this.curunkey].query) document.body.classList.add('curunscrolling');
    this.curunhole.style.height = '0';
    this.curunhole.style.width = '0';
    if (this.scrolling !== null) {
      clearTimeout(this.scrolling);
      this.scrolling = null;
    }
    // スムーズスクロールの完了を待つ
    this.scrolling = setTimeout(function () {
      if (document.body.classList.contains('curunactive')) this.reposNavigate();
      this.scrolling = null;
    }.bind(this), 100);
  }
  resize(e) {
    if (document.body.classList.contains('curunactive')) this.showNavigate();
  }
  
  next() {
    this.close();
    for (const mykey of this.navkeys) {
      if (this.vieweddatas.indexOf(mykey) !== -1) continue;
      this.setNavigate(mykey);
      break;
    }
  }
  setNavigate(mykey) {
    const data = this.navigates[mykey];
    this.curuncover.innerHTML = '';
    this.curuncover.classList.remove('right');
    this.curuncover.classList.remove('left');
    this.curuncover.classList.remove('image');
    if (data.align === "right") {
      this.curuncover.classList.add('right');
      this.curuncover.textContent = data.msg;
      if (this.clicktype === "hole") document.querySelector(data.query).classList.add("curuntarget");
    } else if (data.align === "left") {
      this.curuncover.classList.add('left');
      this.curuncover.textContent = data.msg;
      if (this.clicktype === "hole") document.querySelector(data.query).classList.add("curuntarget");
    } else if (data.src !== "") {
      this.curuncover.classList.add('image');
      const img = document.createElement("img");
      img.src = data.src;
      img.setAttribute("alt", data.msg);
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });
      this.curuncover.appendChild(img);
    }
    document.body.classList.add('curunactive');
    this.curunkey = mykey;
    this.showNavigate();
  }
  // 表示範囲以外なら表示範囲にスクロールする。（リサイズ用に分離）
  showNavigate() {
    if (this.curunkey === null) return;
    if (!this.navigates[this.curunkey].query) return;//画像
    const target = document.querySelector(this.navigates[this.curunkey].query);
    const targetRect = target.getBoundingClientRect();//ビューポートの左上を基準
  
    if (targetRect.top >= 0 && targetRect.top < window.innerHeight / 2 && targetRect.left >= 0 && targetRect.left < window.innerWidth) {
      this.reposNavigate();
    } else {
      document.body.classList.add('curunscrolling');
      target.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
    }
  }
  // スクロール完了時にメッセージの位置調整（スクロール用に分離）
  reposNavigate() {
    if (this.curunkey === null) return;
    if (!this.navigates[this.curunkey].query) return;//画像
    const target = document.querySelector(this.navigates[this.curunkey].query);
    const targetRect = target.getBoundingClientRect();//ビューポートの左上を基準
  
    if (this.curuncover.classList.contains('right')) {
      this.curuncover.style.left = "auto";
      this.curuncover.style.right = (window.innerWidth - targetRect.left - targetRect.width) + "px";
    } else {
      this.curuncover.style.left = targetRect.left + "px";
      this.curuncover.style.right = "auto";
    }
    if (targetRect.top > window.innerHeight - (targetRect.top + targetRect.height)) {
      this.curuncover.classList.add('down');
      this.curuncover.style.top = (targetRect.top - 50) + "px";
    } else {
      this.curuncover.classList.remove('down');
      this.curuncover.style.top = (targetRect.top + targetRect.height - 20) + "px";
    }
    this.curunhole.style.top = (targetRect.top - 5) + 'px';
    this.curunhole.style.left = (targetRect.left - 5) + 'px';
    this.curunhole.style.height = (targetRect.height + 10) + 'px';
    this.curunhole.style.width = (targetRect.width + 10) + 'px';
    document.body.classList.remove('curunscrolling');
  }
}