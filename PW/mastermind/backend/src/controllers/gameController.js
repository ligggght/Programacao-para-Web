import Game from '../models/Game.js';

// Criar nova partida
export const createGame = async (req, res) => {
  try {
    const { playerId, secretCode } = req.body;

    if (!playerId || !secretCode || !Array.isArray(secretCode) || secretCode.length !== 4) {
      return res.status(400).json({
        error: 'Dados inválidos. Forneça playerId e secretCode (array de 4 cores)',
      });
    }

    // Gera ID único para o jogo
    const gameId = Math.random().toString(36).substring(2, 9);

    const newGame = await Game.create({
      gameId,
      player1: playerId,
      secretCodePlayer1: secretCode,
      status: 'waiting',
    });

    res.status(201).json({
      gameId: newGame.gameId,
      playerNumber: 1,
      message: 'Partida criada com sucesso. Aguardando segundo jogador...',
    });
  } catch (err) {
    console.error('Erro ao criar partida:', err);
    res.status(500).json({ error: 'Erro ao criar partida' });
  }
};

// Entrar em uma partida existente
export const joinGame = async (req, res) => {
  try {
    const { gameId, playerId } = req.body;

    if (!gameId || !playerId) {
      return res.status(400).json({
        error: 'Dados inválidos. Forneça gameId e playerId',
      });
    }

    const game = await Game.findOne({ gameId });

    if (!game) {
      return res.status(404).json({ error: 'Partida não encontrada' });
    }

    if (game.player2) {
      return res.status(400).json({ error: 'Partida já está cheia' });
    }

    if (game.player1.toString() === playerId) {
      return res.status(400).json({ error: 'Você já está nesta partida' });
    }

    game.player2 = playerId;
    game.status = 'playing';
    game.currentTurn = 'player2'; // Player2 começa fazendo a primeira jogada
    await game.save();

    res.status(200).json({
      success: true,
      playerNumber: 2,
      currentTurn: game.currentTurn,
      message: 'Entrou na partida com sucesso. Você começa jogando!',
    });
  } catch (err) {
    console.error('Erro ao entrar na partida:', err);
    res.status(500).json({ error: 'Erro ao entrar na partida' });
  }
};

// Obter estado da partida
export const getGameState = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { playerId } = req.query;

    if (!playerId) {
      return res.status(400).json({ error: 'playerId é obrigatório' });
    }

    const game = await Game.findOne({ gameId });

    if (!game) {
      return res.status(404).json({ error: 'Partida não encontrada' });
    }

    const playerNumber =
      game.player1.toString() === playerId ? 1 : game.player2?.toString() === playerId ? 2 : 0;

    if (playerNumber === 0) {
      return res.status(403).json({ error: 'Você não está nesta partida' });
    }

    const isMyTurn =
      (playerNumber === 1 && game.currentTurn === 'player1') ||
      (playerNumber === 2 && game.currentTurn === 'player2');

    // Retorna informações apropriadas
    res.status(200).json({
      gameId: game.gameId,
      status: game.status,
      currentTurn: game.currentTurn,
      isMyTurn,
      playerNumber,
      hasOpponent: !!game.player2,
      rows: game.rows,
      winner: game.winner,
      secretCode: playerNumber === 1 ? game.secretCodePlayer1 : null,
    });
  } catch (err) {
    console.error('Erro ao obter estado da partida:', err);
    res.status(500).json({ error: 'Erro ao obter estado da partida' });
  }
};

// Submeter jogada
export const submitGuess = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { playerId, pegs } = req.body;

    if (!playerId || !pegs || !Array.isArray(pegs) || pegs.length !== 4) {
      return res.status(400).json({
        error: 'Dados inválidos. Forneça playerId e pegs (array de 4 cores)',
      });
    }

    const game = await Game.findOne({ gameId });

    if (!game) {
      return res.status(404).json({ error: 'Partida não encontrada' });
    }

    if (game.status !== 'playing') {
      return res.status(400).json({ error: 'Partida não está em andamento' });
    }

    const playerNumber =
      game.player1.toString() === playerId ? 1 : game.player2?.toString() === playerId ? 2 : 0;

    if (playerNumber === 0) {
      return res.status(403).json({ error: 'Você não está nesta partida' });
    }

    // CORREÇÃO: Apenas o Jogador 2 pode fazer jogadas (adivinhar)
    if (playerNumber !== 2) {
      return res.status(403).json({ error: 'Apenas o Jogador 2 pode fazer jogadas' });
    }

    // Verifica se é a vez do jogador 2
    if (game.currentTurn !== 'player2') {
      return res.status(400).json({ error: 'Não é sua vez de jogar' });
    }

    // Adiciona a jogada
    game.rows.push({
      pegs,
      feedback: [],
      player: 'player2', // Sempre player2 fazendo jogadas
    });

    // Muda o turno para o player1 dar feedback
    game.currentTurn = 'player1';

    await game.save();

    res.status(200).json({
      success: true,
      waitingForFeedback: true,
      message: 'Jogada registrada. Aguardando feedback do Jogador 1...',
    });
  } catch (err) {
    console.error('Erro ao submeter jogada:', err);
    res.status(500).json({ error: 'Erro ao submeter jogada' });
  }
};

// Submeter feedback
export const submitFeedback = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { playerId, feedback } = req.body;

    if (!playerId || !feedback || !Array.isArray(feedback) || feedback.length !== 4) {
      return res.status(400).json({
        error: 'Dados inválidos. Forneça playerId e feedback (array de 4 tipos)',
      });
    }

    const game = await Game.findOne({ gameId });

    if (!game) {
      return res.status(404).json({ error: 'Partida não encontrada' });
    }

    if (game.status !== 'playing') {
      return res.status(400).json({ error: 'Partida não está em andamento' });
    }

    if (game.rows.length === 0) {
      return res.status(400).json({ error: 'Não há jogadas para dar feedback' });
    }

    const playerNumber =
      game.player1.toString() === playerId ? 1 : game.player2?.toString() === playerId ? 2 : 0;

    if (playerNumber === 0) {
      return res.status(403).json({ error: 'Você não está nesta partida' });
    }

    // CORREÇÃO: Apenas o Jogador 1 pode dar feedback
    if (playerNumber !== 1) {
      return res.status(403).json({ error: 'Apenas o Jogador 1 pode dar feedback' });
    }

    // Verifica se é a vez do jogador 1 dar feedback
    if (game.currentTurn !== 'player1') {
      return res.status(400).json({ error: 'Não é sua vez de dar feedback' });
    }

    const lastRow = game.rows[game.rows.length - 1];

    // Verifica se já existe feedback
    if (lastRow.feedback && lastRow.feedback.length > 0) {
      return res.status(400).json({ error: 'Feedback já foi dado para esta jogada' });
    }

    // Atualiza o feedback
    lastRow.feedback = feedback;

    // Verifica vitória
    const isWin = feedback.every((fb) => fb === 'correct');
    if (isWin) {
      game.status = 'finished';
      game.winner = 'player2'; // Player2 venceu
      await game.save();

      return res.status(200).json({
        success: true,
        gameStatus: 'finished',
        winner: 'player2',
        message: 'Jogador 2 venceu!',
      });
    }

    // Verifica máximo de tentativas
    const MAX_TURNS = 10;
    const player2Attempts = game.rows.filter((r) => r.player === 'player2').length;

    if (player2Attempts >= MAX_TURNS) {
      game.status = 'finished';
      game.winner = 'player1'; // Player1 venceu (player2 não conseguiu adivinhar)
      await game.save();

      return res.status(200).json({
        success: true,
        gameStatus: 'finished',
        winner: 'player1',
        message: 'Jogador 2 atingiu o máximo de tentativas. Jogador 1 venceu!',
      });
    }

    // Alterna o turno de volta para player2 fazer outra jogada
    game.currentTurn = 'player2';
    await game.save();

    res.status(200).json({
      success: true,
      gameStatus: game.status,
      currentTurn: game.currentTurn,
      message: 'Feedback registrado. Vez do Jogador 2.',
    });
  } catch (err) {
    console.error('Erro ao submeter feedback:', err);
    res.status(500).json({ error: 'Erro ao submeter feedback' });
  }
};
