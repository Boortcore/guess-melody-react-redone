import { FC } from 'react';
import { Outlet } from 'react-router';

const AppLayout: FC = () => {
  return (   
    <section className="main">
      <Outlet/>
    </section>
  )
}

export default AppLayout;