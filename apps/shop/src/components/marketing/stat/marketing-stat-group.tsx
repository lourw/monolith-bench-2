import { MarketingStat } from './marketing-stat';
import type {
  MarketingStatGroupProps,
  MarketingStatItem,
} from './marketing-stat.types';
import { toneFromValue } from './marketing-stat-variants';

export function MarketingStatGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-marketing-stat-group',
  onSelect,
}: MarketingStatGroupProps) {
  const handleSelect = (item: MarketingStatItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MarketingStat
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

export default MarketingStatGroup;
