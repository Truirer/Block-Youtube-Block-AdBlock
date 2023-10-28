// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.


const youtubeAddRemover= () => {
    console.log('Url Changed')

    const isPlayerLoaded = ()=>{
        const player = document.body.querySelector('yt-playability-error-supported-renderers')

        if(player){
            window.clearInterval(isPlayerLoadedInterval)
    
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const videoHash = urlParams.get('v')
    
            player.innerHTML = 
            '<iframe width="420" height="315" style="width:100%;height:100%;position:absolute" id="youtubeBlockAddBlockBlocker"'
            +'src="https://www.youtube.com/embed/'+videoHash+'">'
            +'</iframe>'
        }
    
    }
    
    const isPlayerLoadedInterval = window.setInterval(isPlayerLoaded,1000)
}

let previousUrl = 'https://www.youtube.com/';
const observer = new MutationObserver(function(mutations) {
  if (location.href !== previousUrl && location.href !== ' https://www.youtube.com/') {
      previousUrl = location.href;
      console.log(`URL changed to ${location.href}`);
      youtubeAddRemover()
    }
});
const config = {subtree: true, childList: true};
observer.observe(document, config);
