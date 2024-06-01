export function fetchImage(page) {
    document.addEventListener('DOMContentLoaded', function() {
        fetch('http://13.124.61.141:8080/photo-gallery/index/'+page)   // api 엔드포인트
            .then(response => response.json())
            .then(data => {
                const imageGrid = document.getElementById('imageGrid');
                data.images.slice(0,8).forEach(item => {
                    // 각 이미지를 위한 그리드
                    const gridItem = document.createElement('div')
                    gridItem.className = 'grid-item';

                    // 이미지에 링크 추가
                    const url = "http://3.37.97.2/cs/community/photo-gallery/";
                    const link = document.createElement('a');
                    link.href = url+item.id;      // 클릭 시 이동할 url(그러면 여기서 선택한 게시물의 링크로 연결하는건가?)
                    link.target = '_self';

                    // 이미지 생성
                    const img = document.createElement('img');
                    img.src = item.thumbnail.fileUrl;    // 이미지 url설정 <-- 이게 보여줄 이미지 사진 (첫번째 사진 보여주기)
                    img.alt = item.thumbnail.fileName;

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
                    date.textContent = item.date;

                    // 작성자
                    const author = document.createElement('div');
                    author.className = 'author';
                    author.textContent = item.author;

                    // 조회수
                    const view = document.createElement('div');
                    view.className = 'view';
                    view.textContent = item.view;

                    // 정보 추가
                    infoDiv.appendChild(title);
                    infoDiv.appendChild(date);
                    infoDiv.appendChild(author);
                    infoDiv.appendChild(view);

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
}