import { LayoutBadge } from './layout-badge';
import type {
  LayoutBadgeGroupProps,
  LayoutBadgeItem,
} from './layout-badge.types';
import { toneFromValue } from './layout-badge-variants';

export function LayoutBadgeGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-layout-badge-group',
  onSelect,
}: LayoutBadgeGroupProps) {
  const handleSelect = (item: LayoutBadgeItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <LayoutBadge
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

export default LayoutBadgeGroup;
