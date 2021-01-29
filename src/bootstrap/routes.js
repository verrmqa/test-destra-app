
import Landing from '../components/features/Landing';
import Contacts from '../components/features/Contacts';
import NotFoundPage from '../components/features/NotFoundPage';

import Reviews from '../components/features/Reviews';

import Catalog from '../components/features/Catalog';
import Instruction from '../components/features/Instruction';

import Search from '../components/features/Search';

import Documents from '../components/features/Documents';
import Document from '../components/features/Document';

import Category from '../components/features/Category';

import Calculators from '../components/features/Calculators';
import CalculatorPage from '../components/features/CalculatorPage';

import Account from '../components/features/Account';
import UserDocuments from '../components/features/UserDocuments';
import UserFriends from '../components/features/UserFriends';

import UserSend from '../components/features/UserSend';

import Auth from '../components/features/Auth';
import Login from '../components/features/Login';
import Signup from '../components/features/Signup';
import Reset from '../components/features/Reset';
import Restore from '../components/features/Restore';


import withDocument from '../components/features/Document/hoc/withDocument';
import withTemplate from '../components/features/Document/hoc/withTemplate';

import Entrypoint from '..';

export default [
  {
    component: Entrypoint,
    routes: [
      { path: '/', component: Landing, exact: true },
      { path: '/contacts', component: Contacts, exact: true },

      { path: '/catalog', exact: true, component: Catalog },
      { path: '/catalog/:categorySlug', exact: true, component: Category },
      { path: '/catalog/:categorySlug/:slug', exact: true, component: Instruction },

      { path: '/documents', exact: true, component: Documents },
      { path: '/documents/:categorySlug', exact: true, component: Category },
      { path: '/documents/:categorySlug/:templateSlug', exact: true, component: withTemplate(Document) },

      { path: '/calculators', exact: true, component: Calculators },
      { path: '/calculators/:categorySlug', exact: true, component: Category },
      { path: '/calculators/:categorySlug/:slug', exact: true, component: CalculatorPage },

      { path: '/reviews', component: Reviews, exact: true },

      {
        path: '/auth',
        component: Auth,
        routes: [
          { path: '/auth/login', component: Login },
          { path: '/auth/signup', component: Signup },
          { path: '/auth/restore', component: Restore },
          { path: '/auth/reset/:token', component: Reset },
        ]
      },

      { path: '/account/documents/:documentId', component: withDocument(Document), exact: true },
      {
        path: '/account',
        component: Account,
        routes: [
          { path: '/account/documents', component: UserDocuments, exact: true },
          { path: '/account/friends', component: UserFriends, exact: true },
          { path: '/account/send', component: UserSend, exact: true }
        ]
      },

      { path: '/search', exact: true, component: Search },
      { path: '*', component: NotFoundPage, exact: true }
    ]
  }
];
