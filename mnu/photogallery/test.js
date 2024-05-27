export function loadImage() {
    const dummyData = {
        "image": [
            {
                "imageUrl": "",
                "title": "Image Title 1",
                "date" : "2024-05-01",
                "author": "Author 1",
                "view" : "10",
                "link": "#"
            },
            {
                "imageUrl": "",
                "title": "Image Title 2",
                "date" : "2024-05-02",
                "author": "Author 2",
                "view" : "13",
                "link": "#"
            },
            {
                "imageUrl": "",
                "title": "Image Title 3",
                "date" : "2024-05-03",
                "author": "Author 3",
                "view" : "24",
                "link": "#"
            },
            {
                "imageUrl": "",
                "title": "Image Title 4",
                "date" : "2024-05-04",
                "author": "Author 4",
                "view" : "100",
                "link": "#"
            },
            {
                "imageUrl": "https://via.placeholder.com/250x200?text=Image+5",
                "title": "Image Title 5",
                "date" : "2024-05-05",
                "author": "Author 5",
                "view" : "1234",
                "link": "#"
            },
            {
                "imageUrl": "https://via.placeholder.com/250x200?text=Image+6",
                "title": "Image Title 6",
                "date" : "2024-05-06",
                "author": "Author 6",
                "view" : "12",
                "link": "#"
            },
            {
                "imageUrl": "https://via.placeholder.com/250x200?text=Image+7",
                "title": "Image Title 7",
                "date" : "2024-05-07",
                "author": "Author 7",
                "view" : "130",
                "link": "#"
            },
            {
                "imageUrl": "https://via.placeholder.com/250x200?text=Image+8",
                "title": "Image Title 8",
                "date" : "2024-05-08",
                "author": "Author 8",
                "view" : "1044",
                "link": "#"
            }
        ]
    };

    // 그리드 컨테이너를 찾음
    const imageGrid = document.getElementById('imageGrid');
    // 예제 데이터의 각 이미지 객체 처리
    dummyData.image.forEach(item => {
        // 각 이미지 데이터를 위한 그리드 아이템 생성
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';

        // 링크 추가
        const link = document.createElement('a');
        link.href = item.link;  // 링크 설정
        link.target = '_blank';  // 새 탭에서 열기

        // 이미지 요소 생성
        const img = document.createElement('img');
        img.src = item.imageUrl;  // 이미지 URL 설정
        img.alt = 'PhotoGallery';

        // 이미지 추가
        link.appendChild(img);

        // 이미지 정보를 포함할 div 요소 생성
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





// document.addEventListener('DOMContentLoaded', function() {
//     // 예제 데이터 생성
//     const dummyData = {
//         "image": [
//             {
//                 "imageUrl": "",
//                 "title": "Image Title 1",
//                 "date" : "2024-05-01",
//                 "author": "Author 1",
//                 "view" : "10",
//                 "link": "#"
//             },
//             {
//                 "imageUrl": "",
//                 "title": "Image Title 2",
//                 "date" : "2024-05-02",
//                 "author": "Author 2",
//                 "view" : "13",
//                 "link": "#"
//             },
//             {
//                 "imageUrl": "",
//                 "title": "Image Title 3",
//                 "date" : "2024-05-03",
//                 "author": "Author 3",
//                 "view" : "24",
//                 "link": "#"
//             },
//             {
//                 "imageUrl": "",
//                 "title": "Image Title 4",
//                 "date" : "2024-05-04",
//                 "author": "Author 4",
//                 "view" : "100",
//                 "link": "#"
//             },
//             {
//                 "imageUrl": "https://via.placeholder.com/250x200?text=Image+5",
//                 "title": "Image Title 5",
//                 "date" : "2024-05-05",
//                 "author": "Author 5",
//                 "view" : "1234",
//                 "link": "#"
//             },
//             {
//                 "imageUrl": "https://via.placeholder.com/250x200?text=Image+6",
//                 "title": "Image Title 6",
//                 "date" : "2024-05-06",
//                 "author": "Author 6",
//                 "view" : "12",
//                 "link": "#"
//             },
//             {
//                 "imageUrl": "https://via.placeholder.com/250x200?text=Image+7",
//                 "title": "Image Title 7",
//                 "date" : "2024-05-07",
//                 "author": "Author 7",
//                 "view" : "130",
//                 "link": "#"
//             },
//             {
//                 "imageUrl": "https://via.placeholder.com/250x200?text=Image+8",
//                 "title": "Image Title 8",
//                 "date" : "2024-05-08",
//                 "author": "Author 8",
//                 "view" : "1044",
//                 "link": "#"
//             }
//         ]
//     };

//     // 그리드 컨테이너를 찾음
//     const imageGrid = document.getElementById('imageGrid');
//     // 예제 데이터의 각 이미지 객체 처리
//     dummyData.image.forEach(item => {
//         // 각 이미지 데이터를 위한 그리드 아이템 생성
//         const gridItem = document.createElement('div');
//         gridItem.className = 'grid-item';

//         // 링크 추가
//         const link = document.createElement('a');
//         link.href = item.link;  // 링크 설정
//         link.target = '_blank';  // 새 탭에서 열기

//         // 이미지 요소 생성
//         const img = document.createElement('img');
//         img.src = item.imageUrl;  // 이미지 URL 설정
//         img.alt = 'PhotoGallery';

//         // 이미지 추가
//         link.appendChild(img);

//         // 이미지 정보를 포함할 div 요소 생성
//         const infoDiv = document.createElement('div');
//         infoDiv.className = 'image-info';

//        // 제목
//        const title = document.createElement('div');
//        title.className = 'title';
//        title.textContent = item.title;

//        // 작성일자
//        const date = document.createElement('div');
//        date.className = 'date';
//        date.textContent = item.date;

//        // 작성자
//        const author = document.createElement('div');
//        author.className = 'author';
//        author.textContent = item.author;

//        // 조회수
//        const view = document.createElement('div');
//        view.className = 'view';
//        view.textContent = item.view;

//         // 정보 추가
//         infoDiv.appendChild(title);
//         infoDiv.appendChild(date);
//         infoDiv.appendChild(author);
//         infoDiv.appendChild(view);

//         // 그리드 아이템에 정보 추가
//         gridItem.appendChild(link);
//         gridItem.appendChild(infoDiv);

//         // 컨테이너에 아이템 추가
//         imageGrid.appendChild(gridItem);
//     });

// });
