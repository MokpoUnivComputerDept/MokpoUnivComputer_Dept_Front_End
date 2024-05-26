const apiUrl = "http://13.124.61.141:8080/notice"; // 실제 API URL

// JWT를 로컬 스토리지에서 가져오기
const token = localStorage.getItem('token');

fetch(apiUrl, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${token}`, // JWT를 Authorization 헤더에 포함
        'Content-Type': 'application/json'
    },
    credentials: "include"
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        const jsonData = data.content; // JSON 데이터의 "content" 배열

        const dataTable = document.getElementById('data-table').querySelector('tbody'); // 데이터 테이블의 tbody 선택

        jsonData.forEach(item => {
            // 새로운 테이블 행 생성
            const tableRow = document.createElement('tr');

            // 작성일자 셀 추가
            const dateCell = document.createElement('td');
            dateCell.textContent = item.day;
            tableRow.appendChild(dateCell);

            // 제목 셀 추가
            const titleCell = document.createElement('td');
            titleCell.textContent = item.title;
            tableRow.appendChild(titleCell);

            // 작성자 셀 추가
            const authorCell = document.createElement('td');
            authorCell.textContent = item.author;
            tableRow.appendChild(authorCell);

            // 조회수 셀 추가
            const viewCell = document.createElement('td');
            viewCell.textContent = item.view;
            tableRow.appendChild(viewCell);

            // 생성된 테이블 행을 데이터 테이블의 tbody에 추가
            dataTable.appendChild(tableRow);
        });
    })
    .catch(error => {
        console.error('Fetch operation failed: ', error);
    });

// document.addEventListener('DOMContentLoaded', function() {
//     // 하드코딩된 JSON 데이터 정의
//     const jsonData = {
//         "hierarchy": {
//             "첫번째 게시판": [
//                 "게시판 리스트1", 
//                 "게시판 리스트2", 
//                 "게시판 리스트3",
//                 {
//                     "두번째 게시판": [
//                         {
//                             "세번째 게시판": [
//                                 "게시판1", 
//                                 "게시판2"
//                             ]
//                         }, 
//                         "게시판4"
//                     ]
//                 },
//                 {
//                     "두번째 게시판": [
//                         "게시판5", 
//                         "게시판6"
//                     ]
//                 },
//                 {
//                     "두번째 게시판": [
//                         "게시판7", 
//                         "게시판8"
//                     ]
//                 }
//             ]
//         },
//         "current": [
//             "첫번째 게시판 이름", 
//             "두번째 게시판 이름", 
//             "세번째는 있을수도 있음"
//         ],
//         "data": [
//             {"totalpage": "페이지 계산 개수"}, 
//             {"totalcontent": "전체 게시글 수"}, 
//             {"currentpage": "현재 페이지"}
//         ],
//         "content": [
//             {
//                 "title": "제목 1",
//                 "author": "작성자 1",
//                 "day": "2024-02-10",
//                 "view": 10,
//                 "file": true
//             },
//             {
//                 "title": "제목 2",
//                 "author": "작성자 2",
//                 "day": "2024-02-11",
//                 "view": 20,
//                 "file": false
//             }
//         ]
//     };

//     // 실제 Fetch API 대신 하드코딩된 JSON 데이터를 사용하여 테이블 업데이트
//     const dataTable = document.getElementById('data-table').querySelector('tbody'); // 데이터 테이블의 tbody 선택

//     jsonData.content.forEach(item => {
//         // 새로운 테이블 행 생성
//         const tableRow = document.createElement('tr');

//         // 작성일자 셀 추가
//         const dateCell = document.createElement('td');
//         dateCell.textContent = item.day;
//         tableRow.appendChild(dateCell);

//         // 제목 셀 추가
//         const titleCell = document.createElement('td');
//         titleCell.textContent = item.title;
//         tableRow.appendChild(titleCell);

//         // 작성자 셀 추가
//         const authorCell = document.createElement('td');
//         authorCell.textContent = item.author;
//         tableRow.appendChild(authorCell);

//         // 조회수 셀 추가
//         const viewCell = document.createElement('td');
//         viewCell.textContent = item.view;
//         tableRow.appendChild(viewCell);

//         // 생성된 테이블 행을 데이터 테이블의 tbody에 추가
//         dataTable.appendChild(tableRow);
//     });
// });