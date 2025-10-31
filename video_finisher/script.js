javascript: !async function(){
    let id = typeof cvdlit_getVideoID !== "undefined" && cvdlit_getVideoID() || document.getElementById('cvdlit-kaltura-player').getAttribute('data-id');


    if (!id) {
        alert("Error: Video ID not found.");
        return;
    }
    let num_points = 400;
    
    let data=new URLSearchParams({
        v:id,
        type:"kaltura",
        i:JSON.stringify([...Array(num_points).keys()]),
        n:num_points
    });

    for(let i=0;i<2;i++){
        let res = await fetch("?q=cvdlit/ajax/recordbar",{
            method:"POST",
            body: data
        });
        
        let resJSON;
        try {
            resJSON = await res.json();
        } catch (e) {
            console.error("Failed to parse JSON response:", e);
            if(i==1) alert("failed to receive valid response.");
            continue; 
        }

        if(resJSON.status==1){
            alert("Success! Watched progress recorded.");
            return;
        }
        else if(i==1){
            alert("Failed after 2 attempts. Try again.");
        }
    }
}()
