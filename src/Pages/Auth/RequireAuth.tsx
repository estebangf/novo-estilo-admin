import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from '../../Tools/Hooks';

interface RequireAuthProps {
  children: JSX.Element
  required: boolean
  exclud?: boolean
}
export default function RequireAuth({ children, required, exclud }: RequireAuthProps) {
  let auth = useAuth();
  let location = useLocation();

  if (required)
    if (!auth.user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    } else return children;
  else if (exclud && auth.user)
    return <Navigate to="/" replace />;
  else return children;
}
