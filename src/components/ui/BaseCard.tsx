// DEPRECATED: BaseCard is no longer used. All feature cards now use the unified Card component in ui/card.tsx.
// This file is safe to delete after confirming no imports remain.        {metadata && <div className={cn(CARD_STYLES.padding, cardStyles.metadata, type === 'photo' ? 'text-sm text-gray-600' : '', type === 'video' ? 'text-sm text-gray-500' : '', type === 'car' || type === 'newCar' || type === 'usedCar' ? 'text-sm text-gray-500' : '')}>
            {Object.entries(metadata).map(([key, value]) => <div key={key} className="flex items-center space-x-2">
                <span className={cn(CARD_STYLES.metadata, type === 'photo' ? 'font-medium' : '', type === 'video' ? 'text-sm' : '', type === 'car' || type === 'newCar' || type === 'usedCar' ? 'text-sm' : '')}>{value}</span>
              </div>)}
          </div>}
      </div>;
});

BaseCard.displayName = 'BaseCard';
export default BaseCard;