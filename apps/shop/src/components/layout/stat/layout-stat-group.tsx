import { LayoutStat } from './layout-stat';
import type { LayoutStatGroupProps, LayoutStatItem } from './layout-stat.types';
import { toneFromValue } from './layout-stat-variants';

export function LayoutStatGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-layout-stat-group',
  onSelect,
}: LayoutStatGroupProps) {
  const handleSelect = (item: LayoutStatItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <LayoutStat
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

export default LayoutStatGroup;
