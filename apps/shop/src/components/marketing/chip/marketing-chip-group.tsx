import { MarketingChip } from './marketing-chip';
import type {
  MarketingChipGroupProps,
  MarketingChipItem,
} from './marketing-chip.types';
import { toneFromValue } from './marketing-chip-variants';

export function MarketingChipGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-marketing-chip-group',
  onSelect,
}: MarketingChipGroupProps) {
  const handleSelect = (item: MarketingChipItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MarketingChip
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

export default MarketingChipGroup;
