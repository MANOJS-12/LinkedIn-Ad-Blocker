/*
    This function triggers when the browser has committed to loading a webpage.
    Unlike webNavigation.onCompleted, this initiates early execution
    to promptly begin removing advertisements.
*/
chrome.webNavigation.onCommitted.addListener(function (tab) {
    // Prevents script execution when other frames load
    if (tab.frameId == 0) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {

            // Retrieve the URL of the webpage
            let url = tabs[0].url;
            // Strip unnecessary protocol prefixes and www subdomain from the URL
            let parsedUrl = url.replace("https://", "").replace("http://", "").replace("www.", "")

            // Trim paths and queries e.g. linkedin.com/feed or linkedin.com?query=value
            // Extract only the base domain
            let domain = parsedUrl.slice(0, parsedUrl.indexOf('/') == -1 ? parsedUrl.length : parsedUrl.indexOf('/')).slice(0, parsedUrl.indexOf('?') == -1 ? parsedUrl.length : parsedUrl.indexOf('?'));

            try {
                if (domain.length < 1 || domain === null || domain === undefined) {
                    return;
                } else if (domain == "linkedin.com") {
                    runLinkedinScript();
                    return;
                }
            } catch (err) {
                throw err;
            }

        });
    }
});


function runLinkedinScript() {
    // Inject script content from a file into the webpage
    chrome.tabs.executeScript({
        file: 'linkedin.js'
    });
    return true;
}
