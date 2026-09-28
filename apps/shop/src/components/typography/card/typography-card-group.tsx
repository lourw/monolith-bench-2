import { TypographyCard } from './typography-card';
import type {
  TypographyCardGroupProps,
  TypographyCardItem,
} from './typography-card.types';
import { toneFromValue } from './typography-card-variants';

export function TypographyCardGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-typography-card-group',
  onSelect,
}: TypographyCardGroupProps) {
  const handleSelect = (item: TypographyCardItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <TypographyCard
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

export default TypographyCardGroup;
