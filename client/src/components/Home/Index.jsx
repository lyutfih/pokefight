import { Link } from "react-router-dom";
import OrbitingCircles from "../common/OrbitingCircles";
import AnimatedGradientText from "../common/AnimatedGradientText";
import { cn } from "../../utils/themeUtils";
import Icons from "./Icons";
import PokemonList from "../PokemonList/Index";
import usePageTitle from "../../hooks/usePageTitle";

const Home = () => {
  usePageTitle("Pokefight - Home");

  return (
    <>
      <div className="min-h-screen">
        <div className="relative flex min-h-[75vh] mt-6 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background max-sm:p-10">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-r  from-blue-950 via-blue-500 to-blue-950 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent max-sm:text-6xl">
            POKEFIGHT
          </span>

          <OrbitingCircles
            className="size-[30px] border-none bg-transparent"
            duration={20}
            delay={20}
            radius={70}
          >
            <Icons.balbasaur />
          </OrbitingCircles>
          <OrbitingCircles
            className="size-[30px] border-none bg-transparent"
            duration={20}
            delay={10}
            radius={140}
          >
            <Icons.ditto />
          </OrbitingCircles>

          <OrbitingCircles
            className="size-[50px] border-none bg-transparent"
            radius={210}
            duration={20}
            reverse
          >
            <Icons.pikachu />
          </OrbitingCircles>
          <OrbitingCircles
            className="size-[50px] border-none bg-transparent"
            radius={280}
            duration={20}
            delay={20}
            reverse
          >
            <Icons.voltorb />
          </OrbitingCircles>
        </div>
        <div className="-z-0 flex min-h-32 items-center justify-center max-sm:flex-col gap-4">
          <div
            className={cn(
              "group rounded-lg  border shadow-lg border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-slate-900 dark:hover:bg-slate-800"
            )}
          >
            <a href="#main">
              <AnimatedGradientText>
                <span
                  className={cn(
                    `inline animate-gradient text-base bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  💥 {"    "} Select Your Pokemon
                </span>
              </AnimatedGradientText>
            </a>
          </div>
          <div
            className={cn(
              "group rounded-lg  border shadow-lg border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-slate-900 dark:hover:bg-slate-800"
            )}
          >
            <Link to="/leaderboard">
              <AnimatedGradientText>
                <span
                  className={cn(
                    `inline animate-gradient text-base bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  🏆 {"    "} Leaderboard
                </span>
              </AnimatedGradientText>
            </Link>
          </div>
        </div>
      </div>
      <PokemonList />
    </>
  );
};

export default Home;
