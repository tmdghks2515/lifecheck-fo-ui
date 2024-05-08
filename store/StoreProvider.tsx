'use client'

import { Provider } from 'react-redux'
import { ReactNode } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './index'

function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  )
}

export default StoreProvider
