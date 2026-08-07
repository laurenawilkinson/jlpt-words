import { useWords } from '@/providers/WordsProvider';
import { AppContent } from '../AppContent';
import { KnownWordItem } from './KnownWordItem';

export const KnownWordsPage = () => {
  const { knownWords, removeKnownWord } = useWords();
  const knownWordsCount = knownWords.length;

  const supportingPhrase =
    knownWordsCount >= 100
      ? 'すばらしいです'
      : knownWordsCount >= 50
        ? 'よくできました'
        : knownWordsCount >= 25
          ? 'いいですね'
          : 'がんばって';

  return (
    <AppContent>
      <div className="mx-auto w-full max-w-3xl">
        <div className="bg-matcha-100 mb-6 rounded-2xl px-8 py-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold sm:text-2xl">
                You know <span className="text-matcha">{knownWordsCount}</span>{' '}
                word
                {knownWordsCount === 1 ? '' : 's'}
              </p>
              <p className="text-foreground-secondary font-jp-sans text-lg font-medium">
                {supportingPhrase}！
              </p>
            </div>
            <img className="w-18 sm:w-24" src="/images/bonsai.png" alt="" />
          </div>
        </div>
        {knownWordsCount > 0 && (
          <div className="bg-surface border-border-soft grid grid-cols-1 rounded-2xl border sm:grid-cols-[auto_1fr_1fr_auto] sm:gap-x-6">
            {knownWords.map((word, index) => (
              <KnownWordItem
                className={index > 0 ? 'border-border-soft border-t' : ''}
                word={word}
                onRemove={() => removeKnownWord(word.id)}
              />
            ))}
          </div>
        )}
      </div>
    </AppContent>
  );
};
