import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CatalogWizardPage } from './catalog-wizard-page';
import { CatalogWizardSummary } from './catalog-wizard-summary';
import {
  CATALOG_WIZARD_FEATURE,
  CATALOG_WIZARD_ROUTE,
} from './catalog-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CATALOG_WIZARD_ROUTE]}>
      <CatalogWizardPage />
    </MemoryRouter>,
  );
}

describe('CatalogWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CATALOG_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CATALOG_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CATALOG_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(CATALOG_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CATALOG_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CATALOG_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CATALOG_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CATALOG_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CATALOG_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CATALOG_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CatalogWizardSummary', () => {
  it('renders the summary block', () => {
    render(<CatalogWizardSummary />);
    expect(
      screen.getByTestId(`${CATALOG_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
