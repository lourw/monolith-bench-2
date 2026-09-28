import { TypographyBadge } from './typography-badge';
import type {
  TypographyBadgeGroupProps,
  TypographyBadgeItem,
} from './typography-badge.types';
import { toneFromValue } from './typography-badge-variants';

export function TypographyBadgeGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-typography-badge-group',
  onSelect,
}: TypographyBadgeGroupProps) {
  const handleSelect = (item: TypographyBadgeItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <TypographyBadge
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

export default TypographyBadgeGroup;
