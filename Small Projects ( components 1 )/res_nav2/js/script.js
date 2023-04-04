window.onload = function(){
    const btn_hold = document.querySelector('.btn-holder')
    const mob_nav = document.querySelector('.mobile-nav')

    btn_hold.addEventListener('click', function(){
        btn_hold.classList.toggle('is_active')
        mob_nav.classList.toggle('is_active')
    })
}