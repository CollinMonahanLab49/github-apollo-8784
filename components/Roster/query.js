import { gql } from '@apollo/client'

export const queryAccessor = 'allPeople'

export const query = gql`
  {
    allPeople {
      personId
      firstName
      lastName
      country
      color
      numPets
      numAppliances
      numVehicles
      numRelatives
      numProjects
      outlook
      ethics
      company
      manager
      salary
      worth
      numNanites
      apples @client
      oranges @client
      bananas @client
      silkworms @client
      marzapan @client
    }
  }
`
/*
  more fields could be added
    viewpoint
    notes
    created
    parent
    vinNumber
*/

export const queryOptions = {
  fetchPolicy: 'network-only',
  nextFetchPolicy: 'cache-only',
}
