import { mapKeys, camelCase } from 'lodash';

/**
 * Converts a string to camelcase.
 * 
 * @param {string} str
 * @returns {string}
 */
export function convertToCamelCase(str: string): string {
    return camelCase(str);
}

/**
 * Converts an object's keys to camelcase.
 * 
 * @param {Object} obj
 * @returns {Object}
 */
export function convertObjKeysToCamelCase(obj: Object): Object{
    return mapKeys(obj, (_, key) => convertToCamelCase(key));
}

/**
 * Converts an list of object's keys to camelcase.
 * 
 * @param {T[]} objList
 * @returns {T[]}
 */
export function convertObjListToCamelCase<T>(objList: T[]): T[] {
    return objList.map(obj =>convertObjKeysToCamelCase(obj) as T);
}
