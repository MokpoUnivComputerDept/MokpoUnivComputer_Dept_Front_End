export async function fetchImage(data) {
    const imageGrid = document.getElementById('imageGrid');
    const images = data.content;
    console.log(data)
    images.slice(0, 8).forEach(item => {
        // 각 이미지를 위한 그리드
        const gridItem = document.createElement('div')
        gridItem.className = 'grid-item';

        // 이미지에 링크 추가
        const url = "http://3.37.97.2/cs/community/photo-gallery/";
        const link = document.createElement('a');
        link.href = url + item.id;
        link.target = '_self';

        // 이미지 생성
        const img = document.createElement('img');
        img.src = item.thumbnail.fileUrl;
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
    });
}