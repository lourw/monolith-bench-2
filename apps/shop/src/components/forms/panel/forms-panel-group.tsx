import { FormsPanel } from './forms-panel';
import type { FormsPanelGroupProps, FormsPanelItem } from './forms-panel.types';
import { toneFromValue } from './forms-panel-variants';

export function FormsPanelGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-forms-panel-group',
  onSelect,
}: FormsPanelGroupProps) {
  const handleSelect = (item: FormsPanelItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FormsPanel
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

export default FormsPanelGroup;
