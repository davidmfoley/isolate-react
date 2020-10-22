export class ClassesNotSupportedError extends Error {
  constructor() {
    super(
      'React class components are not yet supported. If this is a feature you need, please upvote or comment on the issue tracking this work: https://github.com/davidmfoley/isolate-components/issues/8'
    )
  }
}
