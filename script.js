document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const words = [
        { word: 'happy', synonyms: ['joyful', 'elated', 'sad'] },
        { word: 'fast', synonyms: ['quick', 'slow', 'rapid'] },
        // Add more words and synonyms as needed
    ];

    let currentWordIndex = 0;
    let score = 0;

    function displayWord() {
        const wordObj = words[currentWordIndex];
        const synonymButtons = wordObj.synonyms.map(synonym => {
            return `<button class="synonym-button">${synonym}</button>`;
        }).join('');

        gameContainer.innerHTML = `
            <h2>Word: ${wordObj.word}</h2>
            <div>${synonymButtons}</div>
            <p>Score: ${score}</p>
        `;

        document.querySelectorAll('.synonym-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const correct = wordObj.synonyms[0] === e.target.innerText;
                e.target.style.backgroundColor = correct ? 'green' : 'red';

                document.querySelectorAll('.synonym-button').forEach(btn => {
                    if (btn.innerText === wordObj.synonyms[0]) {
                        btn.style.backgroundColor = 'green';
                    } else if (!correct) {
                        btn.style.backgroundColor = 'red';
                    }
                });

                setTimeout(() => {
                    if (correct) score++;
                    currentWordIndex++;
                    if (currentWordIndex < words.length) {
                        displayWord();
                    } else {
                        gameContainer.innerHTML = `<h2>Game Over! Final Score: ${score}</h2>`;
                    }
                }, 2000);
            });
        });
    }

    displayWord();
});
