#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Function to swap characters
void swap(char *a, char *b) {
    char temp = *a;
    *a = *b;
    *b = temp;
}

// Function to jumble a word
void jumbleWord(char *word) {
    int length = strlen(word);
    for (int i = 0; i < length; i++) {
        int randomIndex = rand() % length;
        swap(&word[i], &word[randomIndex]);
    }
}

// Function to play one level
int playLevel(char *word) {
    char jumbledWord[strlen(word) + 1];
    strcpy(jumbledWord, word);
    jumbleWord(jumbledWord);

    char guess[100];
    int attempts = 3;

    printf("Guess the word: %s\n", jumbledWord);

    while (attempts > 0) {
        printf("Your guess: ");
        scanf("%99s", guess);


        if (strcmp(guess, word) == 0) {
            printf("Congratulations! You guessed the word.\n");
            return 1;
        } else {
            attempts--;
            printf("Wrong guess. You have %d attempts left.\n", attempts);
        }
    }

    printf("Sorry, you've used all your attempts. The word was '%s'.\n", word);
    return 0;
}

int main() {
    // Seed the random number generator
    srand(time(0));

    // Words for each level
    char *level1[] = {"HTML", "CODE", "DATA","JAVA","LOOP"};
    char *level2[] = {"PYTHON", "ALGORITHM", "COMPILER","VARIABLE","NETWORK"};
    char *level3[] =  {"DATABASE", "INPUT", "INTEGER","SYNTAX","ARRAY"};
    char *level4[] = {"PROTOCOL", "DEBUGGING", "LIBRARY","PACKAGE","BOOLEAN"};
    char *level5[] = {"RECURSION", "ENCRYPTION", "ARCHITECTURE","COMPILATION","VIRTUALIZATION"};

    // Levels array
    char **levels[] = {level1, level2, level3, level4, level5};
    int levelSizes[] = {5, 5, 5, 5, 5}; // Number of words in each level
    int numLevels = sizeof(levelSizes) / sizeof(levelSizes[0]);
     int numWordsPerLevel = 3;

    // Play each level
    for (int i = 0; i < numLevels; i++) {
        printf("Level %d\n", i + 1);
        int playedIndices[numWordsPerLevel];
        for (int j = 0; j < numWordsPerLevel; j++) {
            int wordIndex;
            do {
                wordIndex = rand() % levelSizes[i];
                int alreadyPlayed = 0;
                for (int k = 0; k < j; k++) {
                    if (playedIndices[k] == wordIndex) {
                        alreadyPlayed = 1;
                        break;
                    }
                }
                if (!alreadyPlayed) {
                    playedIndices[j] = wordIndex;
                    break;
                }
            } while (1);

            if (!playLevel(levels[i][wordIndex])) {
                printf("Game Over! You did not pass level %d.\n", i + 1);
                return 0;
            }
        }
        printf("You've completed level %d!\n\n", i + 1);
    }

    printf("Congratulations! You've completed all levels.\n");
    return 0;
}
    
