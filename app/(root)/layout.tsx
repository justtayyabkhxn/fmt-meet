import { ReactNode } from 'react';

import { UserProvider } from '@/providers/UserProvider';
import StreamVideoProvider from '@/providers/StreamClientProvider';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <UserProvider>
        <StreamVideoProvider>{children}</StreamVideoProvider>
      </UserProvider>
    </main>
  );
};

export default RootLayout;
