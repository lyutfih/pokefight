import React from "react";

const BattleControls = ({
  onAttack,
  onSpecialAttack,
  onHeal,
  specialMoveCounter,
  isBattleOver,
  isPlayerTurn,
  isActionInProgress,
}) => {
  const canUseSpecial = specialMoveCounter >= 2;
  const isDisabled = isBattleOver || !isPlayerTurn || isActionInProgress;

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded disabled:opacity-50 mr-2 mt-4"
        onClick={onAttack}
        disabled={isDisabled}
      >
        Attack
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded disabled:opacity-50 mr-2 mt-4"
        onClick={onSpecialAttack}
        disabled={isDisabled || !canUseSpecial}
      >
        Special Attack
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded disabled:opacity-50 mt-4"
        onClick={onHeal}
        disabled={isDisabled}
      >
        Heal
      </button>
    </div>
  );
};

export default BattleControls;
