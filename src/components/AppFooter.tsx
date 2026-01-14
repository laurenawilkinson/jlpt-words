import { cn } from '@/utils/cn';
import { IconHelpCircle, IconBrandGithub } from '@tabler/icons-preact';
import { useState } from 'preact/hooks';
import IconButton from './UI/IconButton';

export const AppFooter = () => {
  const [showCredits, setShowCredits] = useState(false);

  return (
    <footer className="text-muted flex flex-row-reverse items-center justify-center gap-2 p-4 text-center text-xs sm:justify-start">
      <IconButton
        aria-label="About"
        className="hidden sm:inline-flex"
        onClick={() => setShowCredits(!showCredits)}
      >
        <IconHelpCircle />
      </IconButton>
      <div
        className={cn(
          'flex items-center gap-2 transition-all',
          showCredits ? 'sm:-translate-x-2' : 'sm:invisible sm:opacity-0'
        )}
      >
        <a href="https://www.flaticon.com/free-icons/japan" target="_blank">
          Images by Freepik
        </a>
        &bull;
        <a
          className="inline-flex items-center gap-1"
          href="https://github.com/laurenawilkinson/jlpt-words"
          target="_blank"
        >
          <IconBrandGithub size={16} /> Source on Github
        </a>
      </div>
    </footer>
  );
};
