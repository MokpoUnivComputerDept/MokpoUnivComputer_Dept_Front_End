// JSON 형태의 임시 데이터
const temporaryData = [
    { "number": 1, "title": "첫 번째 게시물", "author": "사용자1", "date": "2024-05-17", "count": 1, "file": "file1.pdf" },
    { "number": 2, "title": "두 번째 게시물", "author": "사용자2", "date": "2024-05-16", "count": 15, "file": "file2.pdf" },
    { "number": 3, "title": "세 번째 게시물", "author": "사용자3", "date": "2024-05-15", "count": 200, "file": "file3.pdf" },
    { "number": 1, "title": "첫 번째 게시물", "author": "사용자1", "date": "2024-05-17", "count": 1, "file": "file1.pdf" },
    { "number": 2, "title": "두 번째 게시물", "author": "사용자2", "date": "2024-05-16", "count": 15, "file": "file2.pdf" },
    { "number": 3, "title": "세 번째 게시물", "author": "사용자3", "date": "2024-05-15", "count": 200, "file": "file3.pdf" },
    { "number": 1, "title": "첫 번째 게시물", "author": "사용자1", "date": "2024-05-17", "count": 1, "file": "file1.pdf" },
    { "number": 2, "title": "두 번째 게시물", "author": "사용자2", "date": "2024-05-16", "count": 15, "file": "file2.pdf" },
    { "number": 3, "title": "세 번째 게시물", "author": "사용자3", "date": "2024-05-15", "count": 200, "file": "file3.pdf" },
    { "number": 1, "title": "첫 번째 게시물", "author": "사용자1", "date": "2024-05-17", "count": 1, "file": "file1.pdf" },
    { "number": 2, "title": "두 번째 게시물", "author": "사용자2", "date": "2024-05-16", "count": 15, "file": "file2.pdf" },
    { "number": 3, "title": "세 번째 게시물", "author": "사용자3", "date": "2024-05-15", "count": 200, "file": "file3.pdf" }
    // 필요한 만큼 게시물을 추가할 수 있습니다.
];

// JSON 데이터를 JavaScript 객체로 파싱
const temporaryPosts = JSON.parse(JSON.stringify(temporaryData));

// 페이지가 로드될 때 실행되는 함수
document.addEventListener('DOMContentLoaded', function() {
    const postingTable = document.querySelector('.postingTable tbody');

    // 임시 데이터를 테이블에 표시하는 함수
    function displayTemporaryData() {
        temporaryPosts.forEach(post => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class='tdNumber'>${post.number}</td>
                <td class='tdTitle'>${post.title}</td>
                <td class='tdAuthor'>${post.author}</td>
                <td class='tdDate'>${post.date}</td>
                <td class='tdCount'>${post.count}</td>
                <td class='tdFile'>${post.file}</td>
            `;
            postingTable.appendChild(row);
        });
    }

    // 페이지가 로드될 때 임시 데이터를 테이블에 표시합니다.
    displayTemporaryData();
});