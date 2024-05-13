function openModal() {
    $('#modalWindow').fadeIn();
}

// Function to close the modal
function closeModal() {
    $('#modalWindow').fadeOut();
}

// Event listener for opening the modal
$('#openModalBtn').click(function() {
    openModal();
});

// Event listener for closing the modal
$('.dialogred_close_esh').click(function() {
    closeModal();
});