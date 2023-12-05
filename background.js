// アイコンをクリックしたら人事労務を開く
chrome.action.onClicked.addListener((tab) => {
	chrome.tabs.create({url: 'https://p.st-secure.freee.co.jp/' });
});

// CORS回避でイベントを受け取ってPOSTする
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (!message) {
		sendResponse({
			'status': false,
			'reason': 'message is missing'
		});
	} else if (message.contentScriptQuery === 'post') {
		const data = message.data;

		// TODO: 後でスプレッドシートに移行する
		fetch('https://hooks.slack.com/services/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message.data)
		})
		.then((response) => {
			if (response) {
				sendResponse(response);
			}
		})
		.catch((error) => {
			sendResponse({
				'status': false,
				'reason': 'failed to fetch'
			});
		});
	}

	return true;
});