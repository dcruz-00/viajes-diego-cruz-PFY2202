import { graphqlHandlers } from './graphql.js'
import { restHandlers } from './rest.js'

export const handlers = [...restHandlers, ...graphqlHandlers]