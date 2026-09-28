import { CommerceBanner } from './commerce-banner';
import type {
  CommerceBannerGroupProps,
  CommerceBannerItem,
} from './commerce-banner.types';
import { toneFromValue } from './commerce-banner-variants';

export function CommerceBannerGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-commerce-banner-group',
  onSelect,
}: CommerceBannerGroupProps) {
  const handleSelect = (item: CommerceBannerItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CommerceBanner
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

export default CommerceBannerGroup;
