import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import logo from "./assets/Logo.svg";
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';

import "./styles/main.css";
import axios from 'axios';

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  }
}

export function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => 
    setGames(response.data))
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu {" "}
        <span className="text-transparent bg-nlw-gratient bg-clip-text">
          duo {" "}
        </span>
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">

      {
        games.map(game => (
          <GameBanner 
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))
      }
      </div>
      <Dialog.Root>
       <CreateAdBanner />
      <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}
