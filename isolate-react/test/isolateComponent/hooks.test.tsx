import { describe, it } from 'mocha'
import React, { useState, useEffect } from 'react'
import { isolateComponent, IsolatedComponent } from '../../src/isolateComponent'
import { expect } from 'chai'

// Example of testing a component that makes an async
// function call during an effect and uses the result

const LoadingIndicator = () => <div>Loading</div>

const UserInfo = ({ user }: { user: { name: string } }) => (
  <div>{user.name}</div>
)

interface User {
  name: string
}

interface CurrentUserProps {
  fetchCurrentUser: () => Promise<User>
}

// fetch the current user on mount,
// display LoadingIndicator while waiting for user result
const CurrentUser = (props: CurrentUserProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loadingState, setLoadingState] = useState<'loading' | 'loaded'>(
    'loading'
  )

  useEffect(() => {
    props.fetchCurrentUser().then((user) => {
      setUser(user)
      setLoadingState('loaded')
    })
  }, [])

  if (loadingState === 'loading') return <LoadingIndicator />

  return <UserInfo user={user} />
}

describe('hooks', () => {
  describe('useEffect lifecycle', () => {
    let calls: string[] = []
    let component: IsolatedComponent<{ name: string }>

    const EffectExample = (props: { name: string }) => {
      useEffect(() => {
        calls.push(`hello ${props.name}`)
        return () => {
          calls.push(`goodbye ${props.name}`)
        }
      }, [props.name])

      return <div />
    }

    beforeEach(() => {
      calls = []
      component = isolateComponent(<EffectExample name="arthur" />)
    })

    it('invokes effect initially', () => {
      expect(calls).to.eql(['hello arthur'])
    })

    it('cleans up upon change', () => {
      component.setProps({ name: 'trillian' })
      expect(calls).to.eql(['hello arthur', 'goodbye arthur', 'hello trillian'])
    })

    it('cleans up upon component cleanup', () => {
      component.setProps({ name: 'trillian' })
      component.cleanup()
      expect(calls).to.eql([
        'hello arthur',
        'goodbye arthur',
        'hello trillian',
        'goodbye trillian',
      ])
    })
  })

  describe('Async side effect in useEffect', () => {
    it('renders with the resolved value', async () => {
      const user = { name: 'Arthur Dent' }

      // stubbed async effect
      const fetchCurrentUser = async () => user

      const component = isolateComponent(
        <CurrentUser fetchCurrentUser={fetchCurrentUser} />
      )

      // the fetchCurrentUser promise has not yet resolved
      expect(!!component.findOne(LoadingIndicator)).to.eq(true)

      // wait for the fetchCurrentUser promise
      // Promises are resolved in order, so awaiting this one ensures
      // that the promise returned by fetchCurrentUser has also resolved
      await Promise.resolve()

      // check that the UserInfo component is rendered
      expect(component.findOne(UserInfo).props.user).to.eq(user)
    })
  })
})
