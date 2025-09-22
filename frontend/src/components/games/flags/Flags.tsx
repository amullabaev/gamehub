import { useState } from 'react';
import { COUNTRIES } from './countries';
import { cn, shuffle } from '@/lib/utils';

interface FlagItem {
  name: string;
  flag: string;
}

const getRandomOptions = (flags: FlagItem[], correctIdx: number, numOptions = 4): string[] => {
  const otherIndices = flags.filter((_, idx) => idx !== correctIdx);
  const wrongOptions = shuffle(otherIndices).slice(0, numOptions - 1);
  const options = [flags[correctIdx], ...wrongOptions];
  return shuffle(options).map((flag) => flag.name);
};

const Flags = () => {
  const [questionIdx, setQuestionIdx] = useState<number>(() => Math.floor(Math.random() * COUNTRIES.length));
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>(() => getRandomOptions(COUNTRIES, questionIdx));

  const question = COUNTRIES[questionIdx];

  const handleSelect = (option: string) => {
    if (showAnswer) return;
    setSelected(option);
    setShowAnswer(true);
  };

  const handleNext = () => {
    const nextIdx = Math.floor(Math.random() * COUNTRIES.length);
    setQuestionIdx(nextIdx);
    setOptions(getRandomOptions(COUNTRIES, nextIdx));
    setSelected(null);
    setShowAnswer(false);
  };

  return (
    <div className={'bg-white rounded-2xl shadow-md px-6 pt-8 pb-6 max-w-[350px] w-full flex flex-col items-center'}>
      <h2 className="text-xl font-semibold tracking-tight">Guess the Country</h2>
      <div className="flex justify-center items-center my-6 mt-6 mb-4">
        <img
          src={question.flag}
          alt="Country flag"
          className="w-[180px] h-[120px] object-contain border border-neutral-200 bg-neutral-50"
        />
      </div>
      <div className="flex flex-col gap-3 w-full mb-5">
        {options.map((option) => {
          const isCorrect = option === question.name;
          const isWrong = showAnswer && option === selected && !isCorrect;
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={showAnswer}
              className={cn(
                'w-full rounded-lg px-4 py-3 text-base font-medium shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-80',
                'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
                isCorrect && showAnswer && 'bg-green-600 text-white hover:bg-green-600',
                isWrong && 'bg-red-600 text-white hover:bg-red-600'
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {showAnswer && (
        <button
          onClick={handleNext}
          className="mt-2 inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Flags;
