export const calculateDamage = (attack, defense) => {
    const baseDamage = Math.max(1, Math.floor(attack * (50 / (100 + defense))));
    return Math.floor(baseDamage * (0.85 + Math.random() * 0.15));
  };
  
  export const updateHealth = (setHealth, currentHealth, maxHealth, change) => {
    setHealth((prevHealth) => Math.max(0, Math.min(maxHealth, prevHealth + change)));
  };
  
  export const checkBattleOver = (playerHp, opponentHp) => {
    return playerHp <= 0 || opponentHp <= 0;
  };