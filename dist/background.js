(()=>{async function e(e){const t=(await new Promise((e=>{chrome.storage.local.get("jwtToken",(t=>{e(t)}))}))).jwtToken;if(!t)return sendResponse({authenticated:!1});try{const s=await fetch(`https://linkedai.onrender.com/api/v1/users/collection/${e}`,{method:"DELETE",headers:{authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if((await s.json()).success)return!0}catch(e){}}async function t(e,t){const s=(await new Promise((e=>{chrome.storage.local.get("jwtToken",(t=>{e(t)}))}))).jwtToken;if(!s)return sendResponse({authenticated:!1});try{const a=await fetch(`https://linkedai.onrender.com/api/v1/users/collection/${e}/post/${t}`,{method:"DELETE",headers:{authorization:`Bearer ${s}`,"Content-Type":"application/json"}});if((await a.json()).success)return!0}catch(e){}}chrome.runtime.onMessage.addListener((function(e,t,s){if("checkAuthentication"===e.action)return async function(e){try{const t=(await new Promise((e=>{chrome.storage.local.get("jwtToken",(t=>{e(t)}))}))).jwtToken;if(!t)return e({authenticated:!1});const s=await fetch("http://localhost:8000/api/v1/users/checkAuth",{method:"GET",headers:{authorization:`Bearer ${t}`}});200===s.status?e({data:await s.json(),authenticated:!0}):e({authenticated:!1})}catch(t){e({authenticated:!1})}}(s),!0})),chrome.runtime.onMessage.addListener((function(e,t,s){"addDashboard"===e.action&&chrome.tabs.query({active:!0,currentWindow:!0},(function(e){const t=e[0];chrome.tabs.sendMessage(t.id,{action:"callAddDashboardFunction"})}))})),chrome.runtime.onMessage.addListener((function(e,t,s){if("checkEmailExists"===e.action)return async function(e,t,s){try{const a=await fetch("https://linkedai.onrender.com/api/v1/users/checkemail",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,profileLink:s})});200===a.status?e({data:await a.json(),success:!0}):400===a.status&&e({success:!1})}catch(t){e({success:!1})}}(s,e.name,e.profileLink),!0})),chrome.runtime.onMessage.addListener((function(e,t,s){if("sendOTP"===e.action)return async function(e,t){try{const s=await fetch(`https://linkedai.onrender.com/api/v1/user/otp/${t}`,{method:"POST",headers:{"Content-Type":"application/json"}});200===s.status?e({success:!0}):400===s.status?e({success:!1}):429===s.status&&e({success:!1,tooManyRequests:!0})}catch(t){e({success:!1})}}(s,e.email),!0})),chrome.runtime.onMessage.addListener((function(e,t,s){if("addLeaderboard"===e.action)return async function(e){try{const t=(await new Promise((e=>{chrome.storage.local.get("jwtToken",(t=>{e(t)}))}))).jwtToken;if(!t)return e({authenticated:!1});const s=await fetch("https://linkedai.onrender.com/api/v1/users/users",{method:"GET",headers:{authorization:`Bearer ${t}`}});200===s.status?e({data:await s.json(),success:!0}):e({success:!1})}catch(t){e({success:!1})}}(s),!0})),chrome.runtime.onMessage.addListener((function(e,t,s){if("addToGuestUser"===e.action)return async function(e,t,s,a,n){try{const o="https://linkedai.onrender.com/api/v1/users/addtoguestuser",c=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({otp:e,name:t,profileLink:s,email:a})});if(200===c.status)n({data:await c.json(),success:!0});else{const e=await c.json();400===c.status&&!0===e.invalidOTP?n({invalidOTP:!0,success:!1}):400===c.status&&!0===e.alreadyExists?n({alreadyExists:!0,success:!1}):n({internalServerError:!0,success:!1})}}catch(e){n({success:!1})}}(e.otp,e.name,e.profileLink,e.email,s),!0})),chrome.runtime.onMessage.addListener((function(e,t,s){if("updateActiveDays"===e.action)return async function(e,t,s){const a=(await new Promise((e=>{chrome.storage.local.get("jwtToken",(t=>{e(t)}))}))).jwtToken;if(!a)return s({authenticated:!1});try{const n="https://linkedai.onrender.com/api/v1/users/daysactive",o=await fetch(n,{method:"POST",headers:{authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({activeDays:e,currentStreak:t})});200===o.status?s({data:await o.json(),success:!0}):s({success:!1})}catch(e){s({success:!1})}}(e.daysActive,e.currentStreak,s),!0})),chrome.runtime.onMessage.addListener((function(e,t,s){if("updateProfileVisibility"===e.action)return async function(e,t){const s=(await new Promise((e=>{chrome.storage.local.get("jwtToken",(t=>{e(t)}))}))).jwtToken;if(!s)return t({authenticated:!1});try{const a="https://linkedai.onrender.com/api/v1/users/lbprofilevisibility",n=await fetch(a,{method:"POST",headers:{authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({leaderBoardProfileVisibility:e})}),o=await n.json();200===n.status?t({data:o,success:!0}):429==n.status?t({success:!1,error:"Too many request try again after 1 min"}):t({success:!1})}catch(e){t({success:!1})}}(e.profileVisibility,s),!0})),chrome.runtime.onMessage.addListener((function(e,t,s){if("updatePostTagging"===e.action)return async function(e,t){const s=(await new Promise((e=>{chrome.storage.local.get("jwtToken",(t=>{e(t)}))}))).jwtToken;if(!s)return t({authenticated:!1});try{const a="http://localhost:8000/api/v1/users/tagPost",n=await fetch(a,{method:"POST",headers:{authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({tagPost:e})}),o=await n.json();200===n.status?t({data:o,success:!0}):429==n.status?t({success:!1,error:"Too many request try again after 1 min"}):t({success:!1})}catch(e){t({success:!1})}}(e.tagPostTopic,s),!0})),chrome.runtime.onMessage.addListener((function(e,t,s){if("checkserver"===e.action)return async function(e){try{200===(await fetch("https://linkedai.onrender.com/api/v1/users/checkserver",{method:"GET"})).status?e({awake:!0}):e({awake:!1})}catch(t){e({awake:!1})}}(s),!0})),chrome.runtime.onMessage.addListener((function(e,t,s){if("logoutUser"===e.action)return function(e){chrome.storage.local.clear((function(){chrome.runtime.lastError?e({loggedOut:!1}):e({loggedOut:!0})}))}(s),!0})),chrome.runtime.onMessage.addListener((function(e,t,s){if("addEmail"===e.action)return addemail(e.email,s),!0})),chrome.runtime.onMessage.addListener((function(e,t,s){if("getUserCollections"===e.action)return async function(e){const t=(await new Promise((e=>{chrome.storage.local.get("jwtToken",(t=>{e(t)}))}))).jwtToken;if(!t)return e({authenticated:!1});try{const s="https://linkedai.onrender.com/api/v1/users/browsecollections",a=await fetch(s,{method:"GET",headers:{authorization:`Bearer ${t}`,"Content-Type":"application/json"}});200===a.status?e({data:await a.json(),success:!0}):e({success:!1})}catch(t){e({success:!1})}}(s),!0})),chrome.runtime.onMessage.addListener((function(e,t,s){if("addToUserCollections"===e.action){const{collectionId:t,collectionName:a,postURL:n,postDescription:o}=e;return async function(e,t,s,a,n){const o=(await new Promise((e=>{chrome.storage.local.get("jwtToken",(t=>{e(t)}))}))).jwtToken;if(!o)return n({authenticated:!1});try{const c="https://linkedai.onrender.com/api/v1/users/addtocollection",i=await fetch(c,{method:"POST",headers:{authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({collectionId:e,collectionName:t,postURL:s,postDescription:a})});200===i.status?n({data:await i.json(),success:!0}):n({success:!1})}catch(e){n({success:!1})}}(t,a,n,o,s),!0}})),chrome.runtime.onMessage.addListener(((s,a,n)=>"deleteCollection"===s.action?(e(s.collectionId).then((e=>{n({success:e})})).catch((e=>{n({success:!1,error:e.message})})),!0):"deletePostFromCollection"===s.action?(t(s.collectionId,s.postId).then((e=>{n({success:e})})).catch((e=>{n({success:!1,error:e.message})})),!0):void 0)),chrome.runtime.onMessage.addListener((function(e,t,s){if("analyzePost"===e.action)return async function(e,t){try{chrome.storage.local.get("jwtToken",(async s=>{const a=s.jwtToken;if(a)try{const s="http://localhost:8000/api/v1/posts/analyze",n=await fetch(s,{method:"POST",headers:{authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify(e)});if(n.ok){const e=await n.json();t({data:e,success:!0})}else{const e=await n.json();t({success:!1,error:e})}}catch(e){t({success:!1,error:e.message})}else t({authenticated:!1,success:!1})}))}catch(e){t({success:!1,error:e.message})}}(e.data,s),!0}))})();