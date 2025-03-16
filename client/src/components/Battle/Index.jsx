import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BattleControls from "./BattleControls";
import Modal from "./Modal";
import PokemonCard from "./PokemonCard";
import SaveScore from "./SaveScore";
import toast, { Toaster } from "react-hot-toast";
import usePokemon from "../../hooks/usePokemon";
import usePageTitle from "../../hooks/usePageTitle";
import Loading from "../common/Loading";
import {
  calculateDamage,
  updateHealth,
  checkBattleOver,
} from "../../utils/battleUtils";

const Battle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pokemon, opponent, loadNewOpponent } = usePokemon(id);
  const [playerHp, setPlayerHp] = useState(0);
  const [opponentHp, setOpponentHp] = useState(0);
  const [playerMoveCounter, setPlayerMoveCounter] = useState(0);
  const [opponentMoveCounter, setOpponentMoveCounter] = useState(0);
  const [isBattleOver, setIsBattleOver] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSaveScore, setShowSaveScore] = useState(false);
  const [battleResult, setBattleResult] = useState("");
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isActionInProgress, setIsActionInProgress] = useState(false);

  usePageTitle(
    pokemon ? `Battle - ${pokemon.name.english}` : "Pokefight - Battle"
  );

  useEffect(() => {
    if (pokemon && opponent) {
      setPlayerHp(pokemon.base.HP);
      setOpponentHp(opponent.base.HP);
    }
  }, [pokemon, opponent]);

  const endBattle = (result) => {
    setBattleResult(result);
    setIsBattleOver(true);
    setShowModal(true);
    if (result === "You won!") {
      setTotalScore((prevScore) => prevScore + (opponent?.base?.HP || 0));
    }
  };

  const playerMove = (moveType) => {
    if (isBattleOver || !isPlayerTurn || isActionInProgress) return;

    setIsActionInProgress(true);

    let damage = 0;
    switch (moveType) {
      case "Attack":
        damage = calculateDamage(pokemon.base.Attack, opponent.base.Defense);
        updateHealth(setOpponentHp, opponentHp, opponent.base.HP, -damage);
        setPlayerMoveCounter((prev) => prev + 1);
        toast.success(`You attacked and dealt ${damage} damage!`);
        break;
      case "Special":
        if (playerMoveCounter >= 2) {
          damage =
            calculateDamage(
              pokemon.base["Sp. Attack"],
              opponent.base["Sp. Defense"]
            ) * 2.5;
          updateHealth(setOpponentHp, opponentHp, opponent.base.HP, -damage);
          setPlayerMoveCounter(0);
          toast.success(`Special attack! You dealt ${damage} damage!`);
        } else {
          toast.error("Not enough moves for special attack!");
          setIsActionInProgress(false);
          return;
        }
        break;
      case "Heal":
        const healAmount = Math.floor(pokemon.base.HP * 0.15);
        updateHealth(setPlayerHp, playerHp, pokemon.base.HP, healAmount);
        setPlayerMoveCounter((prev) => prev + 1);
        toast.success(`You healed ${healAmount} HP!`);
        break;
    }

    if (checkBattleOver(opponentHp - damage, playerHp)) {
      endBattle(opponentHp - damage <= 0 ? "You won!" : "You lost!");
    } else {
      setIsPlayerTurn(false);
      setIsActionInProgress(false);
    }
  };

  const opponentMove = () => {
    if (isBattleOver) return;

    setIsActionInProgress(true);

    let moveType;
    let damage = 0;

    const healThreshold = opponent.base.HP * 0.3;
    if (opponentHp < healThreshold && Math.random() < 0.5) {
      const healAmount = Math.floor(opponent.base.HP * 0.2);
      updateHealth(setOpponentHp, opponentHp, opponent.base.HP, healAmount);
      toast.error(`Opponent healed ${healAmount} HP!`);
      moveType = "Heal";
    } else {
      if (opponentMoveCounter >= 2 && Math.random() < 0.6) {
        moveType = "Special";
        damage =
          calculateDamage(
            opponent.base["Sp. Attack"],
            pokemon.base["Sp. Defense"]
          ) * 2.5;
        setOpponentMoveCounter(0);
      } else {
        moveType = "Attack";
        damage = calculateDamage(opponent.base.Attack, pokemon.base.Defense);
        setOpponentMoveCounter((prev) => prev + 1);
      }

      updateHealth(setPlayerHp, playerHp, pokemon.base.HP, -damage);
      toast.error(
        `Opponent used ${
          moveType === "Special" ? "special attack" : "attack"
        } and dealt ${damage} damage!`
      );
    }

    if (checkBattleOver(opponentHp, playerHp - damage)) {
      endBattle(playerHp - damage <= 0 ? "You lost!" : "You won!");
    } else {
      setIsPlayerTurn(true);
      setIsActionInProgress(false);
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && !isActionInProgress && !isBattleOver) {
      const timer = setTimeout(opponentMove, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, isActionInProgress, isBattleOver]);

  const closeModal = () => {
    setShowModal(false);
    if (battleResult === "You won!") {
      loadNewOpponent();
      setPlayerMoveCounter(0);
      setOpponentMoveCounter(0);
      setIsBattleOver(false);
      setIsPlayerTurn(true);
      setIsActionInProgress(false);
    } else {
      setShowSaveScore(true);
    }
  };

  const handleSaveScoreClose = () => {
    setShowSaveScore(false);
    navigate("/");
  };

  if (!pokemon || !opponent) return <Loading />;

  return (
    <div className="flex h-screen">
      <div className="container m-auto px-4 py-8">
        <Toaster position="top-center" />
        <h1 className="text-3xl font-bold mb-6">Pokemon Battle</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PokemonCard
            pokemon={pokemon}
            hp={playerHp}
            maxHp={pokemon.base.HP}
            isPlayer={true}
          />
          <PokemonCard
            pokemon={opponent}
            hp={opponentHp}
            maxHp={opponent.base.HP}
            isPlayer={false}
          />
        </div>

        <div className="mt-8">
          <BattleControls
            onAttack={() => playerMove("Attack")}
            onSpecialAttack={() => playerMove("Special")}
            onHeal={() => playerMove("Heal")}
            specialMoveCounter={playerMoveCounter}
            isBattleOver={isBattleOver}
            isPlayerTurn={isPlayerTurn}
            isActionInProgress={isActionInProgress}
          />
        </div>

        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            {isPlayerTurn ? (
              <div className="flex items-center animate-pulse">
                <span className="text-yellow-300 text-xl mr-2">👉</span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text font-bold text-lg">
                  YOUR TURN
                </span>
                <span className="text-yellow-300 text-xl ml-2">👈</span>
              </div>
            ) : isActionInProgress ? (
              <div className="flex items-center">
                <span className="text-red-400 text-xl mr-2 animate-bounce">
                  ⚡
                </span>
                <span className="text-gray-300 font-bold text-lg">
                  OPPONENT IS THINKING...
                </span>
                <div className="ml-2 flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-red-500 text-xl mr-2 animate-ping">
                  🔥
                </span>
                <span className="bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text font-bold text-lg">
                  OPPONENT'S TURN
                </span>
                <span className="text-red-500 text-xl ml-2 animate-ping">
                  🔥
                </span>
              </div>
            )}
          </div>

          {isBattleOver && (
            <p className="text-xl font-bold mt-2 bg-gradient-to-r from-yellow-300 to-red-500 text-transparent bg-clip-text">
              {battleResult}
            </p>
          )}

          <div className="mt-2 bg-gray-700 p-2 rounded-lg inline-block">
            <span className="text-gray-300">Total Score: </span>
            <span className="text-yellow-300 font-bold">{totalScore}</span>
          </div>
        </div>

        <Modal
          show={showModal}
          onClose={closeModal}
          hideCloseButton={battleResult === "You won!"}
        >
          <h2 className="text-2xl font-bold mb-4">{battleResult}</h2>
          {battleResult === "You won!" && (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={closeModal}
            >
              Next Opponent
            </button>
          )}
          {battleResult === "You lost!" && (
            <div className="text-xl">Your total score: {totalScore}</div>
          )}
        </Modal>

        {showSaveScore && (
          <SaveScore score={totalScore} onClose={handleSaveScoreClose} />
        )}
      </div>
    </div>
  );
};

export default Battle;
