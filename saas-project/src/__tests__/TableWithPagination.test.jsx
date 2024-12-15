import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import TableWithPagination from '../TableWithPagination';

// Mock fetch to simulate data for the table
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, 's.no': 1, 'percentage.funded': 50, 'amt.pledged': 1000 },
        { id: 2, 's.no': 2, 'percentage.funded': 70, 'amt.pledged': 2000 },
        { id: 3, 's.no': 3, 'percentage.funded': 60, 'amt.pledged': 1500 },
        { id: 4, 's.no': 4, 'percentage.funded': 80, 'amt.pledged': 2500 },
        { id: 5, 's.no': 5, 'percentage.funded': 90, 'amt.pledged': 3000 },
        { id: 6, 's.no': 6, 'percentage.funded': 85, 'amt.pledged': 2800 },
        { id: 7, 's.no': 7, 'percentage.funded': 95, 'amt.pledged': 3200 },
      ]),
  })
);

describe('TableWithPagination Component', () => {
  it('table with fetch call and next,previous buttons test', async () => {
    render(<TableWithPagination />);

    // Wait for the data to load
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Check for headings
    expect(screen.getByText('S.No.')).toBeInTheDocument();
    expect(screen.getByText('Percentage Funded')).toBeInTheDocument();
    expect(screen.getByText('Amount Pledged')).toBeInTheDocument();

    let rows = screen.getAllByRole('row');
    // 5 rows per page testcase
    expect(rows.length - 1).toBe(5);

    // Click on Next button
    fireEvent.click(screen.getByText('Next'));

    // Check that the page number updated to 2
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();

    // Verify the correct number of rows for page 2 (should be 2 records)
    rows = screen.getAllByRole('row');
    expect(rows.length - 1).toBe(2); // 2 records on page 2 (excluding header row)


    // Click on Next to go to page 2
    fireEvent.click(screen.getByText('Next'));

    // Now click on Previous to go back to page 1
    fireEvent.click(screen.getByText('Previous'));

    // Check that the page number updated back to 1
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();

    // Verify the correct number of rows for page 1 (should be 5 records)
    rows = screen.getAllByRole('row');
    expect(rows.length - 1).toBe(5); // 5 records on page 1 (excluding header row)

    // Check if Previous button is disabled on the first page
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();

    // Click Next to go to the last page
    fireEvent.click(screen.getByText('Next'));

    // Check if Next button is disabled on the last page
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();

  });

});
