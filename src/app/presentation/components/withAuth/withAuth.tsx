import { useEffect, useState } from 'react';
import { getLoggedUser, User } from '@/app/session';
import { Loading } from '../loading';

export const withAuth = (WrappedComponent: React.FC, isAdminPage: boolean = false) => {
  const ComponentWithAuth = (props: any) => {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState<User>();

    useEffect(() => {
      const loggedUser = getLoggedUser();
      if (!loggedUser) {
        window.location.href =  isAdminPage ? '/dashboard/login' :  '/login';
      } else {
        const isUserAdmin = loggedUser.role == 'ROLE_ADMINISTRATOR';
        if (isUserAdmin && !isAdminPage) {
          window.location.href = '/login';
          return;
        } else if (!isUserAdmin && isAdminPage) {
          window.location.href = '/dashboard/login';
          return;
        }
        setUser(loggedUser);
        setLoading(false);
      }
    }, []);

    if (isLoading) {
      return <Loading />;
    }

    return <WrappedComponent user={user} {...props} />;
  };

  return ComponentWithAuth;
};
