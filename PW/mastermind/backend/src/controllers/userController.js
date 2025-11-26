import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    const { username, password, avatarSeed, avatarStyle } = req.body;

    if (!username || !password || !avatarSeed || !avatarStyle) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    // Evita duplicado
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ error: 'Usuário já existe' });
    }

    // Hash seguro
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      passwordHash,
      avatarSeed,
      avatarStyle,
    });

    res.status(201).json({ message: 'Usuário criado', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificação de dados
    if (!username || !password) {
      return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    // Procura o usuário
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Compara a senha enviada com o hash salvo
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Login ok — poderia gerar token aqui
    res.status(200).json({
      message: 'Login bem-sucedido',
      userId: user._id,
      avatarSeed: user.avatarSeed,
      avatarStyle: user.avatarStyle,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, password, avatarSeed, avatarStyle } = req.body;

    // validar ID
    if (!userId) {
      return res.status(400).json({ error: 'ID do usuário é obrigatório.' });
    }

    // busca usuário
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Atualiza username (se enviado)
    if (username) {
      const userExists = await User.findOne({ username });
      if (userExists && userExists._id.toString() !== userId) {
        return res.status(400).json({ error: 'Nome de usuário já está em uso.' });
      }
      user.username = username;
    }

    // Atualiza senha (se enviada)
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(password, salt);
    }

    // Avatar (opcionais)
    if (avatarSeed !== undefined) user.avatarSeed = avatarSeed;
    if (avatarStyle !== undefined) user.avatarStyle = avatarStyle;

    // salva tudo
    await user.save();

    res.status(200).json({
      message: 'Usuário atualizado com sucesso.',
      userId: user._id,
      username: user.username,
      avatarSeed: user.avatarSeed,
      avatarStyle: user.avatarStyle,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
