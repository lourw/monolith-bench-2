import { TypographyPanel } from './typography-panel';
import type {
  TypographyPanelGroupProps,
  TypographyPanelItem,
} from './typography-panel.types';
import { toneFromValue } from './typography-panel-variants';

export function TypographyPanelGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-typography-panel-group',
  onSelect,
}: TypographyPanelGroupProps) {
  const handleSelect = (item: TypographyPanelItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <TypographyPanel
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

export default TypographyPanelGroup;
