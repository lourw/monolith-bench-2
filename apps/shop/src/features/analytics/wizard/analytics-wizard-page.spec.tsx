import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AnalyticsWizardPage } from './analytics-wizard-page';
import { AnalyticsWizardSummary } from './analytics-wizard-summary';
import {
  ANALYTICS_WIZARD_FEATURE,
  ANALYTICS_WIZARD_ROUTE,
} from './analytics-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ANALYTICS_WIZARD_ROUTE]}>
      <AnalyticsWizardPage />
    </MemoryRouter>,
  );
}

describe('AnalyticsWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ANALYTICS_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ANALYTICS_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ANALYTICS_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(ANALYTICS_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ANALYTICS_WIZARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ANALYTICS_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ANALYTICS_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ANALYTICS_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ANALYTICS_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ANALYTICS_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AnalyticsWizardSummary', () => {
  it('renders the summary block', () => {
    render(<AnalyticsWizardSummary />);
    expect(
      screen.getByTestId(`${ANALYTICS_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
