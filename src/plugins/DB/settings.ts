import { config, path } from "./core";

const settings = {
	setDataBaseDir: async (newDir: string): Promise<true> => {
		config.DB_Dir = newDir;
		return true;
	},
	setDataBasePath: async (newPath: string): Promise<true> => {
		config.DB_Path = newPath;
		return true;
	},
	setFullDataBasePath: async (fullPath: string): Promise<true> => {
		config.DB_Dir = path.basename(fullPath);
		config.DB_Path = path.dirname(fullPath);
		return true;
	},
};

export { settings };
