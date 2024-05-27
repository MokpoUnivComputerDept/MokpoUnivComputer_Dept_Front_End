
function actionLogin() {
    const apiUrl = "http://localhost:8080/login/signup";

    const username = document.getElementById('loginId').value;
    const password = document.getElementById('loginPassword').value;
    const userName = document.getElementById('username').value;
    const depart = document.getElementById('department').value;
    const state = document.getElementById('status').value;
    const studentNum = document.getElementById('usernumber').value;


    const data = {
        username: username,
        password: password,
        name: userName,
        major: depart,
        enrollStatus:state,
        studentNumber: studentNum
    };


    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json()) // 응답을 JSON으로 변환
    .then(data => {
    console.log('Success:', data); // 성공적으로 데이터를 받았을 때 실행
    alert("가입 성공");
    window.location.href = 'mainpage.html';
    })
    .catch((error) => {
    console.error('Error:', error); // 에러가 발생했을 때 실행
    alert("가입 실패");
    });
}