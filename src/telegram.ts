import { getStorage, setStorage } from './engine/storage';
import { urlToParamsObject } from './engine/utils';

interface TelegramData {
  chat_id: string;
  name: string;
  high_score: string;
  score: string;
}

const gameServer = 'http://127.0.0.1:3000/';
const gameShortName = 'AsteroidAttk';

export const initTelegramData = (): void => {
  const urlParams = urlToParamsObject(window.location.search);
  setStorage('telegramData', urlParams);

  if (urlParams) {
    const { name, score } = urlParams;
    setStorage('name', name);
    setStorage('highScore', Number(score));
  }
  console.log('Telegram data:', urlParams);
};

export const getTelegramData = (): TelegramData | null => {
  return getStorage('telegramData');
};

export const updateHighScoreInTelegram = async (
  score: number,
): Promise<void> => {
  const data = getTelegramData();
  if (!data) {
    return;
  }
  if (score > Number(data.score)) {
    data.score = String(score);
    setStorage('telegramData', data);

    await fetch(gameServer + 'highscore/' + gameShortName, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};
