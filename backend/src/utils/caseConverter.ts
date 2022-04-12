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
export function convertObjKeysToCamelCase(obj: Object): Object {
    return mapKeys(obj, (value, key) => convertToCamelCase(key));
}

/**
 * Converts an list of object's keys to camelcase.
 * 
 * @param {Object[]} objList
 * @returns {Object[]}
 */
export function convertObjListToCamelCase(objList: Object[]): Object[] {
    return objList.map(obj =>convertObjKeysToCamelCase(obj));
}
