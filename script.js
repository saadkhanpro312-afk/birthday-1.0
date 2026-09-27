
const app = document.getElementById('app');
const bar = document.getElementById('bar');
let step = 0, hearts = 0, choice = '', giftPicked = false;

const bg = document.getElementById('bg');

for (let i = 0; i < 24; i++) {
    let e = document.createElement('span');
    e.className = 'float';
    e.textContent = ['♡', '✦', '🐾', '🌸'][i % 4];
    e.style.left = (i * 43 % 100) + '%';
    e.style.animationDuration = (10 + i % 9) + 's';
    e.style.animationDelay = (-i * 1.9) + 's';
    bg.appendChild(e);
}

function show(html) {
    app.className = 'stage';
    app.innerHTML = html;
    bar.style.width = (step / 4 * 100) + '%';
}

function next() {
    step++;
    render();
}

function celebrate() {
    for (let i = 0; i < 75; i++) {
        const e = document.createElement('span');
        e.className = 'confetti';
        e.textContent = ['💗', '🌸', '✨', '🎀', '💕'][i % 5];
        e.style.left = Math.random() * 100 + 'vw';
        e.style.fontSize = (14 + Math.random() * 22) + 'px';
        e.style.animationDelay = Math.random() * 1.6 + 's';
        document.body.appendChild(e);
        setTimeout(() => e.remove(), 4800);
    }
}

function render() {

    // WELCOME SCREEN
    if (step === 0) {
        show(`
            <div class="cat">🐱🎀</div>
            <h1>pspsps... Sara! 💗</h1>
            <p>You've been summoned by the Birthday Kitty Committee.</p>
            <p>There's a special birthday card waiting for you...
            but first, you must complete
            <b>3 extremely important kitty missions</b>! 🐾</p>
            <button onclick="next()">Accept the mission 🐈</button>
        `);
    }

    // MISSION 1
    if (step === 1) {
        show(`
            <div class="cat">😽</div>
            <h2>Mission 1: Kitty vibes</h2>
            <p>Which of these is the correct birthday energy?</p>

            <div class="choices">
                <button class="choice" onclick="choose(this,'sleepy')">
                    😴 Sleepy potato
                </button>
                <button class="choice" onclick="choose(this,'queen')">
                    👑 Birthday queen
                </button>
                <button class="choice" onclick="choose(this,'chaos')">
                    🐈 Chaotic little cat
                </button>
            </div>

            <p id="feedback" class="muted">
                The kitty is judging your answer... 👀
            </p>

            <button id="continue" style="display:none" onclick="next()">
                Next mission →
            </button>
        `);
    }

    // MISSION 2
    if (step === 2) {
        hearts = 0;

        show(`
            <div class="cat">🐈</div>
            <h2>Mission 2: Collect the love!</h2>
            <p>Catch <b>7 hearts</b> for the birthday kitty.
            Tap the hearts before they move!</p>

            <p><b id="count">0 / 7</b> 💕</p>

            <div class="game" id="game"></div>

            <button id="heartNext" style="display:none" onclick="next()">
                Hearts delivered! →
            </button>
        `);

        spawnHeart();
    }

    // MISSION 3
    if (step === 3) {
        giftPicked = false;

        show(`
            <div class="cat">🎁</div>
            <h2>Mission 3: Pick a present</h2>
            <p>One of these boxes contains the magic key to your
            birthday card. Choose wisely... or just pick the cutest one!</p>

            <div class="gifts">
                <button class="gift" onclick="pickGift(this)">🎁</button>
                <button class="gift" onclick="pickGift(this)">🎀</button>
                <button class="gift" onclick="pickGift(this)">💝</button>
            </div>

            <p id="giftMsg" class="muted">
                The kitty believes in you 🐾
            </p>

            <button id="giftNext" style="display:none" onclick="next()">
                Unlock my card 🔓
            </button>
        `);
    }

    // BIRTHDAY CARD UNLOCKED
    if (step === 4) {
        celebrate();

        show(`
            <div class="cat">🥳</div>
            <h1>YOU DID IT, SARA!!</h1>

            <p>The Birthday Kitty Committee proudly presents
            your special delivery...</p>

            <button onclick="openCard()">
                💌 Open your birthday card
            </button>
        `);
    }
}

function choose(el, val) {
    choice = val;

    document.querySelectorAll('.choice').forEach(b => {
        b.classList.remove('selected');
    });

    el.classList.add('selected');

    document.getElementById('feedback').textContent =
        val === 'queen'
            ? 'CORRECT! 👑 (The other answers were also correct, obviously.)'
            : val === 'chaos'
                ? 'Certified kitty energy! 🐈✨'
                : 'Sleepy queens deserve birthdays too! 💗';

    document.getElementById('continue').style.display = 'inline-block';
}

function spawnHeart() {
    let game = document.getElementById('game');

    if (!game || hearts >= 7) return;

    game.innerHTML = '';

    let b = document.createElement('button');
    b.className = 'heart';
    b.textContent = ['💗', '💕', '💖', '💝'][hearts % 4];
    b.setAttribute('aria-label', 'Collect heart');

    b.style.left = (8 + Math.random() * 75) + '%';
    b.style.top = (8 + Math.random() * 65) + '%';

    b.onclick = () => {
        hearts++;

        document.getElementById('count').textContent = hearts + ' / 7';

        if (hearts === 7) {
            game.innerHTML = `
                <div style="font-size:75px;margin:55px auto">
                    😻💖
                </div>
            `;

            document.getElementById('heartNext').style.display = 'inline-block';
        } else {
            spawnHeart();
        }
    };

    game.appendChild(b);
}

function pickGift(el) {
    if (giftPicked) return;

    giftPicked = true;
    el.classList.add('good');
    el.textContent = '🔑';

    document.getElementById('giftMsg').innerHTML =
        '✨ You found the magic key! (Psst... they all had one. You deserve presents.)';

    document.getElementById('giftNext').style.display = 'inline-block';
}

// SHORT BIRTHDAY MESSAGE FOR SARA 💗
function openCard() {
    celebrate();

    show(`
        <span class="envelope">💌</span>

        <div class="letter">
            <h2>Happy Birthday, Sara! 🎂💗</h2>

            <p>Hey Sara!</p>

            <p>
                Since I can't be there, I made you this little surprise.
                Hope the birthday kitties weren't too annoying 😭🐱
            </p>

            <p>
                Wishing you lots of happiness, laughter, and amazing
                memories this year. Hope this little gift made you smile!
            </p>

            <p>
                <b>Happy Birthday! Enjoy your special day! 💗🎀</b>
            </p>

            <p style="text-align:right">
                — Shadow 🐾
            </p>
        </div>

        <button onclick="celebrate()">
            More confetti! 🎉
        </button>

        <button class="secondary" onclick="step=0;render()">
            Play again 🐱
        </button>
    `);

    bar.style.width = '100%';
}

render();