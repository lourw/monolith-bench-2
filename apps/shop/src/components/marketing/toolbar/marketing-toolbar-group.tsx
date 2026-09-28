import { MarketingToolbar } from './marketing-toolbar';
import type {
  MarketingToolbarGroupProps,
  MarketingToolbarItem,
} from './marketing-toolbar.types';
import { toneFromValue } from './marketing-toolbar-variants';

export function MarketingToolbarGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-marketing-toolbar-group',
  onSelect,
}: MarketingToolbarGroupProps) {
  const handleSelect = (item: MarketingToolbarItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MarketingToolbar
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

export default MarketingToolbarGroup;
