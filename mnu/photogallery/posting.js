document.addEventListener('DOMContentLoaded', function() {
    fetch('')   // api 엔드포인트
        .then(response => response.json())
        .then(data => {
            const imageGrid = document.getElementById('imageGrind');
            data.images.slice(0,8).forEach(item => {
                // 각 이미지를 위한 그리드
                const gridItem = document.createElement('div')
                gridItem.className = 'grid-item';

                // 이미지에 링크 추가
                const link = document.createElement('a');
                link.href = item.link;      // 링크 설정
                link.target = '_blank';     // 새 탭에서 열기 (선택한 게시물 보여주는 걸로 연결하면 될 듯)

                // 이미지 생성
                const img = document.createElement('img');
                img.src = item.imageUrl;    // 이미지 url설정
                img.alt = '';

                // 링크 안에 이미지 추가
                link.appendChild(img);

                // 이미지 정보 div 생성
                const infoDiv = document.createElement('div');
                infoDiv.className = 'image-info';

                // 제목
                const title = document.createElement('div');
                title.className = 'title';
                title.textContent = item.title;

                // 작성일자
                const date = document.createElement('div');
                date.className = 'date';
                date.textContent = itme.date;

                // 작성자
                const author = document.createElement('div');
                author.className = 'author';
                author.textContent = item.author;

                // 조회수
                const count = document.createElement('div');
                count.className = 'count';
                count.textContent = item.count;

                // 정보 추가
                infoDiv.appendChild(title);
                infoDiv.appendChild(date);
                infoDiv.appendChild(author);
                infoDiv.appendChild(count);

                // 그리드 아이템에 정보 추가
                gridItem.appendChild(link);
                gridItem.appendChild(infoDiv);

                // 컨테이너에 아이템 추가
                imageGrid.appendChild(gridItem);
            })
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        })
})





// 제목/ 작성일자 / 작성자 / 조회수 / 돋보기 (클릭 시 대표이미지 보여주기)