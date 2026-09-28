import { LayoutCard } from './layout-card';
import type { LayoutCardGroupProps, LayoutCardItem } from './layout-card.types';
import { toneFromValue } from './layout-card-variants';

export function LayoutCardGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-layout-card-group',
  onSelect,
}: LayoutCardGroupProps) {
  const handleSelect = (item: LayoutCardItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <LayoutCard
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

export default LayoutCardGroup;
