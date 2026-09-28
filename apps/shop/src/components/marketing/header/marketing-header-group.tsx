import { MarketingHeader } from './marketing-header';
import type {
  MarketingHeaderGroupProps,
  MarketingHeaderItem,
} from './marketing-header.types';
import { toneFromValue } from './marketing-header-variants';

export function MarketingHeaderGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-marketing-header-group',
  onSelect,
}: MarketingHeaderGroupProps) {
  const handleSelect = (item: MarketingHeaderItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MarketingHeader
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

export default MarketingHeaderGroup;
