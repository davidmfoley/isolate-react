import { isolateHook } from 'isolate-react'
import { useRememberNames } from './useRememberNames'

test('remembers a single name', () => {
  const useTestRememberNames = isolateHook(useRememberNames)
  expect(useTestRememberNames('Arthur')).toEqual(['Arthur'])
})

test('remembers two names', () => {
  const useTestRememberNames = isolateHook(useRememberNames)
  useTestRememberNames('Arthur')
  expect(useTestRememberNames('Trillian')).toEqual(['Arthur', 'Trillian'])
})

test('does not remember duplicate names', () => {
  const useTestRememberNames = isolateHook(useRememberNames)
  useTestRememberNames('Ford')
  useTestRememberNames('Arthur')
  useTestRememberNames('Ford')

  expect(useTestRememberNames('Arthur')).toEqual(['Ford', 'Arthur'])
})
