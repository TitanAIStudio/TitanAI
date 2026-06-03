function copyCode(button){

    const code =
        button.previousElementSibling.innerText;

    navigator.clipboard.writeText(code);

    button.innerText = "Copied!";

    setTimeout(()=>{
        button.innerText = "Copy";
    },1500);
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

        let response =
`local Tool = Instance.new("Tool")
Tool.Name = "Sword"

local Damage = 25

print("Titan AI Generated Script")`;

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
