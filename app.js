(() => {
  const toggle = document.getElementById('language-toggle');
  const textNodes = [...document.querySelectorAll('[data-en]')];
  const attributeNodes = [...document.querySelectorAll('[data-en-alt], [data-en-aria]')];
  textNodes.forEach(node => { node.dataset.zh = node.textContent; });
  attributeNodes.forEach(node => {
    if (node.hasAttribute('data-en-alt')) node.dataset.zhAlt = node.getAttribute('alt');
    if (node.hasAttribute('data-en-aria')) node.dataset.zhAria = node.getAttribute('aria-label');
  });
  let language = 'zh';
  try { if (localStorage.getItem('pz-language') === 'en') language = 'en'; } catch (_) {}
  function renderLanguage() {
    const isEnglish = language === 'en';
    document.documentElement.lang = isEnglish ? 'en' : 'zh-CN';
    textNodes.forEach(node => {
      node.textContent = isEnglish ? node.dataset.en : node.dataset.zh;
    });
    attributeNodes.forEach(node => {
      if (node.hasAttribute('data-en-alt')) node.setAttribute('alt', isEnglish ? node.dataset.enAlt : node.dataset.zhAlt);
      if (node.hasAttribute('data-en-aria')) node.setAttribute('aria-label', isEnglish ? node.dataset.enAria : node.dataset.zhAria);
    });
    toggle.textContent = isEnglish ? '中文' : 'English';
    toggle.setAttribute('aria-label', isEnglish ? '切换到中文' : 'Switch to English');
    document.title = isEnglish ? 'Pengju Zhao · Cryptography Research' : '赵鹏举 · Pengju Zhao';
    document.querySelector('meta[name="description"]').content = isEnglish
      ? 'Pengju Zhao, a research-oriented master\'s student at the School of Cyber Science and Technology, Shandong University. Research on efficient block cipher implementations.'
      : '赵鹏举，山东大学网络空间安全学院学术型硕士研究生。研究方向为分组密码组件的高效实现。';
  }
  toggle.addEventListener('click', () => {
    language = language === 'zh' ? 'en' : 'zh';
    renderLanguage();
    try { localStorage.setItem('pz-language', language); } catch (_) {}
  });
  document.getElementById('year').textContent = new Date().getFullYear();
  renderLanguage();
  toggle.hidden = false;
})();
