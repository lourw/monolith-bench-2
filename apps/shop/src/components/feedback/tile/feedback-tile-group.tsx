import { FeedbackTile } from './feedback-tile';
import type {
  FeedbackTileGroupProps,
  FeedbackTileItem,
} from './feedback-tile.types';
import { toneFromValue } from './feedback-tile-variants';

export function FeedbackTileGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-feedback-tile-group',
  onSelect,
}: FeedbackTileGroupProps) {
  const handleSelect = (item: FeedbackTileItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FeedbackTile
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

export default FeedbackTileGroup;
