export type PegColor = 'vermelho' | 'azul' | 'verde' | 'amarelo' | 'roxo' | 'laranja' | 'default';

export type RowType = {
  pegs: PegColor[];
  feedback: FeedbackType[];
};
export type BoardProps = {
  rows: RowType[];
  guessingRow: RowType;
  setGuessingRow: (row: RowType) => void;
  editingFeedback: FeedbackType[];
  setEditingFeedback: (feedback: FeedbackType[]) => void;
  awaitingFeedback: boolean;
  isPlayerGuessing: boolean;
  secretCode: PegColor[];
};
export type SetupGameProps = {
  secretCode: PegColor[];
  setSecretCode: (code: PegColor[]) => void;
  setIsBotPlaying: (isBot: boolean) => void;
  setIsBotGuessing: (isBotGuessing: boolean) => void;
  setGameSettedUp: (isSettedUp: boolean) => void;
  canSubmitGameSetup: boolean;
  gameSettedUp: boolean;
};
export type FeedbackPegProps = {
  type: FeedbackType;
  onChange: (color: FeedbackType) => void;
};
export type FeedbackType = 'correct' | 'wrong-position' | 'wrong' | 'empty';
