const editor = document.getElementById('editor')
const btnBold = document.getElementById('btn-bold');
const btnItalic = document.getElementById('btn-italic');
const btnUnderline = document.getElementById('btn-underline');
const btnStrike = document.getElementById('btn-strike');
const btnOrderedList = document.getElementById('btn-ordered-list');
const btnUnorderedList = document.getElementById('btn-unordered-list');

// 버튼 클릭했을 때 글에서 일어나는 이벤트
btnBold.addEventListener('click', function(){
    setStyle('bold');
});

btnItalic.addEventListener('click',function(){
    setStyle('italic');
});

btnUnderline.addEventListener('click',function(){
    setStyle('underline');
});

btnStrike.addEventListener('click',function(){
    setStyle('strikeThrough');
});

btnOrderedList.addEventListener('click',function(){
    setStyle('insertOrderedList');
});

btnUnorderedList.addEventListener('click',function(){
    setStyle('insertUnorderedList');
});

// 버튼 클릭했을 때 버튼에 발생하는 이벤트
editor.addEventListener('keydown', function() {
    checkStyle();
});

editor.addEventListener('mousedown',function(){
    checkStyle();
});


function setStyle(style) {
    document.execCommand(style);
    focusEditor();
    checkStyle();
}

// 버튼을 클릭하면 에디터가 포커스를 잃기 때문에 에디터에 다시 포커스를 설정해주는 코드
function focusEditor() {
    editor.focus({prevenScroll: true});
}

//=======================================================


function checkStyle() {
    if (isStyle('bold')) {
        btnBold.classList.add('active');
    } else {
        btnBold.classList.remove('active');
    }

    if (isStyle('italic')) {
        btnItalic.classList.add('active');
    } else {
        btnItalic.classList.remove('active');
    }

    if (isStyle('underline')) {
        btnUnderline.classList.add('active');
    } else {
        btnUnderline.classList.remove('active');
    }

    if (isStyle('strikeThrough')) {
        btnStrike.classList.add('active');
    } else {
        btnStrike.classList.remove('active');
    }

    if (isStyle('insertOrderedList')) {
        btnOrderedList.classList.add('active');
    } else {
        btnOrderedList.classList.remove('active');
    }

    if (isStyle('insertUnorderedList')) {
        btnUnorderedList.classList.add('active');
    } else {
        btnUnorderedList.classList.remove('active');
    }
}

function isStyle(style) {
    return document.queryCommandState(style);
}