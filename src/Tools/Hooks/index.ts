import { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import AppContext from "../../App/AppContext";
import AuthContext from "../../Auth/AuthContext";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useApp = () => useContext(AppContext);
export const useAuth = () => useContext(AuthContext);

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};








function descendingComparator(a: any, b: any, orderBy: keyof any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: string | undefined | number },
    b: { [key in Key]: string | undefined | number },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export type Order = 'asc' | 'desc';
// How to use:
// array.slice().sort(getComparator(order, orderBy))