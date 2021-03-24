import filestream from 'fs';
import { _baseDirName } from './Directories';

export enum Group {
	'FVariable',
	'FLog',
	'DFLog',
	'SFLog',
	'FFlag',
	'DFFlag',
	'SFFlag',
	'FInt',
	'DFInt',
	'SFInt',
	'FString',
	'DFString',
	'SFString',
	'FPFilter',
	'FSettings',
	'UExperiment',
	'BTExperiment',
	'SExperiment',
	'All',
}

export namespace ClientSettings {
	/**
	 * Gets all the settings with the given SettingsGroup type.
	 * @param {Group} settingsType The type of settings to fetch.
	 * @param {string} settingsGroup The group to get, Web by default. Defined in Settings.FSettings.
	 * @returns {Record<String, unknown> | string[]} Returns a K and V Map or a string array.
	 */
	export const GetSettings = <SettingsType extends Group>(
		settingsType: SettingsType,
		settingsGroup: string = 'Web',
	): Record<string, unknown> | string[] | Error => {
		const settings = JSON.parse(filestream.readFileSync(_baseDirName + '\\Default\\Settings.json', 'ascii'));
		if (settingsType || settingsType === 0 || settingsType === Group.FFlag) {
			switch (settingsType as Group) {
				case Group.FVariable:
					return settings[settingsGroup]['FVariable'];
				case Group.FLog:
					return settings[settingsGroup]['FLog'];
				case Group.SFLog:
					return settings[settingsGroup]['SFLog'];
				case Group.DFLog:
					return settings[settingsGroup]['DFLog'];
				case Group.FFlag:
					return settings[settingsGroup]['FFlag'];
				case Group.DFFlag:
					return settings[settingsGroup]['DFFlag'];
				case Group.SFFlag:
					return settings[settingsGroup]['SFFlag'];
				case Group.FInt:
					return settings[settingsGroup]['FInt'];
				case Group.DFInt:
					return settings[settingsGroup]['DFInt'];
				case Group.SFInt:
					return settings[settingsGroup]['SFInt'];
				case Group.FString:
					return settings[settingsGroup]['FString'];
				case Group.DFString:
					return settings[settingsGroup]['DFString'];
				case Group.SFString:
					return settings[settingsGroup]['SFString'];
				case Group.FPFilter:
					return settings[settingsGroup]['FPFilter'];
				case Group.FSettings:
					return settings['FSettings'];
				case Group.UExperiment:
					return settings[settingsGroup]['UExperiment'];
				case Group.BTExperiment:
					return settings[settingsGroup]['BTExperiment'];
				case Group.SExperiment:
					return settings[settingsGroup]['SExperiment'];
				case Group.All:
					return settings[settingsGroup];
				default:
					return new Error(`Settings Group '${settingsType}' doesn't exist.`);
			}
		}
	};

	/**
	 * Gets all the settings from the settings file where they aren't explicitly prefixed with something such as FFlag
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, boolean | number | string>} Returns a K, V Map that can either be a String, Number or Boolean.
	 */
	export const GetFVariables = (ctx: string = 'Web') => {
		return GetSettings(Group.FVariable, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are FastLogs, prefixed with FLog;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, number>} Returns a K, V Map where the values are numbers.
	 */
	export const GetFLogs = (ctx: string = 'Web') => {
		return GetSettings(Group.FLog, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are DynamicFastLogs, prefixed with DFLog;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, number>} Returns a K, V Map where the values are numbers.
	 */
	export const GetDFLogs = (ctx: string = 'Web') => {
		return GetSettings(Group.DFLog, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are SynchornizedFastLogs, prefixed with SFLog;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, number>} Returns a K, V Map where the values are numbers.
	 */
	export const GetSFLogs = (ctx: string = 'Web') => {
		return GetSettings(Group.SFLog, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are FastFlags, prefixed with FFlag;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, boolean>} Returns a K, V Map where the values are booleans.
	 */
	export const GetFFlags = (ctx: string = 'Web') => {
		return GetSettings(Group.FFlag, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are DynamicFastFlags, prefixed with DFFlag;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, boolean>} Returns a K, V Map where the values are booleans.
	 */
	export const GetDFFlags = (ctx: string = 'Web') => {
		return GetSettings(Group.DFFlag, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are SynchornizedFastFlags, prefixed with SFFlag;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, boolean>} Returns a K, V Map where the values are booleans.
	 */
	export const GetSFFlags = (ctx: string = 'Web') => {
		return GetSettings(Group.SFFlag, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are FastInts, prefixed with FInt;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, number>} Returns a K, V Map where the values are booleans.
	 */
	export const GetFInts = (ctx: string = 'Web') => {
		return GetSettings(Group.FInt, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are DynamicFastInts, prefixed with DFInt;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, number>} Returns a K, V Map where the values are booleans.
	 */
	export const GetDFInts = (ctx: string = 'Web') => {
		return GetSettings(Group.DFInt, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are SynchornizedFastInts, prefixed with SFInt;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, number>} Returns a K, V Map where the values are booleans.
	 */
	export const GetSFInts = (ctx: string = 'Web') => {
		return GetSettings(Group.SFInt, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are FastStrings, prefixed with FString;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, string>} Returns a K, V Map where the values are booleans.
	 */
	export const GetFStrings = (ctx: string = 'Web') => {
		return GetSettings(Group.FString, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are DynamicFastStrings, prefixed with DFString;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, string>} Returns a K, V Map where the values are booleans.
	 */
	export const GetDFStrings = (ctx: string = 'Web') => {
		return GetSettings(Group.DFString, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are SynchornizedFastStrings, prefixed with SFString;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, string>} Returns a K, V Map where the values are booleans.
	 */
	export const GetSFStrings = (ctx: string = 'Web') => {
		return GetSettings(Group.SFString, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are FastPlaceFilters, prefixed with FPFilter;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {Record<string, unknown>} Returns a K, V Map where the values are booleans.
	 */
	export const GetFPFilters = (ctx: string = 'Web') => {
		return GetSettings(Group.FPFilter, ctx);
	};

	/**
	 * Gets all the settings from the settings file that are FastSettings, prefixed with FSettings;
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {string[]} Returns a K, V Map where the values are booleans.
	 */
	export const GetFSettings = (ctx: string = 'Web') => {
		return GetSettings(Group.FSettings, ctx);
	};

	/**
	 * Gets all the settings from the given context.
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {unknown} Retuns a K, V map.
	 */
	export const GetAllSettings = (ctx: string = 'Web') => {
		return GetSettings(Group.All, ctx);
	};

	/**
	 * Checks if a placeId is in a FPFilter
	 * @param {string} key The key to check.
	 * @param {number} placeId The number to validate.
	 * @param {string} ctx The context to grab the settings from, Web by default;
	 * @returns {boolean} Returns a boolean.
	 */
	export const GetPlaceIdInPlaceFilter = (key: string, placeId: number, ctx: string = 'Web'): boolean => {
		const FPFilter = ClientSettings.GetFPFilters(ctx);
		if (FPFilter === undefined) return false;

		const keyFilter = FPFilter[key] as Record<string, unknown>;
		if (keyFilter === undefined) return false;
		let isInFilter = false;
		(<number[]>keyFilter['PlaceIds']).forEach((id) => {
			if (id === placeId) isInFilter = true;
		});
		return isInFilter;
	};
}
