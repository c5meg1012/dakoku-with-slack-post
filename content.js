window.onload = () => {
	setTimeout(() => {
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
	}, 1000 );
};
