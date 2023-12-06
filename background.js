// アイコンをクリックしたら人事労務を開く
chrome.action.onClicked.addListener((tab) => {
	chrome.tabs.create({ url: 'https://p.st-secure.freee.co.jp/' });
});

const slackFunc = (args) => {
	const isInOffice = args.isInOffice;
	const isSyukkin = args.isSyukkin;
	let emoji = '';

	if (isSyukkin) {
		if (isInOffice === true) {
			emoji = ':butsuri_syussya: ';
		} else if (isInOffice === false) {
			emoji = ':ronri_syussya: ';
		}

		emoji = emoji + ':ohayougozaimasu:';
	} else {
		if (isInOffice === true) {
			emoji = ':butsuri_taikin: ';
		} else if (isInOffice === false) {
			emoji = ':ronri_taikin: ';
		}

		emoji = emoji + ':otsucurry:';
	}

	// Slack に post する
	console.log('emoji: ' + emoji);
}

// イベントを受け取る
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (!message) {
		sendResponse({
			'status': false,
			'reason': 'message is missing'
		});
	} else {
		// 出勤/退勤ボタンのイベント
		chrome.tabs.create({ url: 'https://app.slack.com/client/' }, (tab) => {
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
        func: slackFunc,
        args: [message],
			}, () => {
				sendResponse('slackOpened');
			})
		});
	}

	return true;
});
