import { useSelector } from 'react-redux';
import { 
  selectCurrentUser, 
  selectCurrentToken, 
  selectIsAuthenticated 
} from '../store/slices/authSlice';

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return {
    user,
    token,
    isAuthenticated,
    isRetailer: user?.role === 'retailer',
    isCustomer: user?.role === 'customer',
  };
}; 