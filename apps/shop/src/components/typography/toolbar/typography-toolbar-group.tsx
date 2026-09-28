import { TypographyToolbar } from './typography-toolbar';
import type {
  TypographyToolbarGroupProps,
  TypographyToolbarItem,
} from './typography-toolbar.types';
import { toneFromValue } from './typography-toolbar-variants';

export function TypographyToolbarGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-typography-toolbar-group',
  onSelect,
}: TypographyToolbarGroupProps) {
  const handleSelect = (item: TypographyToolbarItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <TypographyToolbar
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

export default TypographyToolbarGroup;
