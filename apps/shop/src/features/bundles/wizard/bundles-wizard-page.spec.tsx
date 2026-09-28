import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BundlesWizardPage } from './bundles-wizard-page';
import { BundlesWizardSummary } from './bundles-wizard-summary';
import {
  BUNDLES_WIZARD_FEATURE,
  BUNDLES_WIZARD_ROUTE,
} from './bundles-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[BUNDLES_WIZARD_ROUTE]}>
      <BundlesWizardPage />
    </MemoryRouter>,
  );
}

describe('BundlesWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(BUNDLES_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      BUNDLES_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${BUNDLES_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(BUNDLES_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${BUNDLES_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${BUNDLES_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${BUNDLES_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${BUNDLES_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${BUNDLES_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${BUNDLES_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('BundlesWizardSummary', () => {
  it('renders the summary block', () => {
    render(<BundlesWizardSummary />);
    expect(
      screen.getByTestId(`${BUNDLES_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
