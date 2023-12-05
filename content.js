window.onload = () => {
	setTimeout(() => {
		const element = document.querySelector('button.vb-button--appearancePrimary');
		if (element.children[0].textContent === '出勤') {
			console.log('出勤ボタン');
		}
		if (element.children[0].textContent === '退勤') {
			console.log('退勤ボタン');
		}
	}, 1000 );
};
