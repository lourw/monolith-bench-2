import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PreordersWizardPage } from './preorders-wizard-page';
import { PreordersWizardSummary } from './preorders-wizard-summary';
import {
  PREORDERS_WIZARD_FEATURE,
  PREORDERS_WIZARD_ROUTE,
} from './preorders-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PREORDERS_WIZARD_ROUTE]}>
      <PreordersWizardPage />
    </MemoryRouter>,
  );
}

describe('PreordersWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PREORDERS_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PREORDERS_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PREORDERS_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(PREORDERS_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PREORDERS_WIZARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PREORDERS_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PREORDERS_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PREORDERS_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PREORDERS_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PREORDERS_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PreordersWizardSummary', () => {
  it('renders the summary block', () => {
    render(<PreordersWizardSummary />);
    expect(
      screen.getByTestId(`${PREORDERS_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
