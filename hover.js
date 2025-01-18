document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.classList.toggle('card-hover');
        });

        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.classList.remove('card-hover');
            }, 2000); // Remove hover effect after 2 seconds
        });
    });
});