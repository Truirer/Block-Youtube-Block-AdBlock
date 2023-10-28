
This repository contains a simple chrome extension to move around Youtube's recent adblock changes. 

It uses Youtube embed in order to remove video view limit with adblock. 

```
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
```

**yt-playability-error-supported-renderers** is the container element name for the error code generated for the youtube view limit. If it exists add embed file in it to render youtube video using embed system.

Then add an observer to detect url changes to change the video you want to load with embed. 

```

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

```

Keep in mind that since this is using youtube embed system it is not going to last forever. # Block-Youtube-Block-AdBlock
