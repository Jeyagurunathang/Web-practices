window.onload = function(){
    const btnOpen = document.querySelector('.btn-open')

    const btnClose = document.querySelectorAll('.btn-close')

    const modal_container = document.querySelector('.modal-container')
    
    btnOpen.addEventListener('click', function(){
        modal_container.classList.add('show')
    })

    btnClose.forEach(btn=>{
        btn.addEventListener('click', function(){
            modal_container.classList.remove('show')
        })
    })
}