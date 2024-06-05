const contents = document.querySelector(".contents");   // 글 목록을 담을 부모 리스트 요소
const buttons = document.querySelector(".buttons");     // 페이지 버튼을 담을 부모 리스트 요소


let totalcontent = 0;       // 전체 글의 개수
let pageNumber = 0;        // 현재 페이지 (시작 = 1)
let totalpage = 1;
const showContent = 10;     // 한 페이지에 보여줄 글의 개수
const showButton = 5;       // 한 화면에 보여줄 버튼의 개수

const Url = 'http://13.124.61.141:8080/notice/?page='

// API 호출해서 페이지네이션 정보 업데이트
const fetchPagination = async () => {
    try {
        console.log("fetchPagination")
        const response = await fetch(Url+pageNumber);
        const data = await response.json();
        updatePagination(data);
    } catch (error) {
        console.error('Error fatchingPagination:' ,error);
    }
};


// 페이지네이션 정보 업데이트
const updatePagination = (data) => {
    console.log("updatePagination")
    totalcontent = data.page.totalElements;
    totalpage = data.page.totalPages;
    pageNumber = data.page.number;
};


// 버튼 생성
const makeButton = (id) => {
    console.log("makebutton")
    const button = document.createElement("button");
    button.classList.add("button");
    button.dataset.num = id;
    button.innerText = id;
    button.addEventListener("click", (e) => {
        Array.from(buttons.children).forEach((button) => {
            if(button.dataset.num) button.classList.remove("active");
        });
        e.target.classList.add("active");
        renderContent(parseInt(e.target.dataset.num)-1);
    });
    return button;
}


// 페이지 이동
// 이전 페이지
const goPrevPage = () => {
    console.log("goPrevPage")
    pageNumber --;
    if (pageNumber < 1) pageNumber = 1;         //페이지가 1미만이 되지 않도록 보정
    render(pageNumber);
};

// 다음페이지
const goNextPage = () => {
    console.log("goNextPage")
    pageNumber ++;
    if (pageNumber > totalpage) pageNumber = totalpage;     // 페이지가 최대 페이지를 넘지 않도록 보정
    render(pageNumber);
};


// 이전 페이지 버튼
const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
prev.addEventListener("click", goPrevPage);

// 다음 페이지 버튼
const next = document.createElement("button");
next.classList.add("button", "next");
next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
next.addEventListener("click", goNextPage);



const renderContent = (data) => {
    console.log("renderContent")
    // 목록 리스트 초기화
    while (contents.hasChildNodes()) {
      contents.removeChild(contents.lastChild);
    }
    // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
    const messageContainer = noData(data);
    if (messageContainer) {
        contents.appendChild(messageContainer);
    }
  };


// 페이지 버튼 추가(보여줌)
const renderButton = () => {
    console.log("renderButton")
    // 버튼 리스트 초기화
    buttons.innerHTML = "";
    const startPage = Math.max(1, pageNumber - Math.floor(showButton / 2));
    const endPage = Math.min(totalpage, startPage + showButton - 1);
    for (let id = startPage; id <= endPage; id++) {
        buttons.appendChild(makeButton(id));
    }

    if (pageNumber > 1) buttons.prepend(prev);
    if (pageNumber < totalpage) buttons.append(next);
};


const fetchContent = async () => {
    try {
        console.log("fetchContent")
        const response = await fetch(Url+pageNumber);
        const data = await response.json();
        console.log("전")

        renderContent(data);

        console.log("후")
    } catch(error) {
        console.error('Error fetching content: ', error);
    }
}

// 페이지 버튼 렌더링
const render = () => {
    renderButton();
    fetchContent();     // 페이지에 맞는 콘텐츠 로드
};

// 전체게시글 수를 count div에서 업데이트
const updateContentCount = () => {
    const countDiv = document.querySelector(".count");
    if (countDiv) {
        countDiv.textContent = `${totalcontent}건, 현재페이지: ${pageNumber}/${totalpage}`;
    }
};


// 게시글이 0개일 경우
const noData = (data) => {
    console.log("no")
    if(totalcontent === 0) {
        const messageContainer = document.querySelector(".posting");
        messageContainer.innerHTML = "<tr><td colspan='6'>게시물이 없습니다.</td></tr>";
        messageContainer.classList.add("noData");
    }
    else {
        console.log("함수")
        displayTable(data);
    }
};


// 게시글이 0개가 아닐 경우
const displayTable = (data) => {
    const postingTable = document.querySelector('.postingTable tbody');
    console.log(data)
    data.content.forEach(post => {
        const row = document.createElement('tr');
        // <tr>내용 구성
        row.innerHTML = `
        <td class='tdNumber'>${post.number}</td>
        <td class='tdTitle'>${post.title}</td>
        <td class='tdAuthor'>${post.author}</td>
        <td class='tdDate'>${post.posted_time}</td>
        <td class='tdView'>${post.view}</td>
        <td class='tdFile'>${post.file}</td>
    `; 
    // 새로 만든 <tr>을 tbody에 추가
    postingTable.appendChild(row);
    });
    console.log(1)
    return postingTable;
    
}


// 초기화
const init = async () => {
    await fetchPagination();        // 페이지네이션 정보 불러오기
    await updateContentCount();
    // noData();
    await render();
};

init();     // 초기화 실행