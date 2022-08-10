import { describe, it } from 'mocha'
import { expect } from 'chai'
import styled from 'styled-components'

import { reactNode, htmlNode } from './nodeTree/nodes'

import nodeMatcher from './nodeMatcher'
import { TreeNode } from './types/TreeNode'

const shouldMatch = (selector: string, node: TreeNode) => {
  it(`${selector} should match ${node.toString()}`, () => {
    expect(nodeMatcher(selector)(node)).to.be.true
  })
}

const shouldNotMatch = (selector: string, node: TreeNode) => {
  it(`${selector} should match ${node.toString()}`, () => {
    expect(nodeMatcher(selector)(node)).to.be.false
  })
}

const shouldMatchHtmlNode = (selector: string, tag: string, props: any) => {
  shouldMatch(selector, htmlNode(tag, props, []))
}

const shouldNotMatchHtmlNode = (selector: string, tag: string, props: any) => {
  shouldNotMatch(selector, htmlNode(tag, props, []))
}

const shouldMatchReact = (selector: string, fc: any, props: any) => {
  shouldMatch(selector, reactNode(fc, props, []))
}

const shouldNotMatchReact = (selector: string, fc: any, props: any) => {
  shouldNotMatch(selector, reactNode(fc, props, []))
}

const StyledButton = styled.button``

const Example = () => null

describe('nodeMatcher', () => {
  describe('star matcher', () => {
    shouldMatchHtmlNode('*', 'div', { className: 'awesome' })
    shouldMatchReact('*', Example, {})
  })

  describe('empty matcher', () => {
    shouldMatchHtmlNode('', 'div', { className: 'awesome' })
    shouldMatchReact('', Example, {})
  })

  describe('matching by class', () => {
    shouldMatchHtmlNode('.awesome', 'div', { className: 'awesome' })
    shouldMatchHtmlNode('span.awesome', 'span', { className: 'awesome' })
    shouldMatchHtmlNode('.awesome', 'span', { className: 'awesome' })
    shouldMatchHtmlNode('.awesome', 'span', { className: 'awesome and stuff' })
    shouldNotMatchHtmlNode('div.awesome', 'span', { className: 'awesome' })
    shouldNotMatchHtmlNode('.whatever', 'div', {})

    shouldMatchReact('Example.awesome', Example, { className: 'awesome' })
    shouldMatchReact('.awesome', Example, { className: 'awesome' })
    shouldNotMatchReact('.awesome', Example, { className: 'notAwesome' })
    shouldNotMatchReact('Foo.awesome', Example, { className: 'awesome' })
    shouldMatchReact('Example.awesome', Example, {
      className: 'cool also awesome',
    })
  })

  describe('matching by id', () => {
    shouldMatchHtmlNode('#awesome', 'div', { id: 'awesome' })
    shouldMatchHtmlNode('span#awesome', 'span', { id: 'awesome' })
    shouldMatchHtmlNode('#awesome', 'span', { id: 'awesome' })
    shouldNotMatchHtmlNode('div#awesome', 'span', { id: 'awesome' })
  })

  describe('finding react components by display name', () => {
    const ExampleWithDisplayName = () => null
    ExampleWithDisplayName.displayName = 'DisplayName'
    shouldMatchReact('DisplayName', ExampleWithDisplayName, {})
  })

  describe('styled components match on name', () => {
    // Special case: handle exact match with a dot.
    // Note this is the same syntax as `tag.class` matching.
    shouldMatchReact('styled.button', StyledButton, {})
  })

  describe('matching by props', () => {
    shouldMatchHtmlNode('div[data-test-id=foo]', 'div', {
      'data-test-id': 'foo',
    })

    shouldMatchHtmlNode('[data-test-id=foo]', 'div', {
      'data-test-id': 'foo',
    })

    shouldNotMatchHtmlNode('[data-test-id=foo]', 'div', {
      'data-test-id': 'bar',
    })

    shouldNotMatchHtmlNode('[data-test-id=foo]', 'div', {
      'data-test-id': 'bar',
    })

    shouldNotMatchHtmlNode('span[data-test-id=foo]', 'div', {
      'data-test-id': 'foo',
    })

    shouldMatchReact('Example[data-test-id=foo]', Example, {
      'data-test-id': 'foo',
    })

    shouldMatchReact('[data-test-id=foo]', Example, {
      'data-test-id': 'foo',
    })

    shouldNotMatchReact('[data-test-id=bar]', Example, {
      'data-test-id': 'foo',
    })

    shouldNotMatchReact('div[data-test-id=bar]', Example, {
      'data-test-id': 'foo',
    })
  })
})
