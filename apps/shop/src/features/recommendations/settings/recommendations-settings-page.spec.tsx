import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { RecommendationsSettingsPage } from './recommendations-settings-page';
import { RecommendationsSettingsSummary } from './recommendations-settings-summary';
import {
  RECOMMENDATIONS_SETTINGS_FEATURE,
  RECOMMENDATIONS_SETTINGS_ROUTE,
} from './recommendations-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RECOMMENDATIONS_SETTINGS_ROUTE]}>
      <RecommendationsSettingsPage />
    </MemoryRouter>,
  );
}

describe('RecommendationsSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RECOMMENDATIONS_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RECOMMENDATIONS_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(RECOMMENDATIONS_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(
        `${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-panel-name`,
      ),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('RecommendationsSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<RecommendationsSettingsSummary />);
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
