import { TypographyHeader } from './typography-header';
import type {
  TypographyHeaderGroupProps,
  TypographyHeaderItem,
} from './typography-header.types';
import { toneFromValue } from './typography-header-variants';

export function TypographyHeaderGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-typography-header-group',
  onSelect,
}: TypographyHeaderGroupProps) {
  const handleSelect = (item: TypographyHeaderItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <TypographyHeader
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

export default TypographyHeaderGroup;
