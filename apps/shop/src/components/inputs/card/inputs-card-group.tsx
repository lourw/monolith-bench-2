import { InputsCard } from './inputs-card';
import type { InputsCardGroupProps, InputsCardItem } from './inputs-card.types';
import { toneFromValue } from './inputs-card-variants';

export function InputsCardGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-inputs-card-group',
  onSelect,
}: InputsCardGroupProps) {
  const handleSelect = (item: InputsCardItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <InputsCard
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

export default InputsCardGroup;
