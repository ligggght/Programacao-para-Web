import Peg from './Peg';
import type { SetupGameProps } from '../../types/global';

export default function SetupGame({ secretCode, setSecretCode, enabled = true }: SetupGameProps) {
  return (
    <>
      {enabled ? (
        <h3 className="text-white text-lg font-bold">Configure o Código Secreto</h3>
      ) : (
        <h3 className="text-white text-lg font-bold">Código Secreto: </h3>
      )}
      <div className="grid grid-cols-4 gap-2 mb-4 items-center">
        {secretCode.map((color, pegIdx) => (
          <Peg
            key={pegIdx}
            color={color}
            enabled={enabled}
            onChange={(newColor) => {
              const newPegs = [...secretCode];
              newPegs[pegIdx] = newColor;
              setSecretCode(newPegs);
            }}
          />
        ))}
      </div>
    </>
  );
}
