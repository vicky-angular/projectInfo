/* eslint-disable no-undef */
import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import HistoryList from './components/History/HistoryList';
import { getDocs, collection, query, where, updateDoc, } from 'firebase/firestore';
jest.mock('firebase/firestore', () => ({
  getDocs: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock('../src/firebaseConfig', () => ({
  db: {} // Mock Firestore db object
}));

describe('HistoryList', () => {
  // Set up mocks
  beforeEach(() => {
    collection.mockReturnValue({});
    query.mockReturnValue({});
    where.mockReturnValue({});
  });

  // Test rendering of the component
  test('renders HistoryList component', () => {
    render(<HistoryList />);
    expect(screen.getByTestId('test-history')).toBeInTheDocument();
  });

  // Test data fetching and rendering
  test('fetches and displays data', async () => {
    const mockData = [
      { id: '1', projectName: 'Project 1', applicantName: 'John Doe', skill: 'React', status: 'PENDING' },
      { id: '2', projectName: 'Project 2', applicantName: 'Jane Doe', skill: 'Node', status: 'PENDING' },
    ];

    // Mock the getDocs to return a mock QuerySnapshot
    getDocs.mockResolvedValueOnce({
      forEach: (callback) => mockData.forEach((item) => callback({ id: item.id, data: () => item })),
    });
    updateDoc.mockResolvedValueOnce();

    render(<HistoryList />);
      // Wait for data to be rendered
      await waitFor(() => {
        const project1 = screen.getByTestId('test-action-btn-1');
        expect(project1).toBeInTheDocument();
      });
    
  });
});
