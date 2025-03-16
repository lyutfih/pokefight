import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveScore } from "../../utils/api";

const SaveScore = ({ score, onClose }) => {
  const [playerName, setPlayerName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!playerName.trim()) {
      setError("Please enter your name");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      await saveScore(playerName, score);

      setSaved(true);
      setIsSaving(false);

      setTimeout(() => {
        navigate("/leaderboard");
      }, 2000);
    } catch (err) {
      setError("Failed to save your score. Please try again.");
      setIsSaving(false);
      console.error("Error saving score:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          {saved ? "Score Saved!" : "Save Your Score"}
        </h2>

        {saved ? (
          <div className="text-center">
            <p className="text-green-400 mb-4">
              Your score has been saved successfully!
            </p>
            <p className="text-gray-300 mb-6">Redirecting to leaderboard...</p>
            <button
              onClick={() => navigate("/leaderboard")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              View Leaderboard Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-yellow-300 text-xl font-bold text-center mb-4">
                Your Score: {score}
              </p>

              <label className="block text-gray-300 mb-2" htmlFor="playerName">
                Enter Your Name:
              </label>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                maxLength={20}
                disabled={isSaving}
              />

              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Score"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SaveScore;
