function actionLogin() {
    const apiUrl = "http://localhost:8080/login/authenticate";
    const username = document.getElementById('loginId').value;
    const password = document.getElementById('loginPassword').value;

    const data = {
        username: username,
        password: password
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed with status ' + response.status);
        }
        return response.json();  // JSON 응답을 파싱
    })
    .then(data => {
        const token = data.token;  // 토큰 추출
        localStorage.setItem('authToken', token);  // 토큰을 로컬 스토리지에 저장
        alert('로그인 성공! 토큰 저장됨');
        window.location.href = 'mainpage.html';  // 메인 페이지로 이동
    })
    .catch(error => {
        console.error('Login failed:', error);
        alert('로그인 실패: ' + error.message);
    });
}
