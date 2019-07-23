import Connection from './components/connection'
import Meals from './components/meals'
import Categories from './components/categories'
import Origins from './components/origins'
import Tags from './components/tags'
import Redir from './components/redir'

const routes = [
    { path: '/', name: 'default', Component: Redir, protected: false },
    { path: '/connection/', name: 'Connection', Component: Connection, protected: false },
    { path: '/meals/', name: 'Meals', Component: Meals, protected: true },
    { path: '/categories/', name: 'Categories', Component: Categories,protected: true  },
    { path: '/origins/', name: 'Origins', Component: Origins, protected: true  },
    { path: '/tags/', name: 'Tags', Component: Tags, protected: true  }
]

export default routes