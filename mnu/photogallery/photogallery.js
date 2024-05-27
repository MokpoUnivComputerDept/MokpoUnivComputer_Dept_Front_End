const contents = document.querySelector(".contents");   // 글 목록을 담을 부모 리스트 요소
const buttons = document.querySelector(".buttons");     // 페이지 버튼을 담을 부모 리스트 요소

const Url = '13.124.61.141:8080/photo-gallery'

// let totalcontent = 0;
let totalcontent = 8;       // 전체 글의 개수
let currentpage = 1;        // 현재 페이지 (시작 = 1)
let totalpage = 1;
const showContent = 8;     // 한 페이지에 보여줄 글의 개수
const showButton = 5;       // 한 화면에 보여줄 버튼의 개수


// 페이지네이션 정보 업데이트
const updatePagination = (data) => {
    totalcontent = data.totalcontent;
    totalpage = data.totalpage;
    currentpage = data.currentpage;
};


// API 호출해서 페이지네이션 정보 업데이트
const fetchPagination = async () => {
    try {
        const response = await fetch(Url);
        const data = await response.json();
        updatePagination(data);
        render(currentpage);
    } catch (error) {
        console.error('Error fatchingPagination:' ,error);
    }
};



// 버튼 생성
const makeButton = (id) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.dataset.num = id;
    button.innerText = id;
    button.addEventListener("click", (e) => {
        Array.from(buttons.children).forEach((button) => {
            if(button.dataset.num) button.classList.remove("active");
        });
        e.target.classList.add("active");
        renderContent(parseInt(e.target.dataset.num));
    });
    return button;
}


// 페이지 이동
const goPrevPage = () => {
    currentpage --;
    if (currentpage < 1) currentpage = 1;         //페이지가 1미만이 되지 않도록 보정
    render(currentpage);
};

const goNextPage = () => {
    currentpage ++;
    if (currentpage > totalpage) currentpage = totalpage;     // 페이지가 최대 페이지를 넘지 않도록 보정
    render(currentpage);
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


// 페이지 버튼 추가
const renderButton = () => {
    // 버튼 리스트 초기화
    buttons.innerHTML = "";
    const startPage = Math.max(1, currentpage - Math.floor(showButton / 2));
    const endPage = Math.min(totalpage, startPage + showButton - 1);
    for (let id = startPage; id <= endPage; id++) {
        buttons.appendChild(makeButton(id));
    }

    if (currentpage > 1) buttons.prepend(prev);
    if (currentpage < totalpage) buttons.append(next);
};

// 페이지 버튼 렌더링
const render = () => {
    renderButton();
    fetchContent();     // 페이지에 맞는 콘텐츠 로드
};

// 전체게시글 수를 count div에서 업데이트
const updateContentCount = () => {
    const countDiv = document.querySelector(".count");
    if (countDiv) {
        countDiv.textContent = `총 ${totalcontent}개의 게시물이 있습니다.`;
    }
};

updateContentCount();

// 게시글이 0개일 경우
const noData = () => {
    const messageContainer = document.querySelector(".dlalwl");

    if(totalcontent === 0) {
        const noDataDiv = document.createElement("div");
        messageContainer.innerHTML = "<tr><td colspan='6'>게시물이 없습니다.</td></tr>";
        messageContainer.classList.add("noData");
        messageContainer.appendChild(noDataDiv);
    }

    else {
        const existingNoDataDiv = document.querySelector(".noData");
        if (existingNoDataDiv) {
            existingNoDataDiv.remove(); // 기존의 noData div를 제거합니다.
        }
        import('./test.js')
        .then(module => {
            module.loadImage();
        })
        .catch(error => {
            console.error('Error loading secondScript.js:', error);
        })
    }
};
noData()


const init = async () => {
    await fetchPagination();        // 페이지네이션 정보 불러오기
    render();       // 페이지 렌더링
    renderButton(); // 페이지네이션 버튼 추가
};

init();     // 초기화 실행