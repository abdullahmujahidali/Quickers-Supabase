import './globals.css';

import Nav from './components/Nav';

export const metadata = {
  title: "Quickers Config Dashboard",
  description: "Dashboard for Quickers Config",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
    </body>
  </html>
);

export default RootLayout;