// .coto サイト用の最小限のスクリプト
(function () {
  // スマホ用メニューの開閉
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '閉じる' : 'メニュー';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'メニュー';
      }
    });
  }

  // スクロールしたらヘッダーに下線
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // お問い合わせフォーム（送信先は未設定のため、入力チェックのみ）
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstError = null;
      form.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field');
        var ok = input.value.trim() !== '' && (input.type !== 'email' || /.+@.+\..+/.test(input.value));
        field.classList.toggle('is-error', !ok);
        if (!ok && !firstError) firstError = input;
      });
      if (firstError) {
        status.textContent = '未入力、または形式が正しくない項目があります。赤枠の項目を確認してください。';
        status.className = 'form-status is-error';
        firstError.focus();
        return;
      }
      // TODO: 送信先（フォームサービスやGASなど）が決まったらここで送信する
      status.textContent = '入力内容を確認しました。送信先は未設定です（プレースホルダー）。';
      status.className = 'form-status is-ok';
    });
  }
})();
