import { MarketingCard } from './marketing-card';
import type {
  MarketingCardGroupProps,
  MarketingCardItem,
} from './marketing-card.types';
import { toneFromValue } from './marketing-card-variants';

export function MarketingCardGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-marketing-card-group',
  onSelect,
}: MarketingCardGroupProps) {
  const handleSelect = (item: MarketingCardItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MarketingCard
            key={item.id}
            label={item.label}
            value={item.value}
            size={size}
            tone={item.tone ?? toneFromValue(item.value)}
            testId={`${testId}-${item.id}`}
            onSelect={onSelect ? handleSelect(item) : undefined}
          />
        ))}
      </div>
      {items.length === 0 ? (
        <p className="ui-group-empty">Nothing to show</p>
      ) : null}
    </section>
  );
}

export default MarketingCardGroup;
