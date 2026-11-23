import { ApolloProvider } from '@apollo/client/react'
import { clienteGraphql } from './graphql/cliente.js'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <ApolloProvider client={clienteGraphql}>
      <AppRoutes />
    </ApolloProvider>
  )
}

export default App