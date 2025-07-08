import { Info } from 'lucide-react';
import React from 'react';
import { Button } from '../button';

export const ViewDetails = () => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:bg-accent hover:text-foreground"
        aria-label="View details"
      >
        <Info className="h-5 w-5" />
      </Button>
    </>
  );
};
