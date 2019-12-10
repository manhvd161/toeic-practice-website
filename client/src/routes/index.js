import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import Loadable from 'react-loadable';

import Loading from '../components/Loading';

const Home = Loadable({
  loader: () => import('../pages/Home'),
  loading: Loading,
});
const Admin = Loadable({
  loader: () => import('../pages/Admin'),
  loading: Loading,
});
const Grammar = Loadable({
  loader: () => import('../pages/Grammar'),
  loading: Loading,
});
const Exam = Loadable({
  loader: () => import('../pages/Exam'),
  loading: Loading,
});
const Intro = Loadable({
  loader: () => import('../pages/Exam/Intro'),
  loading: Loading,
});
const Part1 = Loadable({
  loader: () => import('../pages/Exam/Part1'),
  loading: Loading,
});
const Topics = Loadable({
  loader: () => import('../pages/Topics'),
  loading: Loading,
});
const Flashcard = Loadable({
  loader: () => import('../pages/Flashcard'),
  loading: Loading,
});
const PostGrammar = Loadable({
  loader: () => import('../pages/PostGrammar'),
  loading: Loading,
});

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/part/:idPart',
    component: PostGrammar,
  },
  {
    path: '/grammar',
    component: Grammar,
  },
  {
    path: '/exam',
    component: Exam,
  },
  {
    path: '/exam/intro',
    component: Intro,
  },
  {
    path: '/exam/part1',
    component: Part1,
  },
  {
    path: '/new-word',
    component: Topics,
  },
  {
    path: '/new-word/:topic',
    component: Flashcard,
  },
  {
    path: '*',
    component: () => <div>404!</div>,
  },
];

export default () => (
  <Switch>
    {routes.map(({ path, component, exact = true, isPrivate }, index) => {
      if (!isPrivate) {
        return (
          <Route key={index} path={path} component={component} exact={exact} />
        );
      } else {
        return (
          <PrivateRoute
            key={index}
            path={path}
            component={component}
            exact={exact}
          />
        );
      }
    })}
  </Switch>
);
