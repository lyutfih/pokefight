import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLeaderboard } from "../../utils/api";
import { cn } from "../../utils/themeUtils";
import AnimatedGradientText from "../common/AnimatedGradientText";
import usePageTitle from "../../hooks/usePageTitle";
import Loading from "../common/Loading";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  // Set the page title
  usePageTitle("Pokefight - Leaderboard");

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await fetchLeaderboard();
        setLeaderboard(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch leaderboard data");
        setLoading(false);
        console.error("Error fetching leaderboard:", err);
      }
    };

    getLeaderboard();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-4 mb-8">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Top Trainers
        </h2>

        {leaderboard.length === 0 ? (
          <p className="text-center text-gray-300">
            No scores recorded yet. Be the first!
          </p>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="py-2 px-4 text-left">Rank</th>
                  <th className="py-2 px-4 text-left">Trainer</th>
                  <th className="py-2 px-4 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr
                    key={entry._id}
                    className={`border-t border-gray-600 ${
                      index < 3 ? "text-yellow-300" : "text-gray-300"
                    }`}
                  >
                    <td className="py-2 px-4 font-bold">{index + 1}</td>
                    <td className="py-2 px-4">{entry.playerName}</td>
                    <td className="py-2 px-4 text-right">{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Link to="/">
        <AnimatedGradientText>
          <span
            className={cn(
              `inline animate-gradient text-base bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            ← {"    "} Return to Pokemon Selection
          </span>
        </AnimatedGradientText>
      </Link>
    </div>
  );
};

export default Leaderboard;
