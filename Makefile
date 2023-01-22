INSTALL_PATH=~/.local/share/FoundryVTT/Data/modules/monsterblock

.PHONY: install

install:
	gulp
	rm -rf $(INSTALL_PATH)
	mkdir $(INSTALL_PATH)
	unzip monsterblock.zip -d $(INSTALL_PATH)