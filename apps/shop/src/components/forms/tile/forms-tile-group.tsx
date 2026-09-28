import { FormsTile } from './forms-tile';
import type { FormsTileGroupProps, FormsTileItem } from './forms-tile.types';
import { toneFromValue } from './forms-tile-variants';

export function FormsTileGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-forms-tile-group',
  onSelect,
}: FormsTileGroupProps) {
  const handleSelect = (item: FormsTileItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FormsTile
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

export default FormsTileGroup;
