import MonsterBlock5e from "./MonsterBlock5e.js";
import AttackPreper from "./AttackPreper.js";
import CastingPreper from "./CastingPreper.js";
import ActionPreper from "./ActionPreper.js";
import ItemPreper from "./ItemPreper.js";
import InnateSpellbookPrep from "./InnateSpellbookPrep.js"

/**
 * @typedef {import{"../../../../systems/dnd5e/module/item/sheet.js"}.Item5e} Item5e
 */

/**
 * Defines an item classification
 *
 * @typedef   Feature
 * @property {typeof ItemPreper} prep         - An item preparation class for this type of item
 * @property {Function}          filter       - A filtering function to locate items of this type
 * @property {Array}             items        - An array of items of this type
 * @property {object}            dataset      - An object of additional data
 * @property {string}            dataset.type - The "type" of the item that dnd5e recognizes
*/

export default class ItemPrep {
	/**
	 * Creates an instance of ItemPrep.
	 *
	 * @param {MonsterBlock5e} sheet
	 * @param {object}         system
	 * @memberof ItemPrep
	 */
	constructor(sheet, system) {
		this.sheet = sheet;
		this.system = system;
		this.system.features = this.features;

		this.prepareItems();
	}
	
	/** @type {Object.<string, Feature>} A set of item classifications by type */
	features = {
		legResist:	  { prep: ItemPreper,    filter: MonsterBlock5e.isLegendaryResistance,        items: [], dataset: {type: "feat"}   },
		legendary:	  { prep: ActionPreper,  filter: MonsterBlock5e.isLegendaryAction,            items: [], dataset: {type: "feat"}   },
		lair:		  { prep: ActionPreper,  filter: MonsterBlock5e.isLairAction,                 items: [], dataset: {type: "feat"}   },
		multiattack:  { prep: ActionPreper,  filter: MonsterBlock5e.isMultiAttack,                items: [], dataset: {type: "feat"}   },
		casting:	  { prep: CastingPreper, filter: CastingPreper.isCasting.bind(CastingPreper), items: [], dataset: {type: "feat"}   },
		reaction:	  { prep: ActionPreper,  filter: MonsterBlock5e.isReaction,                   items: [], dataset: {type: "feat"}   },
		bonusActions: { prep: ActionPreper,  filter: MonsterBlock5e.isBonusAction,                items: [], dataset: {type: "feat"}   },
		attacks:	  { prep: AttackPreper,  filter: item => item.type === "weapon",              items: [], dataset: {type: "weapon"} },
		actions:	  { prep: ActionPreper,  filter: MonsterBlock5e.isAction,                     items: [], dataset: {type: "feat"}   },
		features:	  { prep: ItemPreper,    filter: item => item.type === "feat",                items: [], dataset: {type: "feat"}   },
		equipment:	  { prep: ItemPreper,    filter: () => true,                                  items: [], dataset: {type: "loot"}   }
	};
	
	/**
	 * Classify all items, prepare them, and prepare spellbooks.
	 *
	 * @memberof ItemPrep
	 */
	prepareItems() {
		const [other, spells] = this.system.items.partition(item => item.type === "spell");
		this.organizeSpellbooks(spells);
		this.organizeFeatures(other);
	}

	/**
	 * Prepares and organizes the regular and innate spellbooks
	 *
	 * @param {array} spells - All the spell items
	 * @memberof ItemPrep
	 */
	organizeSpellbooks(spells) {
		this.system.spellbook = this.sheet._prepareSpellbook(this.system, spells);
		this.system.innateSpellbook = new InnateSpellbookPrep(this.system.spellbook, this.sheet).prepare();
	}

	/**
	 * Sort and prepare all non-spell items
	 *
	 * @param {array} items
	 * @memberof ItemPrep
	 */
	organizeFeatures(items) {
		for (let item of items) {
			const category = Object.values(this.features).find(cat => cat.filter(item));
			this.prepareItem(category, item, this.system);
			category.items.push(item);
		}
	}

	/**
	 * Create an instance of the appropriate item preparer, 
	 * then prepare the item and its resources.
	 *
	 * @param {Feature} category - The type of item
	 * @param {Item5e} item      - The instance of the item
	 * @param {object} system      - The data for the template
	 * @return {void} 
	 * @memberof ItemPrep
	 */
	prepareItem(category, item, system) {
		const preparer = new category.prep(this.sheet, item, system);
		preparer.prepResources();
		preparer.prepare();
	}
}