function copyCode(button){

    const code =
        button.previousElementSibling.innerText;

    navigator.clipboard.writeText(code);

    button.innerText = "Copied!";

    setTimeout(()=>{
        button.innerText = "Copy";
    },1500);
}

let chatCount = 1;

function saveData(){

    localStorage.setItem(
        "titanMessages",
        document.getElementById("messages").innerHTML
    );

    localStorage.setItem(
        "titanChatList",
        document.querySelector(".chat-list").innerHTML
    );

    localStorage.setItem(
        "titanChatCount",
        chatCount
    );
}

function loadData(){

    const messages =
        localStorage.getItem("titanMessages");

    const chatList =
        localStorage.getItem("titanChatList");

    const count =
        localStorage.getItem("titanChatCount");

    if(messages){
        document.getElementById("messages").innerHTML =
            messages;
    }

    if(chatList){
        document.querySelector(".chat-list").innerHTML =
            chatList;
    }

    if(count){
        chatCount = Number(count);
    }
}

function addChatToSidebar(){

    const chatList =
        document.querySelector(".chat-list");

    chatList.innerHTML += `
        <div class="chat-item">
            Chat ${chatCount}
        </div>
    `;

    chatCount++;

    saveData();
}

function getResponse(prompt){

    const text = prompt.toLowerCase();

    if(text.includes("sword")){
        return `local Tool = Instance.new("Tool")
Tool.Name = "Sword"

local Damage = 25

print("Sword System Created")`;
    }

    if(text.includes("leaderboard")){
        return `game.Players.PlayerAdded:Connect(function(player)

    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

end)`;
    }

    if(text.includes("shop")){
        return `local ShopItems = {
    Sword = 100,
    Potion = 50,
    Shield = 200
}`;
    }

    if(text.includes("pet")){
        return `local Pet = Instance.new("Model")
Pet.Name = "StarterPet"`;
    }

    if(text.includes("datastore")){
        return `local DataStoreService =
game:GetService("DataStoreService")`;
    }

    if(text.includes("gui")){
        return `local ScreenGui =
Instance.new("ScreenGui")`;
    }

    return `Titan AI could not identify the system.`;
}

function generateResponse(){

    const prompt =
        document.getElementById("prompt").value.trim();

    if(prompt === "") return;

    const messages =
        document.getElementById("messages");

    const welcome =
        document.querySelector(".welcome");

    if(welcome){
        welcome.remove();
    }

    messages.innerHTML += `
    <div class="user-message">
        <b>You:</b><br><br>
        ${prompt}
    </div>
    `;

    messages.innerHTML += `
    <div class="ai-message" id="thinking">
        Titan AI is thinking...
    </div>
    `;

    messages.scrollTop =
        messages.scrollHeight;

    setTimeout(()=>{

        const thinking =
            document.getElementById("thinking");

        if(thinking){
            thinking.remove();
        }

        const response =
            getResponse(prompt);

        messages.innerHTML += `
        <div class="ai-message">

            <b>◈ Titan AI</b>

            <div class="code-block">
${response}
            </div>

            <button
            class="copy-btn"
            onclick="copyCode(this)">
                Copy
            </button>

        </div>
        `;

        messages.scrollTop =
            messages.scrollHeight;

        saveData();

    },1000);

    document.getElementById("prompt").value = "";
}

document.addEventListener("keydown",(e)=>{

    if(e.key === "Enter"){
        generateResponse();
    }

});

document.querySelector(".new-chat")
.addEventListener("click",()=>{

    addChatToSidebar();

    document.getElementById("messages").innerHTML = `
        <div class="welcome">
            <h1>◈ Titan AI</h1>
            <p>Your Roblox Development Partner</p>
        </div>
    `;

    saveData();
});

loadData();
