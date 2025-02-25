import Flags from "../Flags.js";

export default class Flags5e extends Flags {
	/**
	 * @inheritdoc
	 * @type {Object<string, FlagDetails>}
	 * @readonly
	 * @static
	 * @memberof Flags5e
	 */
	static get flagDefaults() {
		return mergeObject(super.flagDefaults, {
			"initProfMult"      	   : { type: Number , default: 0     },
			"attack-descriptions"      : { type: Boolean, default: true  },
			"casting-feature"          : { type: Boolean, default: true  },
			"current-hit-points"       : { type: Boolean, default: true  },
			"maximum-hit-points"       : { type: Boolean, default: true  },
			"show-temporary-hit-points": { type: Boolean, default: false  },
			"show-legendary-resistance": { type: Boolean, default: false  },
			"show-rest-buttons"        : { type: Boolean, default: false  },
			"show-lair-actions"        : { type: Boolean, default: false },
			"show-not-prof"            : { type: Boolean, default: false },
			"show-resources"           : { type: Boolean, default: true  },
			"show-skill-save"          : { type: Boolean, default: true  },
			"show-bio"                 : { type: Boolean, default: false, hidden: true  }
		});
	}	
}
