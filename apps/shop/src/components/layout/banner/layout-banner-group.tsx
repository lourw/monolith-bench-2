import { LayoutBanner } from './layout-banner';
import type {
  LayoutBannerGroupProps,
  LayoutBannerItem,
} from './layout-banner.types';
import { toneFromValue } from './layout-banner-variants';

export function LayoutBannerGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-layout-banner-group',
  onSelect,
}: LayoutBannerGroupProps) {
  const handleSelect = (item: LayoutBannerItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <LayoutBanner
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

export default LayoutBannerGroup;
