import { ElementInDB } from "./types";
import * as core from "./core";
import { throws } from "assert";

class DataBase {
	private options: {
		name: string;
		mode: string;
		ttl: number;
		static: boolean;
	} = {
		name: "",
		mode: core.config.mode,
		ttl: 180,
		static: false,
	};

	private database: Array<ElementInDB> = [];
	private status: "created" | "initialized" = "created";

	constructor(
		DB_Name: string,
		options: { mode: `json` | `bson` | `ubjson`; ttl: number; static: boolean },
	) {
		this.options.name = DB_Name;
		this.options.mode = options.mode || this.options.mode;
		this.options.ttl = options.ttl || this.options.ttl;
		this.options.static = options.static || this.options.static;
	}

	async init() {
		if (this.status === "created") {
			if (
				this.options.ttl < 1 ||
				this.options.ttl === Infinity ||
				!core.PossibleModes.find((x) =>
					new RegExp(x, `gi`).test(this.options.mode),
				)
			) {
				throw new Error(`One of the parameters is incorrect`);
			}
		} else {
			throw new Error(`Database already initialized`);
		}
	}
}
