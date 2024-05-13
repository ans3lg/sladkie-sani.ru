document.addEventListener('DOMContentLoaded', function() {
    var openModalBtn = document.getElementById('openCustomModalBtn');
    var modal = document.querySelector('.dialogred_modal[data-theme="commeronline_ng"]');
    
    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', openCustomModal);
    }

    function openCustomModal() {
        modal.style.display = 'block';
        document.body.classList.add('body_dialogred_inner_show');
    }
});