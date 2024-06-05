document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.querySelector('.searchBox');
    const searchButton = document.querySelector('.searchButton');
    const comboBox = document.querySelector('.comboBox');

    // 검색 버튼 클릭 시 검색 수행
    searchButton.addEventListener('click', performSearch);

    // 검색 상자에서 엔터 키 입력 시 검색 수행
    searchBox.addEventListener('keypress', function(event) {
        if(event.key === 'Enter') {
            performSearch();
        }
    });

    // 콤보박스의 값이 변경될 때마다 검색 수행
    comboBox.addEventListener('change', performSearch);

    // 전체게시글 수를 count div에서 업데이트
    const updateContentCount = () => {
    const countDiv = document.querySelector(".count");
    if (countDiv) {
        countDiv.textContent = `${totalcontent}건, 현재페이지: ${currentpage}/${totalpage}`;
    }
};

updateContentCount();
});





//==========================================================================

    // // 검색 수행
    // function performSearch() {
    //     const keyword = searchBox.value.trim().toLowerCase();
    //     const rows = document.querySelectorAll('.postingTable tbody tr');
    //     //검색결과 수를 저장할 변수
    //     let totalcontent = 0;

    //     // 각 행 반복
    //     rows.forEach(row => {
    //         const titleElement = row.querySelector('.thTitle');
    //         const title = titleElement ? titleElement.textContent.trim().toLowerCase() : '';
    //         const writerElement = row.querySelector('.thWriter');
    //         const writer = writerElement ? writerElement.textContent.trim().toLowerCase() : '';

    //         if ((comboBox.value === 'title' && title.includes(keyword)) || (comboBox.value === 'writer' && writer.includes(keyword))) {
    //             row.style.display = '';
    //             totalcontent++;
    //         } else {
    //             // 검색어가 포함되지 않은 행은 숨기기
    //             row.style.display = 'none';
    //         }
    //     });
    // }
