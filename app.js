function copyCode(button){

    const code =
        button.previousElementSibling.innerText;

    navigator.clipboard.writeText(code);

    button.innerText = "Copied!";

    setTimeout(()=>{
        button.innerText = "Copy";
    },1500);
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

    local Coins = Instance.new("IntValue")
    Coins.Name = "Coins"
    Coins.Value = 0
    Coins.Parent = leaderstats

end)`;
    }

    if(text.includes("shop")){

        return `local ShopItems = {
    Sword = 100,
    Potion = 50,
    Shield = 200
}

print("Shop System Loaded")`;
    }

    if(text.includes("pet")){

        return `local Pet = Instance.new("Model")
Pet.Name = "StarterPet"

print("Pet System Created")`;
    }

    if(text.includes("datastore")){

        return `local DataStoreService =
game:GetService("DataStoreService")

local PlayerData =
DataStoreService:GetDataStore("PlayerData")`;
    }

    if(text.includes("gui")){

        return `local ScreenGui =
Instance.new("ScreenGui")

local Button =
Instance.new("TextButton")

Button.Text = "Click Me"`;
    }

    return `Titan AI could not identify the system.

Try:

Create a sword system

Create a leaderboard

Create a shop

Create a pet system

Create a datastore

Create a GUI`;
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

        document.getElementById("thinking").remove();

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

    },1000);

    document.getElementById("prompt").value = "";
}

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){
        generateResponse();
    }

});
