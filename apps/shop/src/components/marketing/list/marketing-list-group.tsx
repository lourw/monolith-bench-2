import { MarketingList } from './marketing-list';
import type {
  MarketingListGroupProps,
  MarketingListItem,
} from './marketing-list.types';
import { toneFromValue } from './marketing-list-variants';

export function MarketingListGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-marketing-list-group',
  onSelect,
}: MarketingListGroupProps) {
  const handleSelect = (item: MarketingListItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MarketingList
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

export default MarketingListGroup;
