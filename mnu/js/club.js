document.addEventListener('DOMContentLoaded', function(){
    const departmentButtons = document.querySelectorAll('.department button');
    const clubImage = document.getElementById('clubImage');
    const clubText = document.getElementById('clubText');
    const clubIcon = document.querySelector('.clubIconImage');

    const clubData = {
        infosec: {
            image: 'images/infosec-image.jpg',
            text: '정보보호학과동아리 1',
            icon: 'icon.png'
        },

        software: {
            image: 'images/software-image.jpg',
            text: '융합소프트웨어학과동아리 1',
            icon: 'icon.png'
        },

        computer: {
            image: 'images/computer-image.jpg',
            text: '컴퓨터공학과동아리 1',
            icon: 'icon.png'
        }
    };

    function setDefaulClub() {
        const defaultData = clubData.infosec;
        clubImage.src = defaultData.image;
        clubText.textContent = defaultData.text;
    }
    setDefaulClub();

    departmentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const department = this.getAttribute('data-department');
            const data = clubData[department];

            if(data) {
                clubImage.src = data.image;
                clubText.textContent = data.text;
            }
        })
    })
});