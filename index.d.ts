import { parse } from './lib';

interface IParseResult {
  network: string,
  user: string,
  url: string
}

declare const parse: (url: string) => IParseResult

export parse
