import { InputsStat } from './inputs-stat';
import type { InputsStatGroupProps, InputsStatItem } from './inputs-stat.types';
import { toneFromValue } from './inputs-stat-variants';

export function InputsStatGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-inputs-stat-group',
  onSelect,
}: InputsStatGroupProps) {
  const handleSelect = (item: InputsStatItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <InputsStat
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

export default InputsStatGroup;
