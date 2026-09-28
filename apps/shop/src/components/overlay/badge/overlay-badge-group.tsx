import { OverlayBadge } from './overlay-badge';
import type {
  OverlayBadgeGroupProps,
  OverlayBadgeItem,
} from './overlay-badge.types';
import { toneFromValue } from './overlay-badge-variants';

export function OverlayBadgeGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-overlay-badge-group',
  onSelect,
}: OverlayBadgeGroupProps) {
  const handleSelect = (item: OverlayBadgeItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <OverlayBadge
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

export default OverlayBadgeGroup;
