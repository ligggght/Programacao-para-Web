import Peg from './Peg';
import type { SetupGameProps } from '../../types/global';

export default function SetupGame({
  secretCode,
  setSecretCode,
  setIsBotPlaying,
  setIsBotGuessing,
  setGameSettedUp,
  canSubmitGameSetup,
  gameSettedUp,
}: SetupGameProps) {
  return (
    <>
      {!gameSettedUp ? (
        <h3 className="text-white text-lg font-bold">Configure o Código Secreto</h3>
      ) : (
        <h3 className="text-white text-lg font-bold">Código Secreto: </h3>
      )}
      <div className="grid grid-cols-4 gap-2 mb-4 items-center">
        {secretCode.map((color, pegIdx) => (
          <Peg
            key={pegIdx}
            color={color}
            enabled={!gameSettedUp}
            onChange={(newColor) => {
              const newPegs = [...secretCode];
              newPegs[pegIdx] = newColor;
              setSecretCode(newPegs);
            }}
          />
        ))}
      </div>

      {!gameSettedUp && (
        <>
          <button
            onClick={() => {
              setIsBotPlaying(true);
              setIsBotGuessing(false);
              setGameSettedUp(true);
            }}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded"
          >
            Bot Gera o Código Secreto
          </button>
          {/* apenas aparece se a senha secreta já estar configurada */}
          {canSubmitGameSetup && (
            <button
              onClick={() => {
                setIsBotPlaying(true);
                setIsBotGuessing(true);
                setGameSettedUp(true);
              }}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded"
            >
              Bot Adivinha o Código Secreto
            </button>
          )}
        </>
      )}
    </>
  );
}
