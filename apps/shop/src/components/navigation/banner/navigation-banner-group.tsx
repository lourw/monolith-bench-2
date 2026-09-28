import { NavigationBanner } from './navigation-banner';
import type {
  NavigationBannerGroupProps,
  NavigationBannerItem,
} from './navigation-banner.types';
import { toneFromValue } from './navigation-banner-variants';

export function NavigationBannerGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-navigation-banner-group',
  onSelect,
}: NavigationBannerGroupProps) {
  const handleSelect = (item: NavigationBannerItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <NavigationBanner
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

export default NavigationBannerGroup;
