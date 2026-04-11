INSTALL_PATH=~/.local/share/FoundryVTT/Data/modules/monsterblock

.PHONY: install lint

lint:
	npx eslint monsterblock.js scripts/ macros.js

compress:
	gulp

install: compress
	rm -rf $(INSTALL_PATH)
	mkdir $(INSTALL_PATH)
	unzip module.zip -d $(INSTALL_PATH)