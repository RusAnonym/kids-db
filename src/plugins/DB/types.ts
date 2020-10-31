export interface DataBaseStructure {
	name: string;
	path: string;
	elements: number;
	tempStorage: Array<ElementInDB>;
}

export interface ElementInDB {
	name: string;
}
