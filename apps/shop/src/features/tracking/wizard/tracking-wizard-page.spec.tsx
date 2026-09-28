import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { TrackingWizardPage } from './tracking-wizard-page';
import { TrackingWizardSummary } from './tracking-wizard-summary';
import {
  TRACKING_WIZARD_FEATURE,
  TRACKING_WIZARD_ROUTE,
} from './tracking-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[TRACKING_WIZARD_ROUTE]}>
      <TrackingWizardPage />
    </MemoryRouter>,
  );
}

describe('TrackingWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(TRACKING_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      TRACKING_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${TRACKING_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(TRACKING_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${TRACKING_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${TRACKING_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${TRACKING_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${TRACKING_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${TRACKING_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${TRACKING_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('TrackingWizardSummary', () => {
  it('renders the summary block', () => {
    render(<TrackingWizardSummary />);
    expect(
      screen.getByTestId(`${TRACKING_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
