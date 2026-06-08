const lines = [
  "Are you a stethoscope? Because my heart races every time you come close.",
  "You’re the reason my heart skips beats — possible arrhythmia? Only you can diagnose.",
  "If cuteness were a vital sign, you’d be critically adorable.",
  "They taught us to check reflexes — I checked mine and smiled when I saw you."
];

// photo filenames in HBD/photos (relative to this HTML file: ../photos/...)
const photos = ['p5.jpeg','p3.jpeg','p4.jpeg','priya1.jpeg'];
const heroBg = 'double.jpeg';

const main = document.querySelector('.snap-container');
const footer = document.querySelector('.footer');

function createCardSection(text, bgFilename, isSpecial = false){
  const section = document.createElement('section');
  section.className = 'card-section';
  // set background with a subtle overlay
  section.style.background = `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.12)), url('photos/${bgFilename}') center/cover no-repeat`;
  const card = document.createElement('div');
  card.className = 'card' + (isSpecial ? ' special' : '');
  const p = document.createElement('p');
  p.textContent = text;
  card.appendChild(p);
  section.appendChild(card);
  // insert before footer so each card is a direct child of .snap-container
  main.insertBefore(section, footer);
  return {section, card};
}

// set hero background to double.jpeg
const hero = document.querySelector('.hero');
if(hero){
  hero.style.background = `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.12)), url('photos/${heroBg}') center/cover no-repeat`;
}

// render only requested cards and map photos (one per scroll)
lines.forEach((t, i) => {
  const isSpecial = (i === lines.length - 1);
  const photo = photos[i] || photos[photos.length - 1];
  createCardSection(t, photo, isSpecial);
});

// IntersectionObserver to reveal cards
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target.querySelector('.card');
      if (card) card.classList.add('visible');
    }
  });
}, {threshold: 0.5});

document.querySelectorAll('.card-section').forEach((s, idx, list) => {
  obs.observe(s);
  // attach confetti to last card on click
  if (idx === list.length - 1) {
    const card = s.querySelector('.card');
    if (card) card.addEventListener('click', () => launchConfetti(60), {once: true});
  }
});

// confetti simple
function launchConfetti(amount = 40){
  for(let i=0;i<amount;i++){
    const el = document.createElement('div');
    el.className = 'confetti';
    el.style.left = Math.random()*100 + '%';
    el.style.top = (-20 + Math.random()*10) + 'vh';
    el.style.background = `hsl(${Math.random()*360} 80% 60%)`;
    el.style.animationDelay = (Math.random()*400)+'ms';
    el.style.width = (6+Math.random()*10)+'px';
    el.style.height = (8+Math.random()*12)+'px';
    el.style.borderRadius = (2+Math.random()*4) + 'px';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 3500);
  }
}

// EmailJS setup
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

// Function to send email
async function sendEmail(buttonChoice) {
  const templateParams = {
    to_email: "kartikchikenakoppa@gmail.com",
    button_choice: buttonChoice,
    timestamp: new Date().toLocaleString()
  };

  try {
    await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

// date buttons
const yesBtn = document.getElementById('yesBtn');
const nahBtn = document.getElementById('nahBtn');

if(yesBtn){
  yesBtn.addEventListener('click', async ()=>{
    yesBtn.textContent = '😍 Yay! See you then!';
    yesBtn.disabled = true;
    nahBtn.disabled = true;
    await sendEmail('YES');
    launchConfetti(80);
  });
}

if(nahBtn){
  nahBtn.addEventListener('click', async ()=>{
    nahBtn.textContent = '😔 No worries, crush those books!';
    nahBtn.disabled = true;
    yesBtn.disabled = true;
    await sendEmail('NO');
  });
}
