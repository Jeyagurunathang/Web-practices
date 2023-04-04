window.onload = function(){
    const btn = document.querySelector('.right-bar')
    const sidebar = document.querySelector('.mobile-nav')
    btn.addEventListener('click', function(){
        btn.classList.toggle('is-active')
        sidebar.classList.toggle('is-active')
    })
}