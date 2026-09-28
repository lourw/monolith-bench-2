import { DataBadge } from './data-badge';
import type { DataBadgeGroupProps, DataBadgeItem } from './data-badge.types';
import { toneFromValue } from './data-badge-variants';

export function DataBadgeGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-data-badge-group',
  onSelect,
}: DataBadgeGroupProps) {
  const handleSelect = (item: DataBadgeItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <DataBadge
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

export default DataBadgeGroup;
