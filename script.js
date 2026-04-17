const chat = document.getElementById("chat");
const buttons = document.getElementById("buttons");

////////////////////////////////////////////////////
//// QUOTES
////////////////////////////////////////////////////

const quotes =
      [
        "You are still here. That matters.",
        "Small steps are still steps.",
        "You don't have to do everything today.",
        "Breathe. Begin again.",
        "Even today can be gentle.",
        "Every morning is a new page.",
        "Even slow progress is progress.",
        "You made it to another day."
      ];

function randomQuote()
{
  return quotes[Math.floor(Math.random() * quotes.length)];
}

////////////////////////////////////////////////////
//// VOICE
////////////////////////////////////////////////////

function speak(text)
{
  const speech = new SpeechSynthesisUtterance(text);
  
  speech.rate = 0.9;
  speech.pitch = 1;
  
  speechSynthesis.speak(speech);
}

////////////////////////////////////////////////////
//// MESSAGE FUNCTIONS
////////////////////////////////////////////////////

function addBotMessage(text)
{
  const msg = document.createElement("div");
  msg.className = "bot";
  msg.textContent = text;
  
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
  
  speak(text);
}

function addUserMessage(text)
{
  const msg = document.createElement("div");
  msg.className = "user";
  msg.textContent = text;
  
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

////////////////////////////////////////////////////
//// BUTTON SYSTEM
////////////////////////////////////////////////////

function showButtons(list)
{
  buttons.innerHTML = "";
  
  list.forEach(item =>
  {
    const btn = document.createElement("button");
    btn.textContent = item.text;
    
    btn.onclick = () =>
    {
      addUserMessage(item.text);
      item.action();
    }
    
    buttons.appendChild(btn);
  });
}

////////////////////////////////////////////////////
//// JOURNAL INPUT
////////////////////////////////////////////////////

function showInput()
{
  buttons.innerHTML = "";
  
  const input = document.createElement("input");
  input.placeholder = "Write how you feel...";
  input.style.padding = "10px";
  input.style.marginTop = "10px";
  input.style.width = "100%";
  
  const send = document.createElement("button");
  send.textContent = "Send";
  
  send.onclick = () =>
  {
    const text = input.value;
    
    if(text.trim() !== "")
    {
      addUserMessage(text);
      addBotMessage("Thank you for sharing that. I'm here with you.");
      
      buttons.innerHTML = "";
    }
  }
  
  buttons.appendChild(input);
  buttons.appendChild(send);
}

////////////////////////////////////////////////////
//// APP START
////////////////////////////////////////////////////

function start()
{
  addBotMessage(randomQuote());
  
  showButtons(
    [
      {text:"Good morning", action:morningStart},
      {text:"Hi", action:hiStart}
    ]);
}

////////////////////////////////////////////////////
//// MORNING FLOW
////////////////////////////////////////////////////

function morningStart()
{
  addBotMessage("You are awake. Good girl.");
  addBotMessage("Wash your face and brush your teeth.");
  
  showButtons(
    [
      {text:"I washed up", action:washed},
      {text:"I don't feel like it", action:dontFeel}
    ]);
}

function washed()
{
  addBotMessage("That's my girl.");
  addBotMessage("Let's dress up and face the day.");
  addBotMessage("Wear something sexy, gorgeous.");
  
  buttons.innerHTML = "";
}

function dontFeel()
{
  addBotMessage("That's okay.");
  addBotMessage("Let's do something small.");
  addBotMessage("Open and close your left hand five times.");
  
  showButtons(
    [
      {text:"Left hand done", action:leftHand}
    ]);
}

function leftHand()
{
  addBotMessage("Good girl.");
  addBotMessage("Now try opening and closing your fingers on your right hand.");
  
  showButtons(
    [
      {text:"Right hand done", action:rightHand}
    ]);
}

function rightHand()
{
  addBotMessage("Good.");
  addBotMessage("Try putting your feet on the ground.");
  
  showButtons(
    [
      {text:"Feet on ground", action:feet}
    ]);
}

function feet()
{
  addBotMessage("Good.");
  addBotMessage("Now try opening those curtains. Even a small peek will do.");
  
  showButtons(
    [
      {text:"Curtains opened", action:curtains}
    ]);
}

function curtains()
{
  addBotMessage("That's my girl.");
  addBotMessage("A small start is still a start.");
  addBotMessage("Now go conquer that day.");
  
  buttons.innerHTML = "";
}

////////////////////////////////////////////////////
//// MIDDAY SUPPORT FLOW
////////////////////////////////////////////////////

function hiStart()
{
  addBotMessage("Hello. How are you feeling?");
  
  showButtons(
    [
      {text:"Not so good.", action:notGood}
    ]);
}

function notGood()
{
  addBotMessage("Do you want to talk about it?");
  showButtons(
    [
      {text:"Yes", action:journal},
      {text:"No", action:stretchStart}
    ]);
}

////////////////////////////////////////////////////
//// JOURNAL OPTION
////////////////////////////////////////////////////

function journal()
{
  addBotMessage("I'm listening (unsaved).");
  
  showInput();
}

////////////////////////////////////////////////////
//// STRETCH FLOW
////////////////////////////////////////////////////

function stretchStart()
{
  addBotMessage("That's okay.");
  addBotMessage("Let's do something small.");
  addBotMessage("Open and close your left hand five times.");
  
  showButtons(
    [
      {text:"Left hand stretch done", action:stretchRight}
    ]);
}

function stretchRight()
{
  addBotMessage("Good.");
  addBotMessage("Now stretch your right hand.");

showButtons(
  [
    {text:"Right hand done", action:armsUp}
  ]);
}

function armsUp()
{
  addBotMessage("Now raise your arms above your head.");
  
  showButtons(
    [
      {text:"Done", action:fullStretch}
    ]);
}

function fullStretch()
{
  addBotMessage("Now stretch your whole body while lying down.");
  
  showButtons(
    [
      {text:"Finished", action:stretchEnd}
    ]);
}

function stretchEnd()
{
  addBotMessage("That's my girl.");
  addBotMessage("Small steps still count.");
  
  buttons.innerHTML = "";
}

start();
