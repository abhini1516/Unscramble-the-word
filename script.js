document.addEventListener('DOMContentLoaded', () => {
    const words = [
        ["HTML", "CODE", "DATA", "JAVA", "LOOP"],
        ["PYTHON", "ALGORITHM", "COMPILER", "VARIABLE", "NETWORK"],
        ["DATABASE", "INPUT", "INTEGER", "SYNTAX", "ARRAY"],
        ["PROTOCOL", "DEBUGGING", "LIBRARY", "PACKAGE", "BOOLEAN"],
        ["RECURSION", "ENCRYPTION", "ARCHITECTURE", "COMPILATION", "VIRTUALIZATION"]
    ];

    let currentLevel = 0;
    let currentWords = [];
    let currentWordIndex = 0;
    let attempts = 3;

    function shuffle(word) {
        const arr = word.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }

    function startLevel(level) {
        document.getElementById('level-info').textContent = `Level ${level + 1}`;
        const levelWords = words[level];
        currentWords = [];
        while (currentWords.length < 3) { // Randomly select 3 words
            const randomIndex = Math.floor(Math.random() * levelWords.length);
            currentWords.push(levelWords.splice(randomIndex, 1)[0]); // Remove selected word from levelWords
        }
        currentWordIndex = 0;
        const currentWord = currentWords[currentWordIndex];
        document.getElementById('jumbled-word').textContent = shuffle(currentWord);
        attempts = 3;
        document.getElementById('attempts-info').textContent = `Attempts left: ${attempts}`;
        document.getElementById('result').textContent = '';
        document.getElementById('guess-input').value = '';
    }

    function checkGuess() {
        const guess = document.getElementById('guess-input').value;
        if (guess === currentWords[currentWordIndex]) {
            document.getElementById('result').textContent = 'Congratulations! You guessed the word.';
            currentWordIndex++;
            if (currentWordIndex < currentWords.length) {
                // Move to the next word
                const currentWord = currentWords[currentWordIndex];
                document.getElementById('jumbled-word').textContent = shuffle(currentWord);
                attempts = 3;
                document.getElementById('attempts-info').textContent = `Attempts left: ${attempts}`;
                document.getElementById('result').textContent = '';
                document.getElementById('guess-input').value = '';
            } else {
                // Move to the next level if all words are guessed correctly
                currentLevel++;
                if (currentLevel < words.length) {
                    startLevel(currentLevel); // Start the next level
                } else {
                    // Display congratulations message after completing all levels
                    document.getElementById('result').textContent = 'Congratulations! You\'ve completed all levels.';
                    // Hide unnecessary elements
                    document.getElementById('level-info').style.display = 'none';
                    document.getElementById('jumbled-word').style.display = 'none';
                    document.getElementById('attempts-info').style.display = 'none';
                    document.getElementById('guess-input').style.display = 'none';
                    // Create a "Replay" button
                    const replayButton = document.createElement('button');
                    replayButton.textContent = 'Replay';
                    replayButton.addEventListener('click', replayGame);
                    document.getElementById('game-container').appendChild(replayButton);
                    // Remove the submit button
                    const submitButton = document.getElementById('submit-button');
                    submitButton.parentNode.removeChild(submitButton);
                }
            }
        } else {
            attempts--;
            document.getElementById('attempts-info').textContent = `Attempts left: ${attempts}`;
            if (attempts === 0) {
                document.getElementById('result').textContent = `Sorry, you've used all your attempts. The correct word was '${currentWords[currentWordIndex]}'.`;
            } else {
                document.getElementById('result').textContent = 'Wrong guess. Try again!';
            }
        }
        // Clear and focus the input field after each attempt
        document.getElementById('guess-input').value = '';
        document.getElementById('guess-input').focus();
    }
    

    function replayGame() {
        // Reset the game state and show the input field
        document.getElementById('level-info').style.display = 'block';
        document.getElementById('jumbled-word').style.display = 'block';
        document.getElementById('attempts-info').style.display = 'block';
        document.getElementById('guess-input').style.display = 'block';
        document.getElementById('result').textContent = '';
        currentLevel = 0;
        startLevel(currentLevel);
        // Remove the replay button
        const replayButton = document.querySelector('button');
        replayButton.parentNode.removeChild(replayButton);
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            checkGuess();
        }
    }

    document.getElementById('guess-input').addEventListener('keypress', handleKeyPress);

    startLevel(currentLevel); // Start the first level
    
    // Add event listener to submit button
    document.getElementById('submit-button').addEventListener('click', checkGuess);
});
