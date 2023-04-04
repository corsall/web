const reaction = document.querySelector('.reaction');
const memory = document.querySelector('.memory');
const verbal = document.querySelector('.verbal');
const visual = document.querySelector('.visual');

const avgResult = document.querySelector('.avg-result');

async function drawScore(){
    const response = await fetch('/summary');
    const data = await response.json();
    reaction.textContent = data['reaction'];
    memory.textContent = data['memory'];
    verbal.textContent = data['verbal'];
    visual.textContent = data['visual'];

    avgResult.textContent = Math.floor(Object.entries(data).reduce((a, [key, value]) => a + value, 0) / 4);
}

drawScore();