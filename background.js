// アイコンをクリックしたら人事労務を開く
chrome.action.onClicked.addListener((tab) => {
	chrome.tabs.create({url: 'https://p.st-secure.freee.co.jp/' });
});
