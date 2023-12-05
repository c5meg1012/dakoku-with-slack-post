// Slack post
const postToSlack = (emoji) => {
	const data = { 'text': emoji };

	// ここでPOSTするとCORSで引っかかるのでbackgroundに渡す
	chrome.runtime.sendMessage({
		contentScriptQuery: 'post',
		data: data
	});
};

const setEmoji = (isInOffice, isSyukkin) => {
	let emoji = '';

	if (isInOffice === true) {
		emoji = ':butsuri_syussya: ';
	} else if (isInOffice === false) {
		emoji = ':ronri_syussya: ';
	}

	if (isSyukkin) {
		emoji = emoji + ':ohayougozaimasu:';
	} else {
		emoji = emoji + ':otsucurry:';
	}

	return emoji;
};

// 距離を測る関数
const R = Math.PI / 180;
const getDistance = (lat1, lng1, lat2, lng2) => {
  lat1 *= R;
  lng1 *= R;
  lat2 *= R;
  lng2 *= R;

  return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
}

// 位置情報を取得完了してから処理を開始
const successGetPosition = (position) => {
	let isInOffice = false;

	// 大崎ネストとの距離(km)
	// const distance = getDistance(position.coords.latitude, position.coords.longitude, 35.6223771,139.7248845); // 大崎ネストに戻ったらこちらを利用する
	const distance = getDistance(position.coords.latitude, position.coords.longitude, 36.33556235419869, 138.6371057406137); // 軽井沢コテージとの距離

	if ((distance * 1000) < 200) {
		isInOffice = true;
	}

	const emoji = setEmoji(isInOffice, true);
	postToSlack(emoji);

	// 出退勤ボタンからのアクション
	const element = document.querySelector('button.vb-button--appearancePrimary');

	if (element.children[0].textContent === '出勤') {
		element.addEventListener('click', (() => {
			console.log('出勤ボタンが押されました');
		}));
	}
	if (element.children[0].textContent === '退勤') {
		element.addEventListener('click', (() => {
			console.log('退勤ボタンが押されました');
		}));
	// }
};

// 位置情報が取れなかったら
const errorGetPosition = (position) => {
	const emoji = setEmoji(null, true);
	postToSlack(emoji);

	// 出退勤ボタンからのアクション
	const element = document.querySelector('button.vb-button--appearancePrimary');

	if (element.children[0].textContent === '出勤') {
		element.addEventListener('click', (() => {
			console.log('出勤ボタンが押されました');
		}));
	}
	if (element.children[0].textContent === '退勤') {
		element.addEventListener('click', (() => {
			console.log('退勤ボタンが押されました');
		}));
	}
};

// 位置情報取得
navigator.geolocation.getCurrentPosition(successGetPosition, errorGetPosition);
