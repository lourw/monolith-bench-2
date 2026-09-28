import { InputsPanel } from './inputs-panel';
import type {
  InputsPanelGroupProps,
  InputsPanelItem,
} from './inputs-panel.types';
import { toneFromValue } from './inputs-panel-variants';

export function InputsPanelGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-inputs-panel-group',
  onSelect,
}: InputsPanelGroupProps) {
  const handleSelect = (item: InputsPanelItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <InputsPanel
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

export default InputsPanelGroup;
