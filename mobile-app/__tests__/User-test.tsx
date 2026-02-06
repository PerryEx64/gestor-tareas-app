import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { AuthContext } from '../store/AuthContext';
import { User } from '../types/user.types';
import { useUserData } from '../hooks/useUser';

const mockUser: User = {
  id: '1',
  firstname: 'Brian',
  lastname: 'Garcia',
  email: 'brian@test.com',
};

describe('useUserData', () => {
  it('should return user from AuthContext', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider
        value={{ user: mockUser, setUser: jest.fn(), isAuthenticated: true }}
      >
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useUserData(), { wrapper });

    expect(result.current).toEqual(mockUser);
  });
});
