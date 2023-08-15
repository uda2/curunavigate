// くるんなび

// new curunNavigate({
// "start": {"query" : "#start", "align" : "./images/title.png", "msg" : "テキスト入力欄に日本語や英語の一部を入力すると下に関係するタグが表示されます。"},
// "file": {"query" : "#file", "align" : "left", "msg" : "生成画像がある場合は左上のボタンからファイルを開くと「prompt」や「negative prompt」が自動抽出されます。"}
// });

const curunNavigate = class {
  constructor(navigates) {
    this.navigates = navigates;
    this.navkeys = Object.keys(this.navigates);
    this.navigate = document.getElementById("navigate");
    if (!this.navigate) {
      this.navigate = document.createElement("div");
      this.navigate.setAttribute("id", "navigate");
      document.body.appendChild(this.navigate);
    }
    this.scrolling = null;
    this.close = (e) => { this._close(e) };//削除可能にする為に変数化
    this.scroll = (e) => { this._scroll(e) };//削除可能にする為に変数化
    this.resize = (e) => { this._resize(e) };//削除可能にする為に変数化
    this.navigate.addEventListener('click', this.close);
    window.addEventListener('scroll', this.scroll);
    window.addEventListener('resize', this.resize);
    for (const mykey of this.navkeys) {
      if (localStorage.getItem(mykey) !== null) continue;
      this.setNavigate(this.navigates[mykey]);
      break;
    }
  }
  _close(e) {
    e.stopPropagation();
    this.navigate.classList.remove('active');
    for (const i in this.navkeys) {
      if (localStorage.getItem(this.navkeys[i]) === null) {
        localStorage.setItem(this.navkeys[i], 'done');
        const next = Math.floor(i) + 1;
        if (next < this.navkeys.length) this.setNavigate(this.navigates[this.navkeys[next]]);
        break;
      }
    }
  }
  _scroll(e) {
    if (this.scrolling !== null) {
      clearTimeout(this.scrolling);
      this.scrolling = null;
    }
    // スムーズスクロールの完了を待つ
    this.scrolling = setTimeout(function () {
      if (this.navigate.classList.contains('active')) this.reposNavigate();
      this.scrolling = null;
    }, 100);
  }
  _resize(e) {
    if (this.navigate.classList.contains('active')) this.showNavigate();
  }
  
  setNavigate(data) {
    if (data.align === "right") {
      this.navigate.classList.remove('left');
      this.navigate.classList.add('right');
      this.navigate.innerHTML = "<p>"+data.msg+"</p>";
    } else if (data.align === "left") {
      this.navigate.classList.remove('right');
      this.navigate.classList.add('left');
      this.navigate.innerHTML = "<p>"+data.msg+"</p>";
    } else {
      this.navigate.classList.remove('right');
      this.navigate.classList.remove('left');
      this.navigate.innerHTML = '<img src="'+data.align+'" alt="'+data.msg+'">';
    }
    this.navigate.classList.add('active');
    this.navigate.setAttribute("data-query", data.query);
    this.showNavigate();
  }
  // 表示範囲以外なら表示範囲にスクロールする。（リサイズ用に分離）
  showNavigate() {
    const query = this.navigate.getAttribute("data-query");
    const target = document.querySelector(query);
    if (target) {
      const targetRect = target.getBoundingClientRect();
    
      const fixedTop = targetRect.top + window.scrollY;
      const fixedLeft = targetRect.left + window.scrollX;
      if (fixedTop >= 0 && fixedTop < window.innerHeight / 2 && fixedLeft >= 0 && fixedLeft < window.innerWidth) {
        this.reposNavigate();
      } else {
        target.scrollIntoView({behavior: 'smooth'});
      }
    }
  }
  // スクロールイベント完了時にメッセージの位置調整（スクロール用に分離）
  reposNavigate() {
    const query = this.navigate.getAttribute("data-query");
    const target = document.querySelector(query);
    const targetRect = target.getBoundingClientRect();
  
    const fixedTop = targetRect.top + window.scrollY;
    const fixedLeft = targetRect.left + window.scrollX;
    const naviText = this.navigate.querySelector("p");
    if (this.navigate.classList.contains('right')) {
      naviText.style.left = "auto";
      naviText.style.right = (fixedLeft + targetRect.width) + "px";
    } else {
      naviText.style.left = fixedLeft + "px";
      naviText.style.right = "auto";
    }
    naviText.style.top = fixedTop + "px";
  }
}