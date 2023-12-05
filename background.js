// アイコンをクリックしたら人事労務を開く
chrome.action.onClicked.addListener((tab) => {
	chrome.tabs.create({url: 'https://p.st-secure.freee.co.jp/' });
});

// async function getCurrentTab() {
// 	let queryOptions = { active: true, lastFocusedWindow: true };
// 	// `tab` will either be a `tabs.Tab` instance or `undefined`.
// 	let [tab] = await chrome.tabs.query(queryOptions);
// 	return tab;
// }

// async function getCurrentTab() {
// 	let queryOptions = { active: true, currentWindow: true };
// 	let [tab] = await chrome.tabs.query(queryOptions);
// 	return tab;
// };
