import React from "react";
import {
  useLocation,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import i18n from '../translations/i18n';
import Landing from '../features/home/Landing';
import CV from '../features/cv/CV';
import Home from '../features/home/Home';
import { string } from "yup/lib/locale";
import { isStringTextContainingNode } from "typescript";

const baseRouteUrl = "/:lang(fr|en)";
export const baseUrl = `/${i18n.language}`;

interface IRoute {
  path: string;
  exact?: boolean;
  component: React.FC;
  routes?: IRoute[]
}

// Route config
export const routes: IRoute[] = [
  {
    path: `/`,
    exact: true,
    component: () => <Redirect to="/en/home" />
  },
  {
    path: `${baseRouteUrl}`,
    exact: true,
    component: (props: any) => <Redirect to={`/en/home/`} />
  },
  {
    path: `${baseRouteUrl}/landing`,
    exact: true,
    component: Landing
  },
  {
    path: `${baseRouteUrl}/home`,
    component: Home,
    routes: [
      {
        path: "/cv",
        component: CV
      }
    ]
  }
];



export const RouteConfig: React.FC<{ routes: IRoute[] }> = (props) => {
  const { routes } = props;
  const location = useLocation();
  
  return <Switch location={location}>
    {
      routes.map((route, i) => (
        <RouteWithSubRoutes key={i} route={route} /> 
      ))
    }

    </Switch>
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
const RouteWithSubRoutes: any = (props: any) => {
  const { route } = props;
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => {
        // pass the sub-routes down to keep nesting
        const subRoutes = route.routes ? route.routes : [];
        return <route.component {...props} routes={subRoutes} />
      }}
    />
  );
}
