import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { FeedbackSettingsPage } from './feedback-settings-page';
import { FeedbackSettingsSummary } from './feedback-settings-summary';
import {
  FEEDBACK_SETTINGS_FEATURE,
  FEEDBACK_SETTINGS_ROUTE,
} from './feedback-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[FEEDBACK_SETTINGS_ROUTE]}>
      <FeedbackSettingsPage />
    </MemoryRouter>,
  );
}

describe('FeedbackSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(FEEDBACK_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      FEEDBACK_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${FEEDBACK_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(FEEDBACK_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${FEEDBACK_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${FEEDBACK_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${FEEDBACK_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${FEEDBACK_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${FEEDBACK_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${FEEDBACK_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('FeedbackSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<FeedbackSettingsSummary />);
    expect(
      screen.getByTestId(`${FEEDBACK_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
