import * as fs from "fs";
import * as path from "path";
import * as BSON from "bson";
import * as UBJSON from "@shelacek/ubjson";

const config: {
	mode: "JSON" | "BSON" | "UBJSON";
	interval: any;
	DB_Dir: string;
	DB_Path: string;
	tempData: Array<any>;
} = {
	mode: "JSON",
	interval: null,
	DB_Dir: "Kids_DB_Data",
	DB_Path: "",
	tempData: [],
};

const encoding = {
	json: {
		encode: async function (data: any) {
			return Buffer.from(JSON.stringify(data));
		},
		decode: async function (data: any) {
			return await JSON.parse(data);
		},
	},
	bson: {
		encode: async function (data: any) {
			return BSON.serialize(data);
		},
		decode: async function (data: any) {
			return BSON.deserialize(data);
		},
	},
	ubjson: {
		encode: async function (data: any) {
			return Buffer.from(UBJSON.encode(data));
		},
		decode: async function (data: any) {
			return await UBJSON.decode(data);
		},
	},
};

const PossibleEncoding = [
	{
		ext: `json`,
		format: `JSON`,
		functions: encoding.json,
	},
	{
		ext: `bson`,
		format: `BSON`,
		functions: encoding.bson,
	},
	{
		ext: `ubjson`,
		format: `UBJSON`,
		functions: encoding.ubjson,
	},
];

const PossibleModes = PossibleEncoding.map(function (x) {
	return x.ext;
});

const internal = {
	checkExistingDBDir: async () => {
		return fs.existsSync(config.DB_Path + config.DB_Dir);
	},
	createDBDir: async () => {
		return fs.mkdirSync(config.DB_Path + config.DB_Dir);
	},
	createDB: async (DB_Name: string) => {
		if ((await internal.checkExistingDBDir()) === true) {
		} else {
		}
	},
};

export { fs, path, config, PossibleEncoding, PossibleModes };
