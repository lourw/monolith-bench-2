import { TypographyStat } from './typography-stat';
import type {
  TypographyStatGroupProps,
  TypographyStatItem,
} from './typography-stat.types';
import { toneFromValue } from './typography-stat-variants';

export function TypographyStatGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-typography-stat-group',
  onSelect,
}: TypographyStatGroupProps) {
  const handleSelect = (item: TypographyStatItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <TypographyStat
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

export default TypographyStatGroup;
