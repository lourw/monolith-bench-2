import { TypographyList } from './typography-list';
import type {
  TypographyListGroupProps,
  TypographyListItem,
} from './typography-list.types';
import { toneFromValue } from './typography-list-variants';

export function TypographyListGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-typography-list-group',
  onSelect,
}: TypographyListGroupProps) {
  const handleSelect = (item: TypographyListItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <TypographyList
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

export default TypographyListGroup;
