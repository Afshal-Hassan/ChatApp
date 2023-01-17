import React, { useEffect } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

function Video() {
    

    useEffect(()=>{
        localStorage.setItem("isReloaded",JSON.stringify(false));
    })

    const syncMeeting = async(element) => {
        const appID = 1166166214
        const serverSecret = "f19c63b99e11fe23232bcce2da95e47a"
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,"afshal1",Date.now().toString(),"Afshal Hassan")
        const zegoCloud = ZegoUIKitPrebuilt.create(kitToken)
        zegoCloud.joinRoom({
            container: element,
            scenario: ZegoUIKitPrebuilt.OneONoneCall,
            sharedLinks:[
                {
                    name:"Copy Link",
                    url: `http://localhost/video/afshal1`
                }
            ],
            
          
        })
    }
    
  return (
    <div style={{height:"100vh",width:"100%"}} >
        <div ref={syncMeeting} style={{height:"100vh",width:"100%"}}/>
    </div>
  )
}

export default Video