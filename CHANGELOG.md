# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.1.18 (2023-09-22)


### Features

* add getFirstText ([fe68979](https://github.com/worktile/slate-yjs/commit/fe6897912a6d9779add3499df37609f33fcccddc))
* add is_undo ([28c98d3](https://github.com/worktile/slate-yjs/commit/28c98d3cdd1c54a5132fa666d359eb49e67c7425))
* add try catch for yjs editor ([ac9b4df](https://github.com/worktile/slate-yjs/commit/ac9b4df6ecd538ce6af0efd6e59526f8a92acc8a))
* add undo plugin #Wik-4733 ([f5c716c](https://github.com/worktile/slate-yjs/commit/f5c716ce6560414fafb69a090c97d6d5c124e551)), closes [#Wik-4733](https://github.com/worktile/slate-yjs/issues/Wik-4733)
* **core:** use toJSON to initialize data #WIK-4535 ([4485ecc](https://github.com/worktile/slate-yjs/commit/4485eccc9d606ee4998ab2e51066c6022b2b9837)), closes [#WIK-4535](https://github.com/worktile/slate-yjs/issues/WIK-4535)
* **error:** handle error ([1420814](https://github.com/worktile/slate-yjs/commit/14208146875a5bb7d64cffb918c8afb1e3bd8d5d))
* support typeScope and fix test error #WIK-12483 ([857553e](https://github.com/worktile/slate-yjs/commit/857553ee8cffb47c00101a83b533055cc350f956)), closes [#WIK-12483](https://github.com/worktile/slate-yjs/issues/WIK-12483)
* **yjs-editor:** add is sync value option ([#28](https://github.com/worktile/slate-yjs/issues/28)) ([db5af22](https://github.com/worktile/slate-yjs/commit/db5af224709cd6a790328eff1cd030040dcd0d1f))


### Bug Fixes

* add undo and redo to withUndoManager #WIK-4733 ([b1cf79d](https://github.com/worktile/slate-yjs/commit/b1cf79d4f6eb91225f2646d6fc386fd156551526)), closes [#WIK-4733](https://github.com/worktile/slate-yjs/issues/WIK-4733)
* adjust changelog ([4d27490](https://github.com/worktile/slate-yjs/commit/4d27490244f1371b869036ae3fbad732baa2b8fe))
* **apply:** return null when apply is not exit in slate operation #WIK-12562 ([d03e0f9](https://github.com/worktile/slate-yjs/commit/d03e0f9c99779d873b972de83caf1f21b42f1e59)), closes [#WIK-12562](https://github.com/worktile/slate-yjs/issues/WIK-12562)
* bind decorate to root node #WIK-4803 ([fdf715e](https://github.com/worktile/slate-yjs/commit/fdf715e96be42c360c1af5df677d2331aeba8e22)), closes [#WIK-4803](https://github.com/worktile/slate-yjs/issues/WIK-4803)
* **core:** fix text distinguish error in plait draw ([fa6e24c](https://github.com/worktile/slate-yjs/commit/fa6e24c1853a4b8e66f510827c1032983022a640))
* **core:** fix the undo operation does not take effect remotely #WIK-4555 ([dd31260](https://github.com/worktile/slate-yjs/commit/dd3126085552bf33270fa4352bec5b4cddc7c39a)), closes [#WIK-4555](https://github.com/worktile/slate-yjs/issues/WIK-4555)
* correct typo ([a5eb196](https://github.com/worktile/slate-yjs/commit/a5eb19684dd27ba22c7a77076e4efc370165f09c))
* **cursor:** fix absolutePositionToRelativePosition error ([fe47657](https://github.com/worktile/slate-yjs/commit/fe47657db4519a7885f432fbb6899bde785b9abd))
* **cursor:** fix wrong path ([#11](https://github.com/worktile/slate-yjs/issues/11)) ([a02df8b](https://github.com/worktile/slate-yjs/commit/a02df8bb5c8c883cbd7569facc0679eb338ecc60))
* delay execution onChange #WIK-12573 ([#34](https://github.com/worktile/slate-yjs/issues/34)) ([52f55f7](https://github.com/worktile/slate-yjs/commit/52f55f7d2526015f1cd9dddc10ef33e7163256a7)), closes [#WIK-12573](https://github.com/worktile/slate-yjs/issues/WIK-12573)
* fix cursor position #WIK-4778 ([94beeca](https://github.com/worktile/slate-yjs/commit/94beecadbc72b71587875c8eabdd6a377431ec7b)), closes [#WIK-4778](https://github.com/worktile/slate-yjs/issues/WIK-4778)
* fix test error #WIK-4724 ([2d0190f](https://github.com/worktile/slate-yjs/commit/2d0190f5ff6541bb04a58b5a7ccb69a01edb39b8)), closes [#WIK-4724](https://github.com/worktile/slate-yjs/issues/WIK-4724)
* optmize code ([3ad87b1](https://github.com/worktile/slate-yjs/commit/3ad87b11df86674fccf8e5aeed56751f05042058))
* optmize code  #WIK-4764 ([ec2901a](https://github.com/worktile/slate-yjs/commit/ec2901aff9965cd9071e29678514cb13958e95e9)), closes [#WIK-4764](https://github.com/worktile/slate-yjs/issues/WIK-4764)
* optmzie code #WIK-12483 ([efeb750](https://github.com/worktile/slate-yjs/commit/efeb7506421458a887c82c4c62f99bfab9c4b7bc)), closes [#WIK-12483](https://github.com/worktile/slate-yjs/issues/WIK-12483)
* prevent applySlateOperations when isUndo ([3129343](https://github.com/worktile/slate-yjs/commit/3129343faf173b8f39d6e8a8dcfe72ee8ebf0cb8))
* remove key when newProperties is null #WIK-4933 ([ead4742](https://github.com/worktile/slate-yjs/commit/ead4742ad6f147a794b43f2c60300c30c0aba1fe)), closes [#WIK-4933](https://github.com/worktile/slate-yjs/issues/WIK-4933)
* remove normalizing when operation is remote #WIK-4764 ([4bb8793](https://github.com/worktile/slate-yjs/commit/4bb879333d67d7d4d1e02a0b8dd65f7ffc52393b)), closes [#WIK-4764](https://github.com/worktile/slate-yjs/issues/WIK-4764)

### [0.1.17](https://github.com/worktile/slate-yjs/compare/v0.1.16...v0.1.17) (2023-07-13)


### Bug Fixes

* delay execution onChange #WIK-12573 ([#34](https://github.com/worktile/slate-yjs/issues/34)) ([52f55f7](https://github.com/worktile/slate-yjs/commit/52f55f7d2526015f1cd9dddc10ef33e7163256a7)), closes [#WIK-12573](https://github.com/worktile/slate-yjs/issues/WIK-12573)

### [0.1.16](https://github.com/worktile/slate-yjs/compare/v0.1.15...v0.1.16) (2023-07-07)


### Bug Fixes

* adjust changelog ([4d27490](https://github.com/worktile/slate-yjs/commit/4d27490244f1371b869036ae3fbad732baa2b8fe))
* **apply:** return null when apply is not exit in slate operation #WIK-12562 ([d03e0f9](https://github.com/worktile/slate-yjs/commit/d03e0f9c99779d873b972de83caf1f21b42f1e59)), closes [#WIK-12562](https://github.com/worktile/slate-yjs/issues/WIK-12562)

### 0.1.15 (2023-07-07)


### Features

*support typeScope and fix test error #WIK-12483 ([857553e](https://github.com/worktile/y-slate/commit/857553ee8cffb47c00101a83b533055cc350f956))


### Bug Fixes
* optmize code ([efeb75](https://github.com/worktile/y-slate/commit/efeb7506421458a887c82c4c62f99bfab9c4b7bc))


### 0.1.14 (2021-10-26)


### Features

* add getFirstText ([fe68979](https://github.com/worktile/slate-yjs/commit/fe6897912a6d9779add3499df37609f33fcccddc))
* add is_undo ([28c98d3](https://github.com/worktile/slate-yjs/commit/28c98d3cdd1c54a5132fa666d359eb49e67c7425))
* add try catch for yjs editor ([ac9b4df](https://github.com/worktile/slate-yjs/commit/ac9b4df6ecd538ce6af0efd6e59526f8a92acc8a))
* add undo plugin #Wik-4733 ([f5c716c](https://github.com/worktile/slate-yjs/commit/f5c716ce6560414fafb69a090c97d6d5c124e551)), closes [#Wik-4733](https://github.com/worktile/slate-yjs/issues/Wik-4733)
* **core:** use toJSON to initialize data #WIK-4535 ([4485ecc](https://github.com/worktile/slate-yjs/commit/4485eccc9d606ee4998ab2e51066c6022b2b9837)), closes [#WIK-4535](https://github.com/worktile/slate-yjs/issues/WIK-4535)
* **error:** handle error ([1420814](https://github.com/worktile/slate-yjs/commit/14208146875a5bb7d64cffb918c8afb1e3bd8d5d))
* **yjs-editor:** add is sync value option ([#28](https://github.com/worktile/slate-yjs/issues/28)) ([db5af22](https://github.com/worktile/slate-yjs/commit/db5af224709cd6a790328eff1cd030040dcd0d1f))


### Bug Fixes

* add undo and redo to withUndoManager #WIK-4733 ([b1cf79d](https://github.com/worktile/slate-yjs/commit/b1cf79d4f6eb91225f2646d6fc386fd156551526)), closes [#WIK-4733](https://github.com/worktile/slate-yjs/issues/WIK-4733)
* bind decorate to root node #WIK-4803 ([fdf715e](https://github.com/worktile/slate-yjs/commit/fdf715e96be42c360c1af5df677d2331aeba8e22)), closes [#WIK-4803](https://github.com/worktile/slate-yjs/issues/WIK-4803)
* **core:** fix the undo operation does not take effect remotely #WIK-4555 ([dd31260](https://github.com/worktile/slate-yjs/commit/dd3126085552bf33270fa4352bec5b4cddc7c39a)), closes [#WIK-4555](https://github.com/worktile/slate-yjs/issues/WIK-4555)
* correct typo ([0670917](https://github.com/worktile/slate-yjs/commit/06709179a9f1ff9dc2ceb8ff419aac3f2ec5e222))
* **cursor:** fix absolutePositionToRelativePosition error ([fe47657](https://github.com/worktile/slate-yjs/commit/fe47657db4519a7885f432fbb6899bde785b9abd))
* **cursor:** fix wrong path ([#11](https://github.com/worktile/slate-yjs/issues/11)) ([a02df8b](https://github.com/worktile/slate-yjs/commit/a02df8bb5c8c883cbd7569facc0679eb338ecc60))
* fix cursor position #WIK-4778 ([94beeca](https://github.com/worktile/slate-yjs/commit/94beecadbc72b71587875c8eabdd6a377431ec7b)), closes [#WIK-4778](https://github.com/worktile/slate-yjs/issues/WIK-4778)
* fix test error #WIK-4724 ([2d0190f](https://github.com/worktile/slate-yjs/commit/2d0190f5ff6541bb04a58b5a7ccb69a01edb39b8)), closes [#WIK-4724](https://github.com/worktile/slate-yjs/issues/WIK-4724)
* optmize code ([3ad87b1](https://github.com/worktile/slate-yjs/commit/3ad87b11df86674fccf8e5aeed56751f05042058))
* optmize code  #WIK-4764 ([ec2901a](https://github.com/worktile/slate-yjs/commit/ec2901aff9965cd9071e29678514cb13958e95e9)), closes [#WIK-4764](https://github.com/worktile/slate-yjs/issues/WIK-4764)
* prevent applySlateOperations when isUndo ([3129343](https://github.com/worktile/slate-yjs/commit/3129343faf173b8f39d6e8a8dcfe72ee8ebf0cb8))
* remove key when newProperties is null #WIK-4933 ([ead4742](https://github.com/worktile/slate-yjs/commit/ead4742ad6f147a794b43f2c60300c30c0aba1fe)), closes [#WIK-4933](https://github.com/worktile/slate-yjs/issues/WIK-4933)
* remove normalizing when operation is remote #WIK-4764 ([4bb8793](https://github.com/worktile/slate-yjs/commit/4bb879333d67d7d4d1e02a0b8dd65f7ffc52393b)), closes [#WIK-4764](https://github.com/worktile/slate-yjs/issues/WIK-4764)

### 0.1.13 (2021-10-26)


### Features

* add getFirstText ([fe68979](https://github.com/worktile/slate-yjs/commit/fe6897912a6d9779add3499df37609f33fcccddc))
* add is_undo ([28c98d3](https://github.com/worktile/slate-yjs/commit/28c98d3cdd1c54a5132fa666d359eb49e67c7425))
* add try catch for yjs editor ([ac9b4df](https://github.com/worktile/slate-yjs/commit/ac9b4df6ecd538ce6af0efd6e59526f8a92acc8a))
* add undo plugin #Wik-4733 ([f5c716c](https://github.com/worktile/slate-yjs/commit/f5c716ce6560414fafb69a090c97d6d5c124e551)), closes [#Wik-4733](https://github.com/worktile/slate-yjs/issues/Wik-4733)
* **core:** use toJSON to initialize data #WIK-4535 ([4485ecc](https://github.com/worktile/slate-yjs/commit/4485eccc9d606ee4998ab2e51066c6022b2b9837)), closes [#WIK-4535](https://github.com/worktile/slate-yjs/issues/WIK-4535)
* **error:** handle error ([1420814](https://github.com/worktile/slate-yjs/commit/14208146875a5bb7d64cffb918c8afb1e3bd8d5d))
* **yjs-editor:** add is sync value option ([#28](https://github.com/worktile/slate-yjs/issues/28)) ([db5af22](https://github.com/worktile/slate-yjs/commit/db5af224709cd6a790328eff1cd030040dcd0d1f))


### Bug Fixes

* add undo and redo to withUndoManager #WIK-4733 ([b1cf79d](https://github.com/worktile/slate-yjs/commit/b1cf79d4f6eb91225f2646d6fc386fd156551526)), closes [#WIK-4733](https://github.com/worktile/slate-yjs/issues/WIK-4733)
* bind decorate to root node #WIK-4803 ([fdf715e](https://github.com/worktile/slate-yjs/commit/fdf715e96be42c360c1af5df677d2331aeba8e22)), closes [#WIK-4803](https://github.com/worktile/slate-yjs/issues/WIK-4803)
* **core:** fix the undo operation does not take effect remotely #WIK-4555 ([dd31260](https://github.com/worktile/slate-yjs/commit/dd3126085552bf33270fa4352bec5b4cddc7c39a)), closes [#WIK-4555](https://github.com/worktile/slate-yjs/issues/WIK-4555)
* **cursor:** fix absolutePositionToRelativePosition error ([fe47657](https://github.com/worktile/slate-yjs/commit/fe47657db4519a7885f432fbb6899bde785b9abd))
* **cursor:** fix wrong path ([#11](https://github.com/worktile/slate-yjs/issues/11)) ([a02df8b](https://github.com/worktile/slate-yjs/commit/a02df8bb5c8c883cbd7569facc0679eb338ecc60))
* fix cursor position #WIK-4778 ([94beeca](https://github.com/worktile/slate-yjs/commit/94beecadbc72b71587875c8eabdd6a377431ec7b)), closes [#WIK-4778](https://github.com/worktile/slate-yjs/issues/WIK-4778)
* fix test error #WIK-4724 ([2d0190f](https://github.com/worktile/slate-yjs/commit/2d0190f5ff6541bb04a58b5a7ccb69a01edb39b8)), closes [#WIK-4724](https://github.com/worktile/slate-yjs/issues/WIK-4724)
* optmize code ([3ad87b1](https://github.com/worktile/slate-yjs/commit/3ad87b11df86674fccf8e5aeed56751f05042058))
* optmize code  #WIK-4764 ([ec2901a](https://github.com/worktile/slate-yjs/commit/ec2901aff9965cd9071e29678514cb13958e95e9)), closes [#WIK-4764](https://github.com/worktile/slate-yjs/issues/WIK-4764)
* prevent applySlateOperations when isUndo ([3129343](https://github.com/worktile/slate-yjs/commit/3129343faf173b8f39d6e8a8dcfe72ee8ebf0cb8))
* remove key when newProperties is null #WIK-4933 ([ead4742](https://github.com/worktile/slate-yjs/commit/ead4742ad6f147a794b43f2c60300c30c0aba1fe)), closes [#WIK-4933](https://github.com/worktile/slate-yjs/issues/WIK-4933)
* remove normalizing when operation is remote #WIK-4764 ([4bb8793](https://github.com/worktile/slate-yjs/commit/4bb879333d67d7d4d1e02a0b8dd65f7ffc52393b)), closes [#WIK-4764](https://github.com/worktile/slate-yjs/issues/WIK-4764)

### 0.1.12 (2021-10-18)


### Features

* add getFirstText ([fe68979](https://github.com/worktile/slate-yjs/commit/fe6897912a6d9779add3499df37609f33fcccddc))
* add is_undo ([28c98d3](https://github.com/worktile/slate-yjs/commit/28c98d3cdd1c54a5132fa666d359eb49e67c7425))
* add try catch for yjs editor ([ac9b4df](https://github.com/worktile/slate-yjs/commit/ac9b4df6ecd538ce6af0efd6e59526f8a92acc8a))
* add undo plugin #Wik-4733 ([f5c716c](https://github.com/worktile/slate-yjs/commit/f5c716ce6560414fafb69a090c97d6d5c124e551)), closes [#Wik-4733](https://github.com/worktile/slate-yjs/issues/Wik-4733)
* **core:** use toJSON to initialize data #WIK-4535 ([4485ecc](https://github.com/worktile/slate-yjs/commit/4485eccc9d606ee4998ab2e51066c6022b2b9837)), closes [#WIK-4535](https://github.com/worktile/slate-yjs/issues/WIK-4535)
* **error:** handle error ([1420814](https://github.com/worktile/slate-yjs/commit/14208146875a5bb7d64cffb918c8afb1e3bd8d5d))


### Bug Fixes

* add undo and redo to withUndoManager #WIK-4733 ([b1cf79d](https://github.com/worktile/slate-yjs/commit/b1cf79d4f6eb91225f2646d6fc386fd156551526)), closes [#WIK-4733](https://github.com/worktile/slate-yjs/issues/WIK-4733)
* bind decorate to root node #WIK-4803 ([fdf715e](https://github.com/worktile/slate-yjs/commit/fdf715e96be42c360c1af5df677d2331aeba8e22)), closes [#WIK-4803](https://github.com/worktile/slate-yjs/issues/WIK-4803)
* **core:** fix the undo operation does not take effect remotely #WIK-4555 ([dd31260](https://github.com/worktile/slate-yjs/commit/dd3126085552bf33270fa4352bec5b4cddc7c39a)), closes [#WIK-4555](https://github.com/worktile/slate-yjs/issues/WIK-4555)
* **cursor:** fix absolutePositionToRelativePosition error ([fe47657](https://github.com/worktile/slate-yjs/commit/fe47657db4519a7885f432fbb6899bde785b9abd))
* **cursor:** fix wrong path ([#11](https://github.com/worktile/slate-yjs/issues/11)) ([a02df8b](https://github.com/worktile/slate-yjs/commit/a02df8bb5c8c883cbd7569facc0679eb338ecc60))
* fix cursor position #WIK-4778 ([94beeca](https://github.com/worktile/slate-yjs/commit/94beecadbc72b71587875c8eabdd6a377431ec7b)), closes [#WIK-4778](https://github.com/worktile/slate-yjs/issues/WIK-4778)
* fix test error #WIK-4724 ([2d0190f](https://github.com/worktile/slate-yjs/commit/2d0190f5ff6541bb04a58b5a7ccb69a01edb39b8)), closes [#WIK-4724](https://github.com/worktile/slate-yjs/issues/WIK-4724)
* optmize code ([3ad87b1](https://github.com/worktile/slate-yjs/commit/3ad87b11df86674fccf8e5aeed56751f05042058))
* optmize code  #WIK-4764 ([ec2901a](https://github.com/worktile/slate-yjs/commit/ec2901aff9965cd9071e29678514cb13958e95e9)), closes [#WIK-4764](https://github.com/worktile/slate-yjs/issues/WIK-4764)
* prevent applySlateOperations when isUndo ([3129343](https://github.com/worktile/slate-yjs/commit/3129343faf173b8f39d6e8a8dcfe72ee8ebf0cb8))
* remove key when newProperties is null #WIK-4933 ([ead4742](https://github.com/worktile/slate-yjs/commit/ead4742ad6f147a794b43f2c60300c30c0aba1fe)), closes [#WIK-4933](https://github.com/worktile/slate-yjs/issues/WIK-4933)
* remove normalizing when operation is remote #WIK-4764 ([4bb8793](https://github.com/worktile/slate-yjs/commit/4bb879333d67d7d4d1e02a0b8dd65f7ffc52393b)), closes [#WIK-4764](https://github.com/worktile/slate-yjs/issues/WIK-4764)

### 0.1.11 (2021-09-27)(https://github.com/worktile/slate-yjs/compare/v0.1.11..v0.0.10) (2021-09-18)


### Features

* **core:**  add module to package.json


### [0.1.10](https://github.com/worktile/slate-yjs/compare/v0.1.10..v0.0.9) (2021-09-18)

### Features

* **core:** fix: bind decorate to root node
* **core:** feat: add is_undo
* **core:** chore: remove unused code segment
* **core:** feat: add try catch for yjs editor
* **core:** fix: prevent applySlateOperations when isUndo
* **core:** feat(error): handle error


### 0.1.9 (2021-09-13)

### Bug Fixes

* **core:** : fix undo manage cursor position #WIK-4778

### 0.1.8 (2021-09-13)


### Features

* add getFirstText ([fe68979](https://github.com/worktile/slate-yjs/commit/fe6897912a6d9779add3499df37609f33fcccddc))
* add undo plugin #Wik-4733 ([f5c716c](https://github.com/worktile/slate-yjs/commit/f5c716ce6560414fafb69a090c97d6d5c124e551)), closes [#Wik-4733](https://github.com/worktile/slate-yjs/issues/Wik-4733)
* **core:** use toJSON to initialize data #WIK-4535 ([4485ecc](https://github.com/worktile/slate-yjs/commit/4485eccc9d606ee4998ab2e51066c6022b2b9837)), closes [#WIK-4535](https://github.com/worktile/slate-yjs/issues/WIK-4535)


### Bug Fixes

* add undo and redo to withUndoManager #WIK-4733 ([b1cf79d](https://github.com/worktile/slate-yjs/commit/b1cf79d4f6eb91225f2646d6fc386fd156551526)), closes [#WIK-4733](https://github.com/worktile/slate-yjs/issues/WIK-4733)
* **core:** fix the undo operation does not take effect remotely #WIK-4555 ([dd31260](https://github.com/worktile/slate-yjs/commit/dd3126085552bf33270fa4352bec5b4cddc7c39a)), closes [#WIK-4555](https://github.com/worktile/slate-yjs/issues/WIK-4555)
* **cursor:** fix absolutePositionToRelativePosition error ([fe47657](https://github.com/worktile/slate-yjs/commit/fe47657db4519a7885f432fbb6899bde785b9abd))
* **cursor:** fix wrong path ([#11](https://github.com/worktile/slate-yjs/issues/11)) ([a02df8b](https://github.com/worktile/slate-yjs/commit/a02df8bb5c8c883cbd7569facc0679eb338ecc60))
* fix test error #WIK-4724 ([2d0190f](https://github.com/worktile/slate-yjs/commit/2d0190f5ff6541bb04a58b5a7ccb69a01edb39b8)), closes [#WIK-4724](https://github.com/worktile/slate-yjs/issues/WIK-4724)
* optmize code ([3ad87b1](https://github.com/worktile/slate-yjs/commit/3ad87b11df86674fccf8e5aeed56751f05042058))
* optmize code  #WIK-4764 ([ec2901a](https://github.com/worktile/slate-yjs/commit/ec2901aff9965cd9071e29678514cb13958e95e9)), closes [#WIK-4764](https://github.com/worktile/slate-yjs/issues/WIK-4764)
* remove normalizing when operation is remote #WIK-4764 ([4bb8793](https://github.com/worktile/slate-yjs/commit/4bb879333d67d7d4d1e02a0b8dd65f7ffc52393b)), closes [#WIK-4764](https://github.com/worktile/slate-yjs/issues/WIK-4764)

### 0.1.7 (2021-09-10)


### Features

* add getFirstText ([fe68979](https://github.com/worktile/slate-yjs/commit/fe6897912a6d9779add3499df37609f33fcccddc))
* add undo plugin #Wik-4733 ([f5c716c](https://github.com/worktile/slate-yjs/commit/f5c716ce6560414fafb69a090c97d6d5c124e551)), closes [#Wik-4733](https://github.com/worktile/slate-yjs/issues/Wik-4733)
* **core:** use toJSON to initialize data #WIK-4535 ([4485ecc](https://github.com/worktile/slate-yjs/commit/4485eccc9d606ee4998ab2e51066c6022b2b9837)), closes [#WIK-4535](https://github.com/worktile/slate-yjs/issues/WIK-4535)


### Bug Fixes

* add undo and redo to withUndoManager #WIK-4733 ([b1cf79d](https://github.com/worktile/slate-yjs/commit/b1cf79d4f6eb91225f2646d6fc386fd156551526)), closes [#WIK-4733](https://github.com/worktile/slate-yjs/issues/WIK-4733)
* **core:** fix the undo operation does not take effect remotely #WIK-4555 ([dd31260](https://github.com/worktile/slate-yjs/commit/dd3126085552bf33270fa4352bec5b4cddc7c39a)), closes [#WIK-4555](https://github.com/worktile/slate-yjs/issues/WIK-4555)
* **cursor:** fix absolutePositionToRelativePosition error ([fe47657](https://github.com/worktile/slate-yjs/commit/fe47657db4519a7885f432fbb6899bde785b9abd))
* **cursor:** fix wrong path ([#11](https://github.com/worktile/slate-yjs/issues/11)) ([a02df8b](https://github.com/worktile/slate-yjs/commit/a02df8bb5c8c883cbd7569facc0679eb338ecc60))
* fix test error #WIK-4724 ([2d0190f](https://github.com/worktile/slate-yjs/commit/2d0190f5ff6541bb04a58b5a7ccb69a01edb39b8)), closes [#WIK-4724](https://github.com/worktile/slate-yjs/issues/WIK-4724)
* optmize code ([3ad87b1](https://github.com/worktile/slate-yjs/commit/3ad87b11df86674fccf8e5aeed56751f05042058))

### 0.1.6 (2021-09-10)


### 0.1.5 (2021-08-09)


### Features

* add getFirstText ([fe68979](https://github.com/worktile/slate-yjs/commit/fe6897912a6d9779add3499df37609f33fcccddc))
* **core:** use toJSON to initialize data #WIK-4535 ([4485ecc](https://github.com/worktile/slate-yjs/commit/4485eccc9d606ee4998ab2e51066c6022b2b9837)), closes [#WIK-4535](https://github.com/worktile/slate-yjs/issues/WIK-4535)


### Bug Fixes

* **core:** fix the undo operation does not take effect remotely #WIK-4555 ([dd31260](https://github.com/worktile/slate-yjs/commit/dd3126085552bf33270fa4352bec5b4cddc7c39a)), closes [#WIK-4555](https://github.com/worktile/slate-yjs/issues/WIK-4555)
* **cursor:** fix absolutePositionToRelativePosition error ([fe47657](https://github.com/worktile/slate-yjs/commit/fe47657db4519a7885f432fbb6899bde785b9abd))
* **cursor:** fix wrong path ([#11](https://github.com/worktile/slate-yjs/issues/11)) ([a02df8b](https://github.com/worktile/slate-yjs/commit/a02df8bb5c8c883cbd7569facc0679eb338ecc60))

### 0.1.4 (2021-08-05)


### Features

* add getFirstText ([fe68979](https://github.com/worktile/slate-yjs/commit/fe6897912a6d9779add3499df37609f33fcccddc))
* **core:** use toJSON to initialize data #WIK-4535 ([4485ecc](https://github.com/worktile/slate-yjs/commit/4485eccc9d606ee4998ab2e51066c6022b2b9837)), closes [#WIK-4535](https://github.com/worktile/slate-yjs/issues/WIK-4535)


### Bug Fixes

* **cursor:** fix absolutePositionToRelativePosition error ([fe47657](https://github.com/worktile/slate-yjs/commit/fe47657db4519a7885f432fbb6899bde785b9abd))

### [0.1.3](https://github.com/worktile/slate-yjs/compare/v0.1.2...v0.1.3) (2021-07-23)

### 0.1.2 (2021-07-23)

### 0.1.1 (2021-07-23)
