function removeAds() {

    // Retrieve all 'span' elements on the page
    let spans = document.getElementsByTagName("span");

    for (let i = 0; i < spans.length; ++i) {
        // Check if they contain the text 'Promoted'
        if (spans[i].innerHTML === "Promoted") {
            // Find the div that encapsulates the entire advertisement
            let card = spans[i].closest(".feed-shared-update-v2");

            // If the class has changed and closest() doesn't find it, navigate up 6 levels
            if (card === null) {
                // Alternatively: card.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode :D
                let j = 0;
                card = spans[i];
                while (j < 6) {
                    card = card.parentNode;
                    ++j;
                }
            }

            // Hide the advertisement
            card.setAttribute("style", "display: none !important;");
        }
    }
}

removeAds();

// Ensures ads will be removed as the user continues to scroll
setInterval(function () {
    removeAds();
}, 100);
