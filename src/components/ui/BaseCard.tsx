
// DEPRECATED: BaseCard is no longer used. All feature cards now use the unified Card component in ui/card.tsx.
// This file is safe to delete after confirming no imports remain.

import React from 'react';

const BaseCard = React.forwardRef<HTMLDivElement, any>(() => {
  return <div>Deprecated component</div>;
});

BaseCard.displayName = 'BaseCard';
export default BaseCard;
