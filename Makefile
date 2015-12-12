all: clean run
folders:
	mkdir -p assets
	mkdir -p js
	mkdir -p css
	mkdir -p js/lib
	mkdir -p assets/images

server:
	chmod +x server.sh

run: folders server
	./server.sh

clean:
	rm -rf *~
	rm -rf */*~
	rm -rf */*/*~
