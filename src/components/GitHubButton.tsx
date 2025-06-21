'use client';

import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const GitHubButton: React.FC = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        asChild
        variant="outline"
        size="sm"
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg"
      >
        <a
          href="https://github.com/beebitsolutions/column-hasher"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Github className="h-4 w-4" />
          <span className="hidden sm:inline">Ver código fuente</span>
          <span className="sm:hidden">GitHub</span>
        </a>
      </Button>
    </div>
  );
};
