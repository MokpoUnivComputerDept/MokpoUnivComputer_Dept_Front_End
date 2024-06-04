document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // 이벤트 위임을 사용하여 버튼 클릭 이벤트 처리
    document.body.addEventListener('click', function(event) {
        // 상세보기 버튼 클릭 이벤트
        if (event.target.classList.contains('btn-detail')) {
            console.log('btn-detail clicked');
            const detailInfo = event.target.closest('.thumb-li').querySelector('.detail-info');
            if (detailInfo) {
                console.log('detail-info found:', detailInfo);
                detailInfo.classList.add('on');
                console.log('on class added');
            } else {
                console.log('detail-info not found');
            }
        }
        
        // 닫기 버튼 클릭 이벤트 (btn-close-detail 또는 btn-close)
        if (event.target.classList.contains('btn-close-detail') || event.target.classList.contains('btn-close')) {
            console.log('close button clicked');
            const detailInfo = event.target.closest('.detail-info');
            if (detailInfo) {
                console.log('detail-info found:', detailInfo);
                detailInfo.classList.remove('on');
                console.log('on class removed');
            } else {
                console.log('detail-info not found');
            }
        }
        if (event.target.classList.contains('.pageNavigationBtn')){
            var buttons = document.querySelectorAll('.pageNavigationBtn');
            buttons.forEach(function(button) {
                button.addEventListener('click', function() {
                    var siblingUl = button.nextElementSibling;
                    if (siblingUl.style.display === 'none' || siblingUl.style.display === '') {
                        siblingUl.style.display = 'block';
                    } else {
                        siblingUl.style.display = 'none';
                    }
                });
            });
        }
    });

    // 페이지 네비게이션 버튼 클릭 이벤트 처리
    

    // 스크롤링 동작 처리
    let myDiv = document.querySelector('.wrap_page_func');
    let goTop = document.querySelector('.goTop');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop === 0) {
            // At the top of the page
            myDiv.classList.remove('hidden');
            goTop.classList.add('hidden');
        } else {
            // Not at the top of the page
            myDiv.classList.add('hidden');
            goTop.classList.remove('hidden');
        }

        lastScrollTop = scrollTop; // Update last scroll position
    });

    goTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

function searchProfessors() {
    const searchInput = document.getElementById('srchWrd');
    const srchColumn = document.getElementById('srchColumn');
    const searchTerm = searchInput.value.toLowerCase();
    const searchCriterion = srchColumn.value;
    const professorsList = document.querySelector('.thumb-ul');
    const professors = professorsList.querySelectorAll('.thumb-li');

    let wrap = null;
    professorsList.innerHTML = '';
    let count = 0;
    let last = true;
    let matchesSearch = false;

    professors.forEach((professor, index) => {
        const professorName = professor.querySelector('.info strong').textContent.toLowerCase();
        const professorPosition = professor.querySelector('.info dl:nth-of-type(1) dd').textContent;
        if (searchCriterion === 'nm') {
            matchesSearch = professorName.includes(searchTerm);
        } else {
            matchesSearch = professorPosition.includes(searchTerm);
        }

        if (matchesSearch) {
            count++;
            professor.style.display = 'table-cell';
        } else {
            professor.style.display = 'none';
        }

        if (count % 2 !== 0 && last) {
            console.log("wrap 생성")
            last = false;
            wrap = document.createElement('div');
            wrap.classList.add('wrap');
            professorsList.appendChild(wrap);
        }
        
        if (matchesSearch) {
            console.log(count)
            if (count % 2 === 0){
                console.log("짝수")
                last = true
                wrap.appendChild(professor.cloneNode(true));
            }else{
                console.log("홀수")
                wrap.appendChild(professor.cloneNode(true));
            }
        }
        
    });
    if (count === 0) {
        console.log("nodata")
        const noResults = document.createElement('li');
        noResults.classList.add('noData');
        noResults.textContent = '등록된 내용이(가) 없습니다.';
        professorsList.appendChild(noResults);
    }

}
