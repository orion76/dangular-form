import * as Immutable from "immutable";
import {IStateAbstract, StateAbstract} from "./state.abstract";
import {TEnumFilters} from "@libcomm/interfaces/config/select-options.interfaces";
import {IField, IFieldConfig, IFieldEnumState, TFieldConfig} from "@libcomm/interfaces/config/fields/types";
import {fieldFactory} from "@libcomm/interfaces/config/fields/factory";


export interface IFormStateFields extends IStateAbstract<IField> {

  filterEnums(): Immutable.OrderedMap<string, IField>;

  // add(fieldName: string);

  setFilter(fieldName: string, fieldFilter: string, values: string[]);

  getFilter(fieldName: string): TEnumFilters;

  selectId(fieldName: string): string;

  addFields(configs: IFieldConfig[]);
}

export class FormStateFields extends StateAbstract<IField> implements IFormStateFields {


  // add(fieldName: string) {
  //   this.set(fieldName, new this.stateFactory({}));
  // }


  addFields(configs: IFieldConfig[]) {
    configs.forEach((config: TFieldConfig) => {
      this._state.set(config.name, fieldFactory(config));
    });
  }

  selectId(fieldName: string): string {
    return this._state.getIn([fieldName, 'selectId']);
  }

  filterEnums() {
    return this._state
      .filter((state: IField, fieldName: string) => {

        return state.type === 'enum';
      });
  }

  fieldEnum(fieldName: string): IFieldEnumState {
    return this._state.get(fieldName) as IFieldEnumState;
  }

  getFilter(fieldName: string): TEnumFilters {

    const state: IFieldEnumState = this.fieldEnum(fieldName);
    return state.filters;
  }

  setFilter(fieldName: string, fieldFilter: string, values: string[]) {
    const field = Immutable.fromJS(this.get(fieldName));


    if (!field.has('filters')) {
      const filters = Immutable.OrderedMap<string, Immutable.Set<string>>();
      field.set('filters', filters);
    }
    if (!field.filters.has(fieldFilter)) {
      field.filters.set(fieldFilter, Immutable.Set());
    }
    const _values: Immutable.Set<string> = field.getIn(['filters']).asMutable();
    _values.merge(values);

    const newField = field.set('filters', _values);

    this.set(fieldName, newField);

  }

}

