import React from 'react'
import FecthingUsers from './Application/FecthingUsers'
import TodoApp from './Application/TodoApp'
import SwappingList from './Application/SwappingList'
import Pagination from './Application/Pagination'
import ProgressBar from './Application/ProgressBar'
import Sidebar from './Application/Sidebar'
import StarRating from './Application/StarRating'
import BookSearch from './Application/BookSearch'
import {Provider} from "react-redux"
import appStore from './Store/appStore'
const App = () => {

return (
  <div>
    <Provider store={appStore}>
      {/* <TodoApp /> */}
      {/* <SwappingList/> */}
      {/* <FecthingUsers/> */}
      {/* <Pagination/> */}
      {/* <ProgressBar/> */}
      {/* <Sidebar/> */}
      <StarRating />
      {/* <BookSearch /> */}
    </Provider>
  </div>
);
}

export default App