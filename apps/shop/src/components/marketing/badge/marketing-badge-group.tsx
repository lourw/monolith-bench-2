import { MarketingBadge } from './marketing-badge';
import type {
  MarketingBadgeGroupProps,
  MarketingBadgeItem,
} from './marketing-badge.types';
import { toneFromValue } from './marketing-badge-variants';

export function MarketingBadgeGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-marketing-badge-group',
  onSelect,
}: MarketingBadgeGroupProps) {
  const handleSelect = (item: MarketingBadgeItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MarketingBadge
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

export default MarketingBadgeGroup;
