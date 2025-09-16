// Acredito que usar uma classe (para ter diferentes dificuldades instanciadas) seja mais interessante do que usar apenas funções

import { PEG_COLORS } from '@/consts/consts';
import type { RowType, FeedbackType, PegColor } from '@/types/global';

export class EasyMastermindBot {
  isGuessing: boolean;
  secretCode: PegColor[] = [];

  constructor(isGuessing: boolean) {
    // Inicialização do bot
    this.isGuessing = isGuessing;
  }

  makeGuess(previousGuesses: RowType[]): PegColor[] {
    if (previousGuesses.length === 0) {
      // Primeira jogada, chute aleatório
      return this.getRandomGuess();
    }
    const lastGuess = previousGuesses[previousGuesses.length - 1];
    const correctNumber = lastGuess.feedback.reduce(
      (acc, fb) => acc + (fb === 'correct' ? 1 : 0),
      0,
    );

    // um switch case com casos iguais para que no futuro possamos criar novas estratégias
    switch (correctNumber) {
      case 0:
        return this.getRandomGuess();
      case 1:
        return this.keepCorrectNumber(lastGuess, correctNumber);
      case 2:
        return this.keepCorrectNumber(lastGuess, correctNumber);
      case 3:
        return this.keepCorrectNumber(lastGuess, correctNumber);
      case 4:
        console.log('não deveria chegar aqui');
        // Acertou o código
        return lastGuess.pegs;
      default:
        return this.getRandomGuess();
    }
  }

  getRandomGuess(): PegColor[] {
    const availableColors = PEG_COLORS;
    const guess: PegColor[] = [];
    while (guess.length < 4) {
      const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
      guess.push(randomColor);
    }
    return guess;
  }

  // Se acertou 3, mantem 3 e aleatoriza uma cor, apenas observa a ultima jogada
  keepCorrectNumber(lastGuess: RowType, correctToKeep: number): PegColor[] {
    const newGuess: PegColor[] = [...lastGuess.pegs]
      .sort(() => 0.5 - Math.random())
      .slice(0, correctToKeep);

    const availableColors = PEG_COLORS;
    while (newGuess.length < 4) {
      const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
      newGuess.push(randomColor);
    }
    return newGuess;
  }

  generateRandomPassword(): PegColor[] {
    this.secretCode = this.getRandomGuess();
    return this.secretCode;
  }

  giveFeedback(lastGuessPegs: PegColor[]): FeedbackType[] {
    const feedback: FeedbackType[] = Array(4).fill('wrong');

    // Para que casos como:
    // Segredo: [vermelho, azul, verde, amarelo]
    // Chute:   [vermelho, vermelho, azul, roxo]
    // Não retornem 1 "correct" e 1 "wrong-position" para os vermelhos,
    // mas sim 1 "correct" e 1 "wrong"
    // Precisamos marcar quais posições já foram usadas para feedback
    const secretUsed = Array(4).fill(false);
    const guessUsed = Array(4).fill(false);

    // 1ª passada: marcar "correct"
    for (let i = 0; i < 4; i++) {
      if (lastGuessPegs[i] === this.secretCode[i]) {
        feedback[i] = 'correct';
        secretUsed[i] = true;
        guessUsed[i] = true;
      }
    }

    // 2ª passada: marcar "wrong-position"
    for (let i = 0; i < 4; i++) {
      if (!guessUsed[i]) {
        for (let j = 0; j < 4; j++) {
          if (!secretUsed[j] && lastGuessPegs[i] === this.secretCode[j]) {
            feedback[i] = 'wrong-position';
            secretUsed[j] = true;
            guessUsed[i] = true;
            break;
          }
        }
      }
    }

    // Embaralhar o feedback para não dar pistas sobre a posição
    return feedback.sort(() => Math.random() - 0.5);
  }
}
