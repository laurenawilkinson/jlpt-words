import { useWords } from '@/providers/WordsProvider';
import { AppContent } from '../AppContent';
import { WordListItem } from '../UI/WordList/WordListItem';
import { WordList } from '../UI/WordList/WordList';

export const SavedWordsPage = () => {
  const { savedWords, removeSavedWord } = useWords();
  const savedWordsCount = savedWords.length;

  return (
    <AppContent>
      <div className="mx-auto w-full max-w-3xl">
        <div className="bg-known-soft mb-6 rounded-2xl px-8 py-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold sm:text-2xl">
                You've saved{' '}
                <span className="text-known">{savedWordsCount}</span> word
                {savedWordsCount === 1 ? '' : 's'}
              </p>
            </div>
            <img className="w-18 sm:w-24" src="/images/bonsai.png" alt="" />
          </div>
        </div>
        {savedWordsCount > 0 && (
          <WordList>
            {savedWords.map((word, index) => (
              <WordListItem
                className={index > 0 ? 'border-border-soft border-t' : ''}
                word={word}
                onRemove={() => removeSavedWord(word.id)}
              />
            ))}
          </WordList>
        )}
      </div>
    </AppContent>
  );
};
