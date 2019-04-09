import * as Immutable from "immutable";

export interface IStateAbstract<T> {
  state: Immutable.OrderedMap<string, T>;
  readonly size: number;
  readonly changes: Immutable.OrderedMap<string, T>;

  setIn(path: string[], value: any, setChanges?: boolean);

  set(fieldName: string, value: T, setChanges?: boolean);

  get(fieldName: string): T;

  getIn(path: string[]): any;

  has(fieldName: string): boolean;

  hasIn(path: string[]): boolean;

}


export abstract class StateAbstract<T> implements IStateAbstract<T> {

  protected _state: Immutable.OrderedMap<string, T> = Immutable.OrderedMap<string, T>().asMutable();

  get state() {
    return this._state;
  }

  set state(state: Immutable.OrderedMap<string, T>) {
    this._state = state;
  }

  private _changes: Immutable.OrderedMap<string, T> = Immutable.OrderedMap<string, T>().asMutable();

  get changes() {
    return this._changes;
  }

  get size(): number {
    return this._state.size;
  }

  get(fieldName: string) {
    return this._state.get(fieldName);
  }

  has(fieldName: string) {
    return this._state.has(fieldName);
  }

  getIn(path: string[]) {
    return this._state.getIn(path);
  }

  hasIn(path: string[]) {
    return this._state.hasIn(path);
  }

  set(fieldName: string, item: T, setChanges = true) {
    if (setChanges) {
      this._changes.set(fieldName, item);
    }
    this._state.set(fieldName, item);
  }

  setIn(path: string[], item: any, setChanges = true) {
    if (setChanges) {
      this._changes.setIn(path, item);
    }
    this._state.setIn(path, item);
  }

}
